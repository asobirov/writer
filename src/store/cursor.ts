import { randId } from '@utils/randId';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

type Cursor = {
    id: string;
    position: [number, number];
    blockId: string;
}

type AddCursorArgs = Omit<Cursor, 'id'> & Partial<Pick<Cursor, 'id'>>;

type CursorState = {
    cursors: Cursor[];
    addCursor: (cursor: AddCursorArgs) => void;
    setCursorPosition: (id: string, position: [number, number]) => void;
    syncCursorPositions: (cursors: Cursor[]) => void;
}

export const useCursorStore = create<CursorState>()(
    devtools(
        (set) => ({
            cursors: [],
            addCursor: (cursor) => {
                set((state) => {
                    const { blockId, position } = cursor;
                    if (state.cursors.find((c) => c.blockId === blockId && c.position[0] === position[0] && c.position[1] === position[1])) {
                        return state;
                    }

                    return {
                        ...state,
                        cursors: [
                            ...state.cursors,
                            {
                                id: randId(),
                                ...cursor
                            }
                        ]
                    }
                })
            },
            setCursorPosition: (id, position) => {
                set((state) => ({
                    ...state,
                    cursors: state.cursors.map((cursor) => {
                        if (cursor.id === id) {
                            return {
                                ...cursor,
                                position
                            }
                        }
                        return cursor;
                    })
                }))
            },
            syncCursorPositions: (cursorsToUpdate) => {
                set((state) => ({
                    ...state,
                    cursors: state.cursors.map((cursor) => {
                        const cursorToUpdate = cursorsToUpdate.find((c) => c.id === cursor.id);
                        return cursorToUpdate ?? cursor;
                    })
                }))
            }

        })
    )
);