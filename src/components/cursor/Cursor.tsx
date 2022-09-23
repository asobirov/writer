import { useBufferStore } from "@store/buffer";
import { useCursorStore } from "@store/cursor";
import { getSelectionCoords } from "@utils/getSelectCords";
import { RefObject, useEffect, useLayoutEffect } from "react";

const Cursor: React.FC<{ parentRef: RefObject<HTMLElement> }> = ({ parentRef }) => {
    const [cursors, addCursor, setCursorPosition] = useCursorStore((store) => [store.cursors, store.addCursor, store.setCursorPosition]);
    const [blocks] = useBufferStore((store) => [store.blocks]);

    const updateCursor = () => {
        const coords = getSelectionCoords(true);
        const parent = parentRef.current?.getBoundingClientRect();

        if (coords && parent && cursors.length > 0) {
            setCursorPosition(cursors[0].id, [coords.left - parent.left, coords.top - parent.top]);
        }
    }

    useEffect(() => {
        addCursor({
            blockId: blocks[0].id,
            position: [0, 0],
        })
    }, [])

    // ! Probably not the best way to update the cursor position
    useLayoutEffect(() => {
        document.addEventListener('selectionchange', updateCursor);
        return () => {
            document.removeEventListener('selectionchange', updateCursor);
        }
    })

    return (
        <>
            {cursors.map(cursor => (
                <div
                    key={cursor.id}
                    className="absolute w-[3px] h-6 bg-yellow-500 rounded-[1px] transition-transform duration-150 ease-in-out top-0 left-0"
                    style={{
                        transform: `translate(${cursor?.position[0] ?? 0}px, ${cursor?.position[1] ? cursor.position[1] - 2.5 : 0}px)`,
                    }}
                />
            ))}
        </>
    )
}

export default Cursor;