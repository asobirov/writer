import { useBufferStore } from "@store/buffer";
import { useEditorStore } from "@store/editor";
import { Block } from "./Block";

const Blocks: React.FC = () => {
    const [bufferBlocks] = useBufferStore((store) => [store.blocks, store.addBlock]);
    const [currentBlockId] = useEditorStore((store) => [store.currentBlockId]);

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