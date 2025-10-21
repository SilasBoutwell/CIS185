function countLeaves(days) {
    let total = 0;
    
    if (typeof days !== 'number' || days <= 0) return 0;

    // Day 1 is 10, day 2 is 20, then +10 each day after that.
    for (let d = 1; d <= days; d++) {
        if (d === 1) total += 10;
        else if (d === 2) total += 20;
        else total += 10 * d; // since day 3 -> 30, day 4 -> 40, etc.
    }

    return total;
}

function categorizeLeafColors(leaves) {
    // leaves is an array of color strings
    // Count each color and return an object
    
    let colorCount = {};
    // Loop through array and count colors
    if (!Array.isArray(leaves)) return colorCount;

    for (const color of leaves) {
        // Normalize: treat non-string as 'unknown'
        const key = (typeof color === 'string') ? color : 'unknown';
        colorCount[key] = (colorCount[key] || 0) + 1;
    }

    return colorCount;
}

/*

// Test Cases
console.log('countLeaves(1) =', countLeaves(1));
console.log('countLeaves(2) =', countLeaves(2));
console.log('countLeaves(4) =', countLeaves(4));
console.log('countLeaves(5) =', countLeaves(5));

console.log('categorizeLeafColors(["red","yellow","red","brown"]) =',
categorizeLeafColors(["red", "yellow", "red", "brown"]));
console.log('categorizeLeafColors(["orange","orange","orange"]) =',
categorizeLeafColors(["orange", "orange", "orange"]));
console.log('categorizeLeafColors([]) =', categorizeLeafColors([]));

*/
