import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(value: unknown): string | undefined {
    if (typeof value !== "string") return undefined;

    const email = value.trim().toLowerCase();
    return email.length > 0 ? email : undefined;
}

function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const email = normalizeEmail((body as { email?: unknown }).email);

        if (!email || !isValidEmail(email)) {
            return NextResponse.json(
                { error: "Invalid email" },
                { status: 400 },
            );
        }

        // fetch and see if there is already a contact
        const brevoCheck = await fetch(
            `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
            {
                method: "GET",
                headers: {
                    "api-key": process.env.BREVO_API_KEY as string,
                    "Content-Type": "application/json",
                },
            },
        );

        // if there is a record
        if (brevoCheck.ok) {
            return NextResponse.json({ success: true });
        }

        const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "api-key": process.env.BREVO_API_KEY as string,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                listIds: [2], // 🔁 Replace with your Brevo list ID
                updateEnabled: true,
            }),
        });

        if (!brevoRes.ok) {
            const errorText = await brevoRes.text();

            return NextResponse.json(
                { error: "Subscription failed" },
                { status: 400 },
            );
            console.error("Brevo Error: ", errorText);
        }

        // send discord webhook alerting
        const webhookPayload = {
            content: `:bellhop: :pen_fountain: **${email}** just subscribed to our mailing list!`,
            embeds: null,
            attachments: [],
        };

        await fetch(process.env.WEBHOOK_URL as string, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(webhookPayload),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: `Server error: ${error}` },
            { status: 500 },
        );
    }
}
