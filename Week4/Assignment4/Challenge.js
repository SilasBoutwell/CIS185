function decimalToBinary(decimal) {
    if (decimal === 0) return "0";
    let binary = "";
    while (decimal > 0) {
        binary = (decimal % 2) + binary;
        decimal = Math.floor(decimal / 2);
    }
    return binary;
}

function binaryToDecimal(binary) {
    let decimal = 0;
    for (let i = 0; i < binary.length; i++) {
        decimal = decimal * 2 + (binary[i] === '1' ? 1 : 0);
    }
    return decimal;
}

function decimalToHexadecimal(decimal) {
    if (decimal === 0) return "0";
    const hexDigits = "0123456789ABCDEF";
    let hex = "";
    while (decimal > 0) {
        hex = hexDigits[decimal % 16] + hex;
        decimal = Math.floor(decimal / 16);
    }
    return hex;
}

/*

// Test Cases
console.log(decimalToBinary(10)) //"1010"
console.log(decimalToBinary(25)) //"11001"
console.log(decimalToBinary(0)) //"0"
console.log(binaryToDecimal("1010")) //10
console.log(binaryToDecimal("11111")) //31
console.log(binaryToDecimal("0")) //0
console.log(decimalToHexadecimal(255)) //"FF"
console.log(decimalToHexadecimal(26)) //"1A"
console.log(decimalToHexadecimal(16)) //"10"

*/
