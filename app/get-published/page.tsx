import { DontGo } from "@/components/DontGo";
import { client } from "@/sanity/lib/client";
import GetPublishedClient from "@/components/GetPublishedClient";

export default async function GetPublishedPage() {
    let isOpen = false;

    try {
        const query = `*[_type == "magazine" && submissionsOpen == true][0] { slug }`;
        const result = await client.fetch(query);

        if (result && result.slug) {
            isOpen = true;
        }
    } catch (error) {
        console.error("Error fetching magazine data:", error);
    }

    return (
        <>
            <GetPublishedClient isOpen={isOpen} />
            <DontGo />
        </>
    );
}
