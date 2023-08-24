export function arraysHaveSameElements(a, b) {
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