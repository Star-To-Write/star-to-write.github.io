import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// utils/comments.ts
import { type Comment, type NestedComment } from "./types";

export function buildNestedComments(comments: Comment[]): NestedComment[] {
    const map = new Map<string, NestedComment>();

    // Step 1: Initialize map and convert parent refs
    for (const c of comments) {
        map.set(c._id, {
            ...c,
            parentId: c.parent?._ref ?? null,
            children: [],
        });
    }

    const roots: NestedComment[] = [];

    // Step 2: Attach children to parents
    for (const comment of map.values()) {
        if (comment.parentId) {
            const parent = map.get(comment.parentId);
            if (parent && parent._id !== comment._id) {
                parent.children.push(comment);
            } else {
                // parent missing or circular ref — fallback to root
                roots.push(comment);
            }
        } else {
            roots.push(comment);
        }
    }

    return roots;
}

export const slugify = (str: string): string => {
    return str
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
};

export const normalizeSubjectArea = (title: string) => {
    return slugify(title);
};

// i stole this from soemone on the internet tahnks kind stranger

class AudioFingerprint {
    // private
    #audioContext: OfflineAudioContext | null = null;
    #currentTime: number | null = null;
    #oscillatorNode: OscillatorNode | null = null;
    #compressorNode: DynamicsCompressorNode | null = null;
    #fingerprint: string | null = null;
    #onCompleteCallback: ((fingerprint: string) => void) | null = null;

    createFingerPrint(
        callback: (fingerprint: string) => void,
        errorCallback: (error: unknown) => void,
        debug: boolean = false,
    ): void {
        this.#onCompleteCallback = callback;

        try {
            this.#initializeAudioContext();

            if (
                this.#oscillatorNode &&
                this.#compressorNode &&
                this.#audioContext
            ) {
                this.#oscillatorNode.connect(this.#compressorNode);
                this.#compressorNode.connect(this.#audioContext.destination);

                this.#audioContext.oncomplete =
                    this.#handleAudioComplete.bind(this);

                this.#oscillatorNode.start(0);
                this.#audioContext.startRendering();
            }
        } catch (error) {
            if (debug) {
                console.error("Audio Fingerprinting Error:", error);
            }
            errorCallback(error);
        }
    }

    #initializeAudioContext(): void {
        this.#createAudioContext();
        if (this.#audioContext) {
            this.#currentTime = this.#audioContext.currentTime;
            this.#createOscillatorNode();
            this.#createCompressorNode();
        }
    }

    #createAudioContext(): void {
        const OfflineContext =
            window.OfflineAudioContext || window.webkitOfflineAudioContext;
        this.#audioContext = new OfflineContext(1, 5000, 44100);
    }

    #createOscillatorNode(): void {
        if (this.#audioContext) {
            this.#oscillatorNode = this.#audioContext.createOscillator();
            this.#oscillatorNode.type = "triangle";
            this.#oscillatorNode.frequency.setValueAtTime(
                10000,
                this.#currentTime || 0,
            );
        }
    }

    #createCompressorNode(): void {
        if (this.#audioContext) {
            this.#compressorNode =
                this.#audioContext.createDynamicsCompressor();

            this.#setCompressorValue(this.#compressorNode.threshold, -50);
            this.#setCompressorValue(this.#compressorNode.knee, 40);
            this.#setCompressorValue(this.#compressorNode.ratio, 12);
            this.#setCompressorValue(this.#compressorNode.attack, 0);
            this.#setCompressorValue(this.#compressorNode.release, 0.25);
        }
    }

    #setCompressorValue(param: AudioParam, value: number): void {
        param.setValueAtTime(value, this.#audioContext!.currentTime);
    }

    #handleAudioComplete(event: OfflineAudioCompletionEvent): void {
        this.#generateFingerprint(event);
        if (this.#compressorNode) {
            this.#compressorNode.disconnect();
        }
    }

    #generateFingerprint(event: OfflineAudioCompletionEvent): void {
        let output = "";
        const channelData = event.renderedBuffer.getChannelData(0);

        for (let i = 4500; i < 5000; i++) {
            output += Math.abs(channelData[i]);
        }

        this.#fingerprint = output.toString();

        if (
            typeof this.#onCompleteCallback === "function" &&
            this.#fingerprint
        ) {
            this.#onCompleteCallback(this.#fingerprint);
        }
    }
}

const calculateHash = function (str: string, seed = 0) {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
// Expose this function
export const getFingerPrint = async (): Promise<string> => {
    if (typeof window === "undefined") {
        throw new Error("getFingerPrint can only be called in the browser");
    }

    if (!window.OfflineAudioContext && !window.webkitOfflineAudioContext) {
        return "unsupported-audio-context";
    }

    return new Promise<string>((resolve, reject) => {
        const audioFingerprint = new AudioFingerprint();
        let settled = false;

        const settle = (value: string) => {
            if (!settled) {
                settled = true;
                resolve(value);
            }
        };

        const rejecter = (error: unknown) => {
            if (!settled) {
                settled = true;
                reject(error);
            }
        };

        const timeoutId = window.setTimeout(() => {
            if (!settled) {
                settled = true;
                resolve("fingerprint-timeout");
            }
        }, 3000);

        audioFingerprint.createFingerPrint(
            (fingerprint: string) => {
                try {
                    fingerprint = window.btoa(fingerprint as string);
                    const hash = calculateHash(fingerprint, 0).toString();
                    window.clearTimeout(timeoutId);
                    settle(hash);
                } catch (error) {
                    window.clearTimeout(timeoutId);
                    rejecter(error);
                }
            },
            rejecter,
            true,
        );
    });
};
