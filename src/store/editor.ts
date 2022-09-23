import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';


type EditorState = {
    currentBlockId: string | null;
    setCurrentBlockId: (id: string) => void;
}

export const useEditorStore = create<EditorState>()(
    devtools(
        persist(
            (set) => ({
                currentBlockId: null,
                setCurrentBlockId: (id) => {
                    set((state) => ({
                        ...state,
                        currentBlockId: id
                    }))
                }
            })
        )
    )
)

type EditorConfigState = {
    horizontalScroll: boolean;
    toggleHorizontalScroll: (horizontalScroll: boolean) => void;

    wordBreak?: WordBreakStyle | null,
    setWordBreak: (wordBreak: WordBreakStyle | null) => void;

    spellCheck: boolean,
    toggleSpellCheck: (spellCheck: boolean) => void;
}

type WordBreakStyle = 'break-all' | 'break-word';

// all types except funcitons
const defaultConfig = {
    horizontalScroll: false,
    wordBreak: 'break-word' as WordBreakStyle,
    spellCheck: false,
}

export const useEditorConfigStore = create<EditorConfigState>()(
    devtools(
        persist(
            (set) => ({
                ...defaultConfig,
                toggleHorizontalScroll: (horizontalScroll) => {
                    set((state) => ({
                        ...state,
                        horizontalScroll: !horizontalScroll,
                        wordBreak: horizontalScroll ? state.wordBreak ?? defaultConfig.wordBreak : null
                    }))
                },

                setWordBreak: (wordBreak) => {
                    set((state) => ({
                        ...state,
                        wordBreak: wordBreak
                    }))
                },

                toggleSpellCheck: (spellCheck) => {
                    set((state) => ({
                        ...state,
                        spellCheck: !spellCheck
                    }))
                }
            })
        )
    )
);