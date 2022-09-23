import { useCursorStore } from "@store/cursor";
import { useEffect } from "react";

export const Cursor: React.FC = () => {
    const [cursors] = useCursorStore((store) => [store.cursors]);

    console.log("render cursor", cursors);
    return (
        <>
            {cursors.map(cursor => (
                <div
                    key={cursor.id}
                    className="absolute w-[3px] h-6 bg-yellow-500 rounded-sm transition-[transform_0.8s_ease] top-0 left-0"
                    style={{
                        transform: `translate(${cursor.position[1]}px, ${cursor.position[0]}px)`,
                    }}
                />
            ))}
        </>
    )
}