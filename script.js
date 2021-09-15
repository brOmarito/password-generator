// Assignment Code
var generateBtn = document.querySelector("#generate");
var minLength = 8;
var maxLength = 128;
var answKey = {
                "Y": true,
                "N": false
              };
var continueQuestions = true;
var specialChars = "!#@$%&*()-_.+[]{}";


// Write password to the #password input
function writePassword() {
  
  continueQuestions = window.confirm("Thanks for using brOmarito's password generator.\n"+
                                      "You will be asked a couple of requirements for your password.\n"+
                                      "Click 'OK' when you are ready!\n"+
                                      "Press 'Cancel' if you want to exit the questionnaire at any point.");
  var passLength = getLength();
  var useUpperChars = getYesOrNoAnsw("Should the password include Uppercase Letters?");
  var useLowerChars = getYesOrNoAnsw("Should the password include Lowercase Letters?");
  var useNumeric = getYesOrNoAnsw("Should the password include Numbers?");
  var useSpecialChars = getYesOrNoAnsw("Should the password include Special Characters\n"+
                                        "This includes: " + specialChars);
  if (continueQuestions) {
    if (useUpperChars || useLowerChars || useNumeric || useSpecialChars) {
      var password = generatePassword(useUpperChars, useLowerChars, useNumeric, useSpecialChars, passLength);
      var passwordText = document.querySelector("#password");
    
      passwordText.value = password;
    } else {
      window.alert("You didn't select any character type.\nPlease go back and select at least one.")
    }
  }
}

// Generates array based off of what is selected by the user
function generatePassword(useUpperChars, useLowerChars, useNumeric, useSpecialChars, passLength) {
  var possibleChars = [];
  password = "";
  var upperArray = [];
  var lowerArray = [];
  var numArray = [];
  var specialCharArray = [];
  var verified = false;

  if (useUpperChars) {
    upperArray = createAlphabetArray("upper");
    possibleChars = possibleChars.concat(upperArray);
  }
  if (useLowerChars) {
    lowerArray = createAlphabetArray("lower");
    possibleChars = possibleChars.concat(lowerArray);
  }
  if (useNumeric) {
    numArray = "123456789".split("");
    possibleChars = possibleChars.concat(numArray);
  }
  if (useSpecialChars) {
    specialCharArray = specialChars.split("");
    possibleChars = possibleChars.concat(specialCharArray);
  }

  while (!verified) {
    for (var i = 0; i < passLength; i++) {
      password += possibleChars[Math.floor(Math.random() * possibleChars.length)];
    }
    verified = verifyAtLeastOne(useUpperChars, useLowerChars, useNumeric, useSpecialChars, upperArray, lowerArray, numArray, specialCharArray, passLength);
  }
  return password;
}

// Verifies that there is at least one instance of each group
// selected by the user
function verifyAtLeastOne(useUpperChars, useLowerChars, useNumeric, useSpecialChars, upperArray, lowerArray, numArray, specialCharArray, passLength) {
  var clear = true;
  var passwordArray = password.split("");

  if (useUpperChars) {
    clear = compareArrays(passwordArray, upperArray, clear);
  }
  if (useLowerChars) {
    clear = compareArrays(passwordArray, lowerArray, clear);
  }
  if (useNumeric) {
    clear = compareArrays(passwordArray, numArray, clear);
  }
  if (useSpecialChars) {
    clear = compareArrays(passwordArray, specialCharArray, clear);
  }
  if (!clear) {
    password = "";
  }
  return clear;
}

// Compare two arrays, check if any of the items
// in the second array exist in the first array
// If any do, return true. If not, return the passed in boolean
function compareArrays(mainArray, subArray, clear) {
  if (!subArray.some(item => mainArray.includes(item))) {
    return false;
  } else {
    return clear;
  }
}

// Create alphabet array
// Accepts string to saydetermin casing
// Not used by user, so not as much errror
// handling needed
function createAlphabetArray(casing) {
  var nums = [];
  var alphabet = [];
  var increment = 65;
  if (casing === "lower") {
    increment = 97;
  }
  for (var i = 0; i < 26; i++) {
    alphabet.push(String.fromCharCode(i+increment));
  }
  return alphabet;
}

// Get length and verify the provided
// user input
function getLength() {
  if (continueQuestions) {
    var passLength = window.prompt("How long should the password be?\n"+
                                    "(Please enter a number between " + minLength + " and " + maxLength + ")");
    if (passLength === "") {
      window.alert("Please enter a number");
      passLength = getLength();
    } else if (!passLength) {
      continueQuestions = false;
    } else if (isNaN(parseInt(passLength))) {
      window.alert("Please enter a number");
      passLength = getLength();
    } else if (passLength < minLength || passLength > maxLength) {
      window.alert("Please enter a number between " + minLength + " and " + maxLength);
      passLength = getLength();
    }
    return passLength
  }
}

// Return True/False for a Y or N
// user response and verify the
// provided response
function getYesOrNoAnsw(message) {
  if (continueQuestions){
    var fullMessage = message + "\nEnter Y for YES and N for NO."
    var userResponse = window.prompt(fullMessage);
    if (userResponse === "") {
      window.alert("Please enter either Y or N.");
      return getYesOrNoAnsw(message);
    } else if (!userResponse) {
      continueQuestions = false;
      return;
    } else if (userResponse === "" || !(userResponse.toUpperCase() in answKey)) {
      window.alert("Please enter either Y or N.");
      return getYesOrNoAnsw(message);
    }
    
    return answKey[userResponse.toUpperCase()];
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
