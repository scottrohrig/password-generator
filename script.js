// Store Reference to Required Elements On Start
var generateBtn = document.querySelector("#generate");
var createPwBtn = document.querySelector("#create");
var checkboxes = document.querySelectorAll(".checkbox");
var pwLengthEl = document.querySelector('#charCountSlider');
var form = document.querySelector('.form-container');
var sliderTextView = document.querySelector('#charCount');

// Define constants
const lowers = 'abcdefghijklmnopqrstuvwxyz';
const capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numerals = '0123456789';
const symbols = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;
const kinds = [lowers,capitals,numerals,symbols];

/** handles open/cancel state of the form element */
const handleFormToggle = () => {
  var formWrapper = document.querySelector("#pw-criteria-form");
  var closed = formWrapper.style.display !== "block";
  if (closed) {
    formWrapper.style.display = "block";
    generateBtn.className = "btn cancel";
  } else {
    formWrapper.style.display = "none";
    generateBtn.className = "btn";
    sliderTextView.innerHTML = 8;
    form.reset();
  }
};

// Set count on page load
sliderTextView.innerHTML = pwLengthEl.value;
// Update current slider value
pwLengthEl.oninput = function() {
  sliderTextView.innerHTML = this.value;
}

// Add event listener to buttons
generateBtn.addEventListener("click", handleFormToggle);
createPwBtn.addEventListener("click", writePassword);

/** Returns an element at a random index from a given iterable */
const getRandomChar = (charType) => {
  let char = Math.floor(Math.random() * charType.length);
  return charType[char];
};

/** Returns a String of character combining character types
 * based on the forms selected checkboxes */
function makeCharacterSet() {
  var selected = [];
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selected[i] = kinds[i];
    }
  }
  if (!selected.length) {
    return '';
  }
  return selected.join('');
}

/** Returns a string of random characters */
const generatePassword = () => {
  
  // Retrieve the desired character length of the password
  var pwLength = pwLengthEl.value;
  // Initialize empty array to hold new values
  var pwArray = [];
  
  // Combine the selected character types into a single string
  var selected = makeCharacterSet();
  
  if (selected) {
    // Iterate thru desired pw length
    for (let i = 0; i < pwLength; i++ ) {
      
      // select random letter
      var character = getRandomChar(selected);
      
      // add character to pw
      pwArray.push(character);
    }
  }

  var password = pwArray.join('');
  return password;
};

// Write password to the #password input
function writePassword(e) {
  e.preventDefault();
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}
