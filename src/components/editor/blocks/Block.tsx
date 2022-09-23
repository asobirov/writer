import { Block as TBlock, useBufferStore } from "@store/buffer";
import { useCursorStore } from "@store/cursor";
import { useEditorConfigStore, useEditorStore } from "@store/editor";
import { getSelectionCoords } from "@utils/getSelectCords";
import { randId } from "@utils/randId";
import { useCaretPosition } from "hooks/useCaretPostition";
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
    const [addBlock] = useBufferStore((store) => [store.addBlock]);
    const [cursors, setCursorPosition] = useCursorStore((store) => [store.cursors, store.setCursorPosition]);

    const blockRef = useRef<HTMLDivElement>(null);

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const { key, altKey, metaKey, shiftKey } = e;
        console.log("KeyDown", key);

        if (isCurrentBlock || e.currentTarget === document.activeElement) {
            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);
            const rect = range?.getBoundingClientRect();

            const parent = document.querySelector(`[data-editor="true"]`)?.getBoundingClientRect();

            if (rect && parent && cursors.length > 0) {
                console.log("set cursor position", rect, parent);
                setCursorPosition(cursors[0].id, [rect.top - parent.top, rect.left - parent.left]);
            }
        }
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
                break;
            }
            case "ArrowUp": {

                break;
            }
            case "ArrowDown": {
                break;
            }
            case "ArrowLeft": {
                break;
            }
            case "ArrowRight": {
                break;
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
            suppressContentEditableWarning

            data-block-id={blockConfig.id}

            ref={blockRef}
            onKeyDown={onKeyDownHandler}
        >
            {children}
        </div>
    )
}