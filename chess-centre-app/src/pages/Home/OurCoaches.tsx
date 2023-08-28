import React from 'react';
import FooterLanding from "../../components/Footer/LandingFooter";
import LandingNav from "../../components/Navigation/LandingNav";

const coaches = [
    {
        name: 'Jonathan Arnott',
        title: 'Candidate Master',
        rating: 0,
        imageUrl: '',
        bio: 'A Level 3 (National) English Chess Federation coach with 10+ years of classroom teaching experience in Mathematics as well as offering professional chess coaching and having coached with the Sheffield junior chess club (SASCA) for over 20 years. He is a former Yorkshire captain, and has also taken classes in a number of schools for Chess in Schools and Communities. Jonathan is the author of three books on chess.',
    },
    {
        name: 'Tom Wills',
        title: 'ECF 2148',
        rating: 0,
        imageUrl: '',
        bio: 'One of the former juniors who went through our system - and gives something back to the game by assisting with coaching. Tom plays regularly in the Four Nations Chess League (4NCL).',
    },
    {
        name: 'Tom Key',
        title: 'ECF ~1600',
        rating: 0,
        imageUrl: '',
        bio: 'Relatively new to the game, but has put his IT skills to good use researching new methods of applying developments in Artificial Intelligence to chess preparation. He has already competed in the Gijón international chess festival, gaining a FIDE rating of around 1600.',
    },
    {
        name: 'Rosie Irwin',
        title: 'ECF TBC',
        rating: 0,
        imageUrl: '',
        bio: 'Rosie took up chess during the pandemic, and co-authored a book “The Queen’s Gambit - Accepted!”, detailing her experiences on and off the board in her journey to become a competitive chess player. She has a passion for working with beginners, teaching them their first steps in the game of chess.',
    },
];

const vistors = [
    {
        name: 'Gawain Jones',
        role: 'Grandmaster',
        imageUrl: process.env.PUBLIC_URL + '/gawain-jones.jpg',
    },
    {
        name: 'Andrew Ledger',
        role: 'International Master',
        imageUrl: process.env.PUBLIC_URL + '/andrew-ledger.jpg',
    },
    {
        name: 'Richard Palliser',
        role: 'International Master',
        imageUrl: process.env.PUBLIC_URL + '/richard-palliser.jpg',
    },
    {
        name: 'Peter Gayson',
        role: 'FIDE Master',
        imageUrl: process.env.PUBLIC_URL + '/peter-gayson.jpg',
    },
    ,
    {
        name: 'Are you a coach?',
        role: 'Contact Us!',
        imageUrl: '/unknown.jpg',
    },
];

export default function OurCoaches() {
    return (
        <div>
            <div className="bg-white">
                <div className="relative bg-gray-50 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
                    <LandingNav />
                </div>
                <div className="bg-white py-24 md:py-32 lg:py-32">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Coaches</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                We’re a dynamic group of individuals who are passionate about what we do and dedicated to teaching chess to others.
                            </p>
                        </div>
                        <ul
                            role="list"
                            className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
                        >
                            {coaches.map((coach) => (
                                <li key={coach.name}>
                                    {coach.imageUrl && <img className="aspect-[3/2] w-full rounded-2xl object-cover" src={coach.imageUrl} alt="" />}
                                    <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">{coach.name}</h3>
                                    <p className="text-base leading-7 text-gray-600">{coach.title}</p>
                                    <p className="mt-4 text-base leading-7 text-gray-600">{coach.bio}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <VisitingCoaches />
                </div>
                <FooterLanding></FooterLanding>
            </div>
        </div>
    )
}



function VisitingCoaches() {
    return (
        <div className="bg-white py-6 sm:pt-2 sm:pb-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Visitors</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Coaches who have either already run guest sessions at the Sheffield Chess Centre, or who are planning to run sessions in the near future:
                    </p>
                </div>
                <ul
                    role="list"
                    className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                >
                    {vistors.map((vistor) => (
                        <li key={vistor.name}>
                            <img className="mx-auto h-24 w-24 rounded-full" src={vistor.imageUrl} alt="" />
                            <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{vistor.name}</h3>
                            <p className="text-sm leading-6 text-gray-600">{vistor.role}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}