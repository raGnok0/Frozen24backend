const fs = require('fs');

// Read the JSON file
const jsonData = fs.readFileSync('frozen24-afe64-firebase-adminsdk-743hl-15aaeb4d64.json', 'utf-8');

// Convert JSON to a string
const jsonString = JSON.stringify(JSON.parse(jsonData));

// Encode the JSON string to Base64
const base64Data = Buffer.from(jsonString).toString('base64');

// Save the Base64 string to a file (optional)
fs.writeFileSync('encoded_base64.txt', base64Data);

console.log('Base64 Encoded Data:', base64Data);
