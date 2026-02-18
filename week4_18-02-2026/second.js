const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("--- Temperature Converter ---");
console.log("1: Celsius to Fahrenheit");
console.log("2: Fahrenheit to Celsius");

readline.question('Choose (1 or 2): ', (choice) => {
  readline.question('Enter the temperature: ', (temp) => {
    
    let inputTemp = Number(temp);
    let result;

    if (choice === '1') {
      // C to F: (C * 9/5) + 32
      result = (inputTemp * 9/5) + 32;
      console.log(`${inputTemp}°C is ${result.toFixed(1)}°F`);
    } 
    else if (choice === '2') {
      // F to C: (F - 32) * 5/9
      result = (inputTemp - 32) * 5/9;
      console.log(`${inputTemp}°F is ${result.toFixed(1)}°C`);
    } 
    else {
      console.log("Invalid choice. Please pick 1 or 2.");
    }

    readline.close();
  });
});