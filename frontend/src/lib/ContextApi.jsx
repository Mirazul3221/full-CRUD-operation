class NewContext{
    constructor(value) {
        this.value = value
    }

    Provider({ children }) {
       return children
    }

    Consumer({ children }) {
        // return children(this.value)
   }
}

export function createContext(value =null) {
    const newContext = new NewContext(value)
    return {
        Provider: newContext.Provider,
        Consumer:newContext.Consumer
   }
}

class MyCall {
    constructor(name) {
        this.name = name
    }
    AgainCall = ({children,value}) => {
        this.name = value;
        return (
            <div className="">
                <h2>{this.name}</h2>
                {children}
            </div>
        )
   }
}

export function setUpForMyCall(value=null) {
    const call = new MyCall(value)
    return {
        Component: call.AgainCall,
        Value:call.name
    } 
}
