import { useBufferStore } from "@store/buffer"
import { forwardRef, FormEvent, KeyboardEvent, ClipboardEvent } from "react"

export const InputListener = forwardRef<HTMLTextAreaElement>((_, ref) => {
    return (
        <div className="absolute inset-0 select-none">
            <Input ref={ref} />
        </div>
    )
})

const Input = forwardRef<HTMLTextAreaElement>((_,
    ref
) => {
    const [addBlock] = useBufferStore((state) => ([state.addBlock]))

    function handleInput(e: FormEvent<HTMLTextAreaElement>) {
        e.preventDefault();

        const { value } = e.currentTarget;
        e.currentTarget.value = '';

        // insert({ row: 1, column: 1 }, value);

    }

    function handlePaste(e: ClipboardEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        console.log("Paste", e.currentTarget.value);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        console.log("KeyDown", e.currentTarget.value);
        const { key, altKey, metaKey, shiftKey } = e;

        let preventDefault = true;

        switch (key) {
            case "Enter": {
                console.log("Enter");
                break;
            }
            case "Backspace": {
                if (metaKey) {
                    console.log("Delete to start of line");
                    break;
                }

                if (altKey) {
                    console.log("Delete to start of word");
                    break;
                }

                console.log("Delete");
                break;
            }
            case "ArrowUp": {
                if (metaKey) {
                    console.log("Move to the very start of the document");
                    break;
                }

                if (altKey && !shiftKey) {
                    console.log("Swap lines up");
                    break;
                }

                console.log("Move up");
                break;
            }
            case "ArrowDown": {
                if (metaKey) {
                    console.log("Move to the very bottom of the document");
                    break;
                }

                if (altKey && !shiftKey) {
                    console.log("Swap lines down");
                    break;
                }

                console.log("Move down");
                break;
            }
            case "ArrowLeft": {
                if (metaKey) {
                    console.log("Move to the start of the line");
                    break;
                }

                if (altKey) {
                    console.log("Move to the start of the word");
                    break;
                }

                console.log("Move left");
                break;
            }
            case "ArrowRight": {
                if (metaKey) {
                    console.log("Move to the end of the line");
                    break;
                }

                if (altKey) {
                    console.log("Move to the end of the word");
                    break;
                }

                console.log("Move right");
                break;
            }
            default: {
                preventDefault = false;
            }
        }


        if (preventDefault) {
            e.preventDefault();
        }
    }

    return (
        <textarea
            className="absolute pointer-events-none w-0 h-0 opacity-0"
            ref={ref}

            onInput={handleInput}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}

            autoFocus={true}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            tabIndex={0}
        />
    )
})