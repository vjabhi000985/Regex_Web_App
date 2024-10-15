async function handleRegexSubmit(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  const regexPattern = document.getElementById('regexPattern').value;
  const testString = document.getElementById('testString').value;

  // Show loading message
  document.getElementById('loading').classList.remove('d-none');
  document.getElementById('result').innerHTML = '';

  // Make an AJAX request to the Flask backend
  const response = await fetch('/test_regex', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
          regexPattern: regexPattern,
          testString: testString
      })
  });

  const data = await response.json();
  document.getElementById('loading').classList.add('d-none');

  if (data.error) {
      document.getElementById('result').innerHTML = `Error: ${data.error}`;
  } else {
      // Insert the highlighted string into the result div
      document.getElementById('result').innerHTML = data.highlighted_string || 'No matches found.';
  }
}

function clearRegexInputs() {
  // Clear the regex pattern and test string input fields
  document.getElementById('regexPattern').value = '';
  document.getElementById('testString').value = '';
  
  // Clear the result display
  document.getElementById('result').innerHTML = '';
  
  // Optionally, hide the loading message
  document.getElementById('loading').classList.add('d-none');
}

async function handleEmailSubmit(event) {
event.preventDefault(); // Prevent the form from submitting normally

const email = document.getElementById('emailInput').value;

// Show loading message
document.getElementById('emailLoading').classList.remove('d-none');
document.getElementById('emailResult').innerHTML = '';

// Make an AJAX request to the Flask backend
const response = await fetch('/validate_email', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({ email: email })
});

const data = await response.json();
document.getElementById('emailLoading').classList.add('d-none');

// Construct the output format
const resultText = data.valid ? 
  `<span style="color: green; font-weight:bolder;">Valid:</span> <em>${email}</em>`: 
  `<span style="color: red; font-weight:bolder;">Invalid:</span> <em>${email}</em>`;

// Display the result
document.getElementById('emailResult').innerHTML = resultText;
}

function clearEmailInputs() {
// Clear the email input field
document.getElementById('emailInput').value = '';

// Clear the result display
document.getElementById('emailResult').innerHTML = '';

// Optionally, hide the loading message
document.getElementById('emailLoading').classList.add('d-none');
}