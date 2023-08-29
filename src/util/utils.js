function arraysHaveSameElements(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    
    const sortedA = a.slice().sort();
    const sortedB = b.slice().sort();
    
    for (let i = 0; i < sortedA.length; i++) {
        if (sortedA[i] !== sortedB[i]) {
            return false;
        }
    }

    return true;
}
function getDialogString(strings) {
    return strings.join('\n');
}
function containsHTML(text) {
    const reg = /<\/?[a-z][\s\S]*>/i;
    return reg.test(text);
}
function isBase64Image(src) {
    return /^data:image\/[^;]+;base64,/.test(src);
}

export {arraysHaveSameElements, getDialogString, containsHTML, isBase64Image}