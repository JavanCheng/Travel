import { useTitleHook } from "@/hooks";
import { useState } from "react";

function Test() {
    const [state, setState] = useState('test')
    const title = useTitleHook(state);

    const handleClick = () => {
        setState('test changed');
    }

    return (
        <div>
            <h1 onClick={() => handleClick}>{title}</h1>
            1
        </div>
    )
}

export default Test;