function createPyramid(height) {
    if (typeof height !== 'number' || height <= 0) return '';
    const lines = [];
    for (let i = 1; i <= height; i++) {
        const spaces = ' '.repeat(height - i);
        const stars = '*'.repeat(2 * i - 1);
        lines.push(spaces + stars);
    }
    return lines.join('\n');
}

function createNumberStaircase(steps) {
    if (typeof steps !== 'number' || steps <= 0) return '';
    const lines = [];
    for (let i = 1; i <= steps; i++) {
        let line = '';
        for (let j = 1; j <= i; j++) line += String(j);
        lines.push(line);
    }
    return lines.join('\n');
}

function createCheckerboard(size) {
    if (typeof size !== 'number' || size <= 0) return '';
    const lines = [];
    for (let r = 0; r < size; r++) {
        let row = '';
        for (let c = 0; c < size; c++) {
            row += (r + c) % 2 === 0 ? 'X' : 'O';
        }
        lines.push(row);
    }
    return lines.join('\n');
}

/*

// Test Cases
console.log(createPyramid(3));
//   *
//  ***
// *****
    
console.log(createPyramid(4));
//    *
//   ***
//  *****
// *******
    
console.log(createNumberStaircase(5));
// 1
// 12
// 123
// 1234
// 12345
    
console.log(createCheckerboard(4));
// XOXO
// OXOX
// XOXO
// OXOX

*/
    