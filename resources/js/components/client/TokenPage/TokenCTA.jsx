import React from 'react'
import tokenCtaBg from '@/assets/images/bck-token.png'
const TokenCTA = () => {
    return (
        <div className="relative isolate overflow-hidden bg-[#010101] py-24 sm:py-32">

            <img
                src={tokenCtaBg}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-50"
            />

            <div className="px-6 lg:px-8">
                <div className="mx-auto max-w-5xl text-center">
                    <h2 className=" text-6xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                        Plongez dans un programme de fidelité unique
                    </h2>
                    <p className="mx-auto mt-6 max-w-7xl text-lg/8 text-pretty text-gray-500">
                        Nous tenons à récompenser votre soutien. Découvrez WEVA XP notre programme de fidélité exclusif
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TokenCTA