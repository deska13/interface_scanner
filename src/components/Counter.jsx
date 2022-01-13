import React, {useState} from "react";

const Counter = function () {
    const [count, setCount] = useState(5);

    function increment(){
        setCount(count + 1)
    }
    
    function decrment(){
        setCount(count - 1)
    }
    
    return (
        <div className="App">
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrment}>Dicrement</button>
        </div>
    )
}

export default Counter;