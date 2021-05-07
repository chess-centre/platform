
import React from "react";
import CatherineVarley from "../../assets/img/catherine-varley.jpg";
import VictoriaWebb from "../../assets/img/victoria-webb.jpg";
import ThomasSmith from "../../assets/img/thomas-smith.jpg";

const volunteers = [
  {
    name: 'Catherine Varley',
    role: 'Junior curriculum',
    imageUrl: CatherineVarley,
    bio:
      'Cat volunteers her time to help review our Junior curriculum. As an Assistant Head Teacher, Cat brings her wealth of experience to ensure we are providing creative and engaging coaching sessions.',
  },
  {
    name: 'Victoria Webb',
    role: 'Junior curriculum',
    imageUrl: VictoriaWebb,
    bio:
      'Victoria volunteers her time to support our Junior curriculum. As a full-time Primary School Teacher, Victoria helps us structure the content and resources tailored towards the various age groups we coach.',
  },
  {
    name: 'Thomas Smith',
    role: 'IT Infrastructure',
    imageUrl: ThomasSmith,
    bio:
      'Tom supports us behind the scenes with any specific hardware requirements, primarily ensuring our live game broadcasts are wired up correctly so you can watch the games anywhere in the world!',
  },
]


export default function Volunteers() {
  return (
    <div className="bg-white">
      <div className="mx-auto mt-6">
        <div className="space-y-12">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Volunteers</h2>

          <ul className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
            {volunteers.map((volunteer) => (
              <li key={volunteer.name}>
                <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
                  <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                    <img className="object-cover shadow-lg rounded-lg" src={volunteer.imageUrl} alt="" />
                  </div>
                  <div className="sm:col-span-2">
                    <div className="space-y-4">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{volunteer.name}</h3>
                        <p className="text-teal-600">{volunteer.role}</p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500 text-justify">{volunteer.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}