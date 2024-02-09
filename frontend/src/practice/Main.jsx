import React from 'react'
import Chaild from './Chaild'
import Chaild2 from './chaild/Chaild2';
import {nameContext} from "../practice/call/CallContext"
import { setUpForMyCall } from '../lib/ContextApi';
export default class Main extends React.Component {
    state = {
        theme:"rose"
    }
   
    render() {
        console.log(setUpForMyCall("hello"))
        const Nan = setUpForMyCall("hello").Component;
        console.log(Nan)
    //  console.log(nameContext.Provider("Hello"))   

        const { theme } = this.state;
        return (
            <div className="">
                {/* <setUpForMyCall.AgainCall>
                gsdv
                </setUpForMyCall.AgainCall>  */}
                <Nan value={"hello kamon aco?"} >
                    ki
                </Nan>
                <Chaild2  />
         </div>
     )
 }
}
