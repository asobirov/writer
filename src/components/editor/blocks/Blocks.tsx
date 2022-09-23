import { useBufferStore } from "@store/buffer";
import { useCursorStore } from "@store/cursor";
import { useEditorStore } from "@store/editor";
import { useEffect, useLayoutEffect } from "react";
import { Block } from "./Block";

const Blocks: React.FC = () => {
    const [bufferBlocks] = useBufferStore((store) => [store.blocks, store.addBlock]);
    const [currentBlockId, setCurrentBlockId] = useEditorStore((store) => [store.currentBlockId, store.setCurrentBlockId]);
    const [addCursor] = useCursorStore((store) => [store.addCursor]);

    useLayoutEffect(() => {
        setCurrentBlockId(bufferBlocks[0].id);
        addCursor({
            blockId: bufferBlocks[0].id,
            position: [0, 0],
        })
    }, [])


    return (
        <div className="flex flex-col items-start flex-1 pb-[30vh]">
            {bufferBlocks.map(block => (
                <Block
                    key={block.id}
                    blockConfig={block}
                    isCurrentBlock={currentBlockId === block.id}
                >
                    {block.text}
                </Block>
            ))}
        </div>
    )
}

export default Blocks;