import { randId } from '@utils/randId';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

type Cursor = {
    id?: string;
    position: number;
    blockId: string;
}

type CursorState = {
    cursors: Cursor[];
    addCursor: (cursor: Cursor) => void;
}

export const useCursorStore = create<CursorState>()(
    devtools(
        (set) => ({
            cursors: [],
            addCursor: (cursor) => {
                set((state) => ({
                    ...state,
                    cursors: [
                        ...state.cursors,
                        cursor
                    ]
                }))
            }
        })
    )
);