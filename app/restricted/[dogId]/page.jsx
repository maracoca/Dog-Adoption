// "use client";
// import React from "react";
// import { useEffect, useState } from "react";
// import { getDogDetails } from ".//_components/dogDetails";

// export default function DogAdoptionPage({ params }) {
//   const [dog, setDog] = useState(null);

//   useEffect(() => {
//     async function loadDogDetails() {
//       const dogDetails = await getDogDetails(parseInt(params.dogId));
//       setDog(dogDetails);
//     }

//     loadDogDetails();
//   }, [params.dogId]);

//   if (!dog) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="relative">
//           <img
//             src={dog.image}
//             alt={dog.name}
//             className="w-full h-96 object-cover"
//           />
//           <div className="absolute top-4 left-4 bg-white bg-opacity-75 px-4 py-2 rounded">
//             <h1 className="text-2xl font-bold text-gray-800">
//               {dog.name} cannot wait to see you!
//             </h1>
//           </div>
//         </div>

//         <div className="p-6">
//           <div className="mb-4">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">
//               {dog.name}'s Details
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-gray-600">
//                   <strong>Breed:</strong> {dog.breed}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Age:</strong> {dog.age} years old
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-600">
//                   <strong>Qualities:</strong> {dog.qualities}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="mb-4">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">
//               About {dog.name}
//             </h3>
//             <p className="text-gray-700">{dog.description}</p>
//           </div>

//           <div className="mt-6 flex justify-between items-center">
//             <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
//               Start Adoption Process
//             </button>
//             <a href="/dogs" className="text-blue-500 hover:underline">
//               Back to All Dogs
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { useSession, SessionProvider } from "next-auth/react";
import { getDogDetails } from ".//_components/dogDetails";

export default function DogAdoptionPage({ params }) {
  const [dog, setDog] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    async function loadDogDetails() {
      const dogDetails = await getDogDetails(parseInt(params.dogId));
      setDog(dogDetails);
    }

    loadDogDetails();
  }, [params.dogId]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <p>You need to log in to access this page.</p>
        <a href="/login" className="text-blue-500 hover:underline">
          Go to Login
        </a>
      </div>
    );
  }

  if (!dog) {
    return <div>Loading...</div>;
  }

  const userName = session.user?.name || "Guest";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src={dog.image}
            alt={dog.name}
            className="w-full h-96 object-cover"
          />
          <div className="absolute top-4 left-4 bg-white bg-opacity-75 px-4 py-2 rounded">
            <h1 className="text-2xl font-bold text-gray-800">
              Hello {userName}, {dog.name} cannot wait to see you!
            </h1>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {dog.name}'s Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <strong>Breed:</strong> {dog.breed}
                </p>
                <p className="text-gray-600">
                  <strong>Age:</strong> {dog.age} years old
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <strong>Qualities:</strong> {dog.qualities}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              About {dog.name}
            </h3>
            <p className="text-gray-700">{dog.description}</p>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
              Start Adoption Process
            </button>
            <a href="/dogs" className="text-blue-500 hover:underline">
              Back to All Dogs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
