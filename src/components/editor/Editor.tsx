import { useCursorStore } from "@store/cursor";
import { getSelectionCoords } from "@utils/getSelectCords";
import dynamic from "next/dynamic";
import { useRef } from "react";

const Blocks = dynamic(() => import("./blocks/Blocks"), {
    ssr: false
});

const Cursor = dynamic(() => import("@components/cursor/Cursor"), {
    ssr: false
});

export default function Editor() {
    const [cursors, setCursorPosition] = useCursorStore((store) => [store.cursors, store.setCursorPosition]);

    const editorRef = useRef<HTMLDivElement>(null);

    const updateCursor = () => {
        const coords = getSelectionCoords(true);
        const parent = editorRef.current?.getBoundingClientRect();

        if (coords && parent && cursors.length > 0) {
            setCursorPosition(cursors[0].id, [coords.top - parent.top, coords.left - parent.left]);
        }
    }

    return (
        <div className="flex flex-1 relative" ref={editorRef} onMouseDown={updateCursor} onKeyDown={updateCursor}>
            <div className="relative w-full cursor-text" data-editor>
                <Blocks />
            </div>
            <Cursor />
        </div>
    );
}