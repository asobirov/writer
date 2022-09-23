import { useBufferStore } from "@store/buffer";
import { useCursorStore } from "@store/cursor";
import { useEffect } from "react";

const Cursor: React.FC = () => {
    const [cursors, addCursor] = useCursorStore((store) => [store.cursors, store.addCursor]);
    const [blocks] = useBufferStore((store) => [store.blocks]);
    useEffect(() => {
        addCursor({
            blockId: blocks[0].id,
            position: [0, 0],
        })
    }, [])

    console.log('render')

    return (
        <>
            {cursors.map(cursor => (
                <div
                    key={cursor.id + new Date()}
                    className="absolute w-[3px] h-6 bg-yellow-500 rounded-[1px] transition-[transform_0.8s_ease] top-0 left-0"
                    style={{
                        transform: `translate(${cursor?.position[1] ?? 0}px, ${cursor?.position[0] ?? 0 - 2.5}px)`,
                    }}
                />
            ))}
        </>
    )
}

export default Cursor;