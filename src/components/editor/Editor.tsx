import { Cursor } from "@components/cursor/Cursor";
import { useEditorStore } from "@store/editor";
import dynamic from "next/dynamic";
import { useRef } from "react";

const Blocks = dynamic(() => import("./blocks/Blocks"), {
    ssr: false
});

export default function Editor() {
    const [currentBlockId] = useEditorStore((store) => [store.currentBlockId]);

    return (
        <div className="flex flex-1 relative">
            <div className="relative w-full cursor-text" data-editor>
                <Blocks />
            </div>
            <Cursor/>
        </div>
    );
}