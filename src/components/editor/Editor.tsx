import dynamic from "next/dynamic";
import { useRef } from "react";

const Blocks = dynamic(() => import("./blocks/Blocks"), {
    ssr: false
});

const Cursor = dynamic(() => import("@components/cursor/Cursor"), {
    ssr: false
});

export default function Editor() {
    const editorRef = useRef<HTMLDivElement>(null);


    return (
        <div className="flex flex-1 relative" ref={editorRef}>
            <div className="relative w-full cursor-text" data-editor>
                <Blocks />
            </div>
            <div>
                <Cursor parentRef={editorRef} />
            </div>
        </div>
    );
}