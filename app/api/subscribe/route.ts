import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const email: string = body.email;

        if (!email || !email.includes("@")) {
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
            console.error(errorText);

            return NextResponse.json(
                { error: "Subscription failed" },
                { status: 400 },
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
