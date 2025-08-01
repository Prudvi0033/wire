'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

const Providers = ({children} : {children : React.ReactNode}) => {
    const [queryProvider] = useState(() => new QueryClient())
  return (
    <div>
        <QueryClientProvider client={queryProvider}>
            {children}
        </QueryClientProvider>
    </div>
  )
}

export default Providers