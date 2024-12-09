// "use client";
import React from "react";
import { PrismaClient } from "@prisma/client";
import DogFilter from "../../components/DogFilter";

const prisma = new PrismaClient();

async function AdoptionPage() {
  const dogs = await prisma.dog.findMany();
  const breeds = await prisma.dog.findMany({
    select: {
      breed: true,
    },
  });
  //{ breed: 'golden retriever' },
  //{ breed: 'metis' }
  //{ breed: 'metis' }

  const qualities = await prisma.dog.findMany({
    select: {
      qualities: true,
    },
  });

  const uniqueBreeds = [...new Set(breeds.map((dog) => dog.breed))]; //a set of only dog breeds ['golden retriever','metis']

  // Split the string by commas and trim each quality (remove whitespaces)
  const splitAndTrimQualities = (qualitiesString) => {
    return qualitiesString.split(",").map((q) => q.trim());
  };

  const getUniqueQualities = (dogs) => {
    const allQualities = dogs.flatMap((dog) =>
      splitAndTrimQualities(dog.qualities)
    );
    return [...new Set(allQualities)];
  };

  console.log("breeds", uniqueBreeds);
  console.log("qualities", getUniqueQualities(dogs));

  const uniqueQualities = getUniqueQualities(dogs);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      <DogFilter
        dogs={dogs}
        breeds={uniqueBreeds}
        qualities={uniqueQualities}
      />{" "}
      {/* Use the DogFilter component */}
    </div>
  );
}

export default AdoptionPage;
