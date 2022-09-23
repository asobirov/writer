import create from "zustand";
import { devtools } from "zustand/middleware"
import { randId } from "@utils/randId";
import { RefObject } from "react";

export type Block = {
    id: string,
    text: string | null,
    type?: string,
}

type AddBlockProps = Omit<Block, "id"> & Partial<Pick<Block, "id">>;

type BufferState = {
    blocks: Block[];
    blockLimit: number | null;

    addBlock: ({ id, text }: AddBlockProps) => void;
    removeBlock: (id: string) => void;
    updateBlock: (block: Block) => void;
}

export const useBufferStore = create<BufferState>()(
    devtools(
        (set) => ({
            blocks: [{
                id: randId(),
                text: "Hey there!",
            }],
            blockLimit: null,

            addBlock: ({ id, text }) => {
                set((state) => ({
                    ...state,
                    blocks: [
                        ...state.blocks,
                        {
                            id: id ?? randId(),
                            text
                        }
                    ],
                }))
            },
            removeBlock: (id) => {
                set((state) => ({
                    ...state,
                    blocks: state.blocks.filter((block) => block.id !== id)
                }))
            },
            updateBlock: (block) => {
                set((state) => ({
                    ...state,
                    blocks: state.blocks.map((b) => {
                        if (b.id === block.id) {
                            return block;
                        }
                        return b;
                    })
                }))
            }
        })
    )
);