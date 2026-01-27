import React from 'react'
import Navbar from '@/components/home/navbar'
import TokenCTA from '@/components/client/TokenPage/TokenCTA'
import TokenCard from '@/components/client/TokenPage/TokenCard'
const token = () => {
    return (
        <>
            <Navbar />
            <TokenCTA />
            <TokenCard />
        </>

    )
}

export default token