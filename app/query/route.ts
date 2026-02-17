// import { useSearchParams } from "next/navigation";
// import { NextRequest } from "next/server";
// import postgres from "postgres";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// async function listInvoices() {
//     const data = await sql`
//     SELECT invoices.amount, customers.name
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE invoices.amount = 666;
//   `;

//     return data;
// }

// // @ts-ignore
// export async function GET(request: NextRequest, { params }) {
//     console.log(params);
//     return Response.json("poop");
// }

// // export async function GET() {
// //   try {
// //   	return Response.json(await listInvoices());
// //   } catch (error) {
// //   	return Response.json({ error }, { status: 500 });
// //   }
// // }

// WE DONT NEED THIS ANYTMOEEW!!
