"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDogDetails(dogId) {
  // Fetch dog details
  const dog = await prisma.dog.findUnique({
    where: { id: dogId },
  });

  if (!dog) {
    throw new Error("Dog not found");
  }

  return dog;
}
