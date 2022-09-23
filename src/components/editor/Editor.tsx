import { useEditorStore } from "@store/editor";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { InputListener } from "./InputListener";

const Blocks = dynamic(() => import("./blocks/Blocks"), {
    ssr: false
});

export default function Editor() {
    const [currentBlockId] = useEditorStore((store) => [store.currentBlockId]);

    return (
        <>
            <div className="relative w-full cursor-text">
                <Blocks />
            </div>

        </>
    );
}