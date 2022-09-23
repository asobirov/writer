type Coord = {
    top: number;
    left: number;
};

export function getSelectionCoords(atStart: boolean): Coord | null {
    const sel = window.getSelection();

    // check if selection exists
    if (!sel?.rangeCount) return null;

    // get range
    let range = sel.getRangeAt(0).cloneRange();
    if (!range.getClientRects) return null;

    // get client rect
    range.collapse(atStart);
    let rects = range.getClientRects();
    if (rects.length <= 0) return null;

    // return coord
    let rect = rects[0];
    return { top: rect.top, left: rect.left };
}