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
    length: number;

    addBlock: ({ id, text }: AddBlockProps) => void;
}

export const useBufferStore = create<BufferState>()(
    devtools(
        (set) => ({
            blocks: [{
                id: randId(),
                text: null,
            }],
            blockLimit: null,

            // Total length of blocks
            length: 1,

            // Insert {text} at {position}
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
            }
        })
    )
);