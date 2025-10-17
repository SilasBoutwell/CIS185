function celsiusToFahrenheit(celsius) {
    // Convert Celsius to Fahrenheit
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    // Convert Fahrenheit to Celsius
    return (fahrenheit - 32) * 5/9;
}

function getTemperatureDescription(fahrenheit) {
    // Return description based on temperature:
    if (fahrenheit < 32) {
        return "Freezing";
    } else if (fahrenheit <= 50) {
        return "Cold";
    } else if (fahrenheit <= 70) {
        return "Cool";
    } else if (fahrenheit <= 85) {
        return "Warm";
    } else {
        return "Hot";
    }
}

/*

// Test Cases
console.log(celsiusToFahrenheit(0)); // 32
console.log(celsiusToFahrenheit(20)); // 68
console.log(celsiusToFahrenheit(100)); // 212
console.log(celsiusToFahrenheit(-40)); // -40
console.log(fahrenheitToCelsius(32)); // 0
console.log(fahrenheitToCelsius(68)); // 20
console.log(fahrenheitToCelsius(212)); // 100
console.log(getTemperatureDescription(25)); // "Freezing"
console.log(getTemperatureDescription(75)); // "Warm"
console.log(getTemperatureDescription(95)); // "Hot"

*/
