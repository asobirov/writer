import { Block as TBlock, useBufferStore } from "@store/buffer";
import { useEditorConfigStore, useEditorStore } from "@store/editor";
import { randId } from "@utils/randId";
import { useEffect, useRef } from "react";

type BlockProps = {
    children: React.ReactNode;
    blockConfig: TBlock;
    isCurrentBlock?: boolean;
}

export const Block: React.FC<BlockProps> = ({
    children,
    blockConfig,
    isCurrentBlock,
}) => {
    const [setCurrentBlockId] = useEditorStore((store) => [store.setCurrentBlockId]);
    const [spellCheck] = useEditorConfigStore((store) => [store.spellCheck]);
    const [addBlock] = useBufferStore((store) => [store.addBlock])

    const blockRef = useRef<HTMLDivElement>(null);

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const { key, altKey, metaKey, shiftKey } = e;
        console.log("KeyDown", e.currentTarget.innerText);

        switch (key) {
            case "Enter": {
                if (!shiftKey) {
                    e.preventDefault();
                    const newBlockId = randId();
                    addBlock({
                        id: newBlockId,
                        text: null
                    });
                    setCurrentBlockId(newBlockId);
                }
            }
        }
    }

    useEffect(() => {
        if (isCurrentBlock) {
            blockRef.current?.focus();
        }
    }, [isCurrentBlock]);

    return (
        <div
            className="max-w-full w-full whitespace-pre-wrap word-break-word no-overflow-anchor caret-red-800"
            placeholder="Type here..."
            spellCheck={spellCheck}
            contentEditable

            data-block-id={blockConfig.id}

            ref={blockRef}
            onKeyDown={onKeyDownHandler}
        >
            {children}
        </div>
    )
}