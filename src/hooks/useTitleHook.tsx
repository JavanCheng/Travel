import { useEffect, useState } from "react";

function useTitleHook(title: string) {
    const [state, setState] = useState('');
    useEffect(() => {
        document.title = title;
        setState(title);
    }, [title])
    return state;
}

export default useTitleHook;