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
    const [addBlock, updateBlock] = useBufferStore((store) => [store.addBlock, store.updateBlock]);

    const blockRef = useRef<HTMLDivElement>(null);

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const { key, altKey, metaKey, shiftKey } = e;

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

    const onFocusHandler = (e: React.FocusEvent<HTMLDivElement>) => {
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
    }

    const onInputHandler = (e: React.FormEvent<HTMLDivElement>) => {
        console.log("onInput", e.currentTarget.innerText);
        const { textContent } = e.currentTarget;
        updateBlock({
            id: blockConfig.id,
            text: textContent,
        });
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
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            onInput={onInputHandler}
        >
            {children}
        </div>
    )
}