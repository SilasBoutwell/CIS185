function reverseArray(arr) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}

function removeDuplicates(arr) {
  const seen = new Set();
  const result = [];
  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }
  return result;
}

function rotateArray(arr, positions) {
  const len = arr.length;
  if (len === 0) return [];
  const k = ((positions % len) + len) % len; // handle negative or large
  // slice and concat to avoid modifying original
  return arr.slice(-k).concat(arr.slice(0, len - k));
}

function findSecondLargest(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return null;
  let max = -Infinity;
  let second = -Infinity;
  const seen = new Set();
  for (const n of numbers) {
    if (typeof n !== 'number' || Number.isNaN(n)) continue; // skip non-numbers
    if (seen.has(n)) continue;
    seen.add(n);
    if (n > max) {
      second = max;
      max = n;
    } else if (n > second) {
      second = n;
    }
  }
  return second === -Infinity ? null : second;
}

/*

// Test Cases
console.log('reverseArray([1,2,3,4]) ->', reverseArray([1, 2, 3, 4]));
console.log('reverseArray(["a","b","c"]) ->', reverseArray(['a', 'b', 'c']));
console.log('reverseArray([]) ->', reverseArray([]));

console.log('removeDuplicates([1,2,2,3,1,4]) ->', removeDuplicates([1, 2, 2, 3, 1, 4]));
console.log('removeDuplicates(["a","b","a","c"]) ->', removeDuplicates(['a', 'b', 'a', 'c']));

console.log('rotateArray([1,2,3,4],1) ->', rotateArray([1, 2, 3, 4], 1));
console.log('rotateArray([1,2,3,4],2) ->', rotateArray([1, 2, 3, 4], 2));
console.log('rotateArray([1,2,3],4) ->', rotateArray([1, 2, 3], 4));

console.log('findSecondLargest([10,20,30,40]) ->', findSecondLargest([10, 20, 30, 40]));
console.log('findSecondLargest([5,5,5]) ->', findSecondLargest([5, 5, 5]));
console.log('findSecondLargest([100,50,100,75]) ->', findSecondLargest([100, 50, 100, 75]));

*/
