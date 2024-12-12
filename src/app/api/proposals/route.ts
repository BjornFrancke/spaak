import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const proposals = await prisma.proposal.findMany();

    if (proposals.length === 0) {
      return new Response(JSON.stringify({ message: "No proposals found." }), {
        status: 204, 
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(proposals), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching proposals:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch proposals." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
