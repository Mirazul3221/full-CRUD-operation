import React from 'react'
import { nameContext } from '../../practice/call/CallContext'
import { setUpForMyCall } from '../../lib/ContextApi'
setUpForMyCall
const Chaild2 = ({children,value}) => {
    const Nen = setUpForMyCall()
    console.log(Nen)
   return (
    
      <div>
           <h2 className={`bg-rose-500 text-white w-fit py-2 px-4`}>Mirazul Islam</h2>
           {children}
           {value}
           <nameContext.Consumer>
               {(val) => {
                   return val
               }}
           </nameContext.Consumer>
      </div>
  )
}

export default Chaild2