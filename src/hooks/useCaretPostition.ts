import { useEffect, useState } from "react";

export function useCaretPosition() {
    const [position, setPosition] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        const selection = window.getSelection();
        console.log(selection);
        const range = selection?.getRangeAt(0);
        const rect = range?.getClientRects()[0];
        setPosition([rect?.left ?? 0, rect?.top ?? 0]);
        console.log(position);
    }, []);


    return { position };
}