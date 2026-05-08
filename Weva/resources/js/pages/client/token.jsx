import React from 'react'
import ClientLayout from '@/layouts/client-layout'
import TokenCTA from '@/components/client/TokenPage/TokenCTA'
import TokenCard from '@/components/client/TokenPage/TokenCard'
const token = () => {
    return (
        <>
            <ClientLayout >
                <TokenCTA />
                <TokenCard />
            </ClientLayout>
        </>

    )
}

export default token