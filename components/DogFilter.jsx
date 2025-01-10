"use client"; // Mark this file as a Client Component

// import React, { useState, useEffect } from "react";

// const DogFilter = ({ dogs }) => {
//   const [filteredDogs, setFilteredDogs] = useState(dogs);
//   const [filters, setFilters] = useState({ breed: [], age: [], qualities: [] });

//   const handleFilterChange = (event) => {
//     const { name, value } = event.target;

//     setFilters((prev) => {
//       if (event.target.checked) {
//         console.log(`Adding ${value} to ${name}`);
//         return { ...prev, [name]: [...prev[name], value] };
//       } else {
//         console.log(`Removing ${value} from ${name}`);
//         return { ...prev, [name]: prev[name].filter((item) => item !== value) };
//       }
//     });
//   };

//   const applyFilters = () => {
//     console.log("Applying filters", filters);
//     let newFilteredDogs = dogs;

//     // Filter by breed
//     if (filters.breed.length > 0) {
//       console.log("Filtering by breed", filters.breed);
//       newFilteredDogs = newFilteredDogs.filter((dog) =>
//         filters.breed.includes(dog.breed)
//       );
//     }

//     // Filter by age
//     if (filters.age.length > 0) {
//       console.log("Filtering by age", filters.age);
//       newFilteredDogs = newFilteredDogs.filter(
//         (dog) => filters.age.includes(dog.age.toString()) // Convert age to string to match
//       );
//     }

//     // Filter by qualities
//     if (filters.qualities.length > 0) {
//       newFilteredDogs = newFilteredDogs.filter((dog) =>
//         filters.qualities.every((quality) => dog.qualities.includes(quality))
//       );
//     }

//     console.log("Filtered dogs:", newFilteredDogs);
//     setFilteredDogs(newFilteredDogs);
//   };

//   useEffect(() => {
//     setFilteredDogs(dogs); // Reset filtered dogs when dogs prop changes
//   }, [dogs]);

//   return (
//     <div className="flex flex-col">
//       <div className="filter-section mb-4">
//         <h3 className="font-bold">Filter by Breed</h3>
//         {[
//           "Labrador Retriever",
//           "Golden Retriever",
//           "Husky",
//           "Border Collie",
//         ].map((breed) => (
//           <label key={breed}>
//             <input
//               type="checkbox"
//               name="breed"
//               value={breed}
//               onChange={handleFilterChange}
//             />
//             {breed}
//           </label>
//         ))}

//         <h3 className="font-bold mt-4">Filter by Age</h3>
//         {[2, 3, 4, 5].map((age) => (
//           <label key={age}>
//             <input
//               type="checkbox"
//               name="age"
//               value={age}
//               onChange={handleFilterChange}
//             />
//             {age} years
//           </label>
//         ))}

//         <h3 className="font-bold mt-4">Filter by Qualities</h3>
//         {["Friendly", "Energetic", "Loyal", "Gentle"].map((quality) => (
//           <label key={quality}>
//             <input
//               type="checkbox"
//               name="qualities"
//               value={quality}
//               onChange={handleFilterChange}
//             />
//             {quality}
//           </label>
//         ))}
//       </div>
//       <button
//         onClick={applyFilters}
//         className="mt-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
//       >
//         Apply Filters
//       </button>

//       {/* Display filtered dogs here */}
//       <div className="flex flex-wrap gap-6 w-full md:w-3/4">
//         {filteredDogs.map((dog) => (
//           <div
//             key={dog.id}
//             className="w-full md:w-1/2 lg:w-1/3 p-4 border rounded-lg shadow-lg"
//           >
//             <img
//               src={dog.image}
//               alt={dog.name}
//               className="w-full h-48 object-cover rounded"
//             />
//             <div className="mt-4">
//               <h2 className="text-xl font-semibold">{dog.name}</h2>
//               <p className="text-gray-600">Age: {dog.age}</p>
//               <p className="text-gray-600">Breed: {dog.breed}</p>
//               <p className="text-gray-600">Qualities: {dog.qualities}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DogFilter;

import React, { useState, useEffect } from "react";

const DogFilter = ({ dogs, breeds, qualities }) => {
  const [filteredDogs, setFilteredDogs] = useState(dogs);
  //current state, function that updates it       initial state
  const [filters, setFilters] = useState({
    breed: [],
    age: [],
    qualities: [],
  });

  useEffect(() => {
    console.log("Filters changed:", filters);
    const filtered = dogs.filter((dog) => {
      const matchesBreed =
        filters.breed.length === 0 || filters.breed.includes(dog.breed);
      const matchesAge =
        filters.age.length === 0 || filters.age.includes(dog.age.toString());
      const matchesQualities =
        filters.qualities.length === 0 ||
        filters.qualities.every((q) => dog.qualities.includes(q));

      return matchesBreed && matchesAge && matchesQualities;
    });

    console.log("Filtered dogs:", filtered);
    setFilteredDogs(filtered);
  }, [filters, dogs]); //when these dependencies change the code is run

  const handleFilterChange = (event) => {
    const { name, value, checked } = event.target;
    //name= "breed", value= "Husky", checked= true/false    event.target= checkbox that triggered the function

    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      //shallow copy of prevFilters, so changes won’t directly mutate the previous state
      if (checked) {
        newFilters[name].push(value);
      } else {
        const updatedValues = [];
        for (const currentValue of newFilters[name]) {
          if (currentValue !== value) {
            updatedValues.push(currentValue);
          }
        }
        newFilters[name] = updatedValues;
      }
      return newFilters;
    });
  };

  return (
    <div className="flex flex-row gap-5 w-full max-w-full pt-[65px]">
      <div className="flex flex-col gap-6 w-64 min-w-[256px] bg-[rgb(225,196,201)]">
        <h3 className="text-lg font-bold">Filter by Breed</h3>
        <div className="flex flex-col">
          {breeds.map((breed) => (
            <label key={breed}>
              <input
                type="checkbox"
                className="checkbox"
                name="breed"
                value={breed}
                onChange={handleFilterChange}
              />
              {breed}
            </label>
          ))}
        </div>

        <h3 className="text-lg font-bold">Filter by Age</h3>
        <div className="flex flex-col">
          {[2, 3, 4, 5].map((age) => (
            <label key={age}>
              <input
                type="checkbox"
                className="checkbox"
                name="age"
                value={age}
                onChange={handleFilterChange}
              />
              {age} years
            </label>
          ))}
        </div>

        <h3 className="text-lg font-bold">Filter by Qualities</h3>
        <div className="flex flex-col">
          {qualities.map((quality) => (
            <label key={quality}>
              <input
                type="checkbox"
                className="checkbox"
                name="qualities"
                value={quality}
                onChange={handleFilterChange}
              />
              {quality}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 flex-grow">
        {filteredDogs.map((dog) => (
          <div key={dog.id} className="w-full p-4 border rounded-lg shadow-lg">
            <img
              src={dog.image}
              alt={dog.name}
              className="w-full h-48 object-cover rounded"
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{dog.name}</h2>
              <p className="text-gray-600">Age: {dog.age}</p>
              <p className="text-gray-600">Breed: {dog.breed}</p>
              <p className="text-gray-600">Qualities: {dog.qualities}</p>
              <button>
                <a href={`/restricted/${dog.id}`}>Adopt</a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogFilter;
