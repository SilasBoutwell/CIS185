function calculateAverage(scores) {
    if (!Array.isArray(scores) || scores.length === 0) return 0;
    const sum = scores.reduce((a, b) => a + b, 0);
    return sum / scores.length;
}

function dropLowestScore(scores) {
    if (!Array.isArray(scores) || scores.length === 0) return [];
    // Copy to avoid modifying original
    const copy = scores.slice();
    let minIndex = 0;
    for (let i = 1; i < copy.length; i++) {
        if (copy[i] < copy[minIndex]) minIndex = i;
    }
    copy.splice(minIndex, 1);
    return copy;
}

function getLetterGrade(score) {
    if (typeof score !== 'number' || isNaN(score)) return 'F';
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
}

function curveGrades(scores, curveAmount) {
    if (!Array.isArray(scores)) return [];
    const amount = Number(curveAmount) || 0;
    return scores.map(s => {
        const val = Number(s) || 0;
        const curved = val + amount;
        return curved > 100 ? 100 : curved;
    });
}

/*

// Test Cases
console.log(calculateAverage([80, 90, 70])); // 80
console.log(calculateAverage([100, 50, 75])); // 75
console.log(calculateAverage([100, 50, 75])); // 75
console.log(calculateAverage([])); // 0
console.log(dropLowestScore([80, 90, 70, 85])); // [80, 90, 85]
console.log(dropLowestScore([50, 50, 75, 100])); // [50, 75, 100]
console.log(dropLowestScore([])); // []
console.log(getLetterGrade(95)); // "A"
console.log(getLetterGrade(72)); // "C"
console.log(getLetterGrade(82)); // "B"
console.log(getLetterGrade(58)); // "F"
console.log(curveGrades([85, 95, 70], 10)); // [95, 100, 80]
console.log(curveGrades([90, 96, 80], 5)); // [95, 100, 85]

*/
