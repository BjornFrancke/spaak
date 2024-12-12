import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


interface ODataItem {
  id: number;
  typeid: number;
  kategoriid: number | null;
  statusid: number;
  titel: string;
  titelkort: string;
  offentlighedskode: string;
  nummer: string;
  resume: string | null;
  periodeid: number;
  opdateringsdato: string; // This will be a string in ISO format
}

interface ApiResponse {
  value: ODataItem[];
}

export async function GET() {
  try {
    const url = "https://oda.ft.dk/api/Sag";
    const typeIds = [3, 5, 9].map((id) => `typeid eq ${id}`).join(` or `);
    const periodeId = 160;

    const query = `$filter=(${typeIds}) and periodeid eq ${periodeId}`;
    const fullUrl = `${url}?${query}`;

    const apiResponse = await fetch(fullUrl);

    if (!apiResponse.ok) {
      throw new Error(`HTTP error! status: ${apiResponse.status}`);
    }

    const data = (await apiResponse.json()) as ApiResponse;
    console.log(`Found ${data.value.length} proposals to process`);

    for (const item of data.value) {
      if (!item.kategoriid) {
        console.warn(`Skipping proposal ${item.id} due to missing kategoriid`);
        continue;
      }

      console.log("Processing item:", {
        id: item.id,
        kategoriid: item.kategoriid,
        typeid: item.typeid,
        statusid: item.statusid,
      });

      await prisma.proposal.upsert({
        where: { id: item.id },
        update: {
          typeId: item.typeid,
          kategoriId: item.kategoriid,
          statusId: item.statusid,
          title: item.titel,
          shortTitle: item.titelkort,
          publicCode: item.offentlighedskode,
          number: item.nummer,
          resume: item.resume,
          periodId: item.periodeid,
          updatedAt: new Date(item.opdateringsdato),
        },
        create: {
          id: item.id,
          typeId: item.typeid,
          kategoriId: item.kategoriid,
          statusId: item.statusid,
          title: item.titel,
          shortTitle: item.titelkort,
          publicCode: item.offentlighedskode,
          number: item.nummer,
          resume: item.resume,
          periodId: item.periodeid,
          updatedAt: new Date(item.opdateringsdato),
        },
      });
    }

    return Response.json({
      message: "Data fetched and stored successfully!",
      count: data.value.length,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error in fetch-data:", errorMessage);

    return Response.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
