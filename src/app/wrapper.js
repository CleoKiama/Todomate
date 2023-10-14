'use client'
import React from 'react'
import { navStatus } from './provider.js'
import { useContext,useState } from 'react'
export default function Wrapper ({children}) {
      const valueNavStatus = useContext(navStatus)
    const [showNav,setShowNav ] = useState(valueNavStatus)
    return (
    <>
     <navStatus.Provider 
     value={{showNav:showNav,setShowNav:setShowNav} } >
     {children}
     </navStatus.Provider>
    </>
    )
}


