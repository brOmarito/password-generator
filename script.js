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
                                      "Click 'OK' when you are ready!");
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

function generatePassword(useUpperChars, useLowerChars, useNumeric, useSpecialChars, passLength) {
  var possibleChars = [];
  var password = "";
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
  for (var i = 0; i < passLength; i++) {
    password += possibleChars[Math.floor(Math.random() * possibleChars.length)];
  }
  verifyAtLeastOne(useUpperChars, useLowerChars, useNumeric, useSpecialChars, password, upperArray, lowerArray, numArray, specialCharArray, passLength);
  return password;
}

function verifyAtLeastOne(useUpperChars, useLowerChars, useNumeric, useSpecialChars, password, upperArray, lowerArray, numArray, specialCharArray, passLength) {
  var clear = true;
  var passwordArray = password.split("");
  console.log(passwordArray)

  if (useUpperChars) {
    clear = compareArrays(passwordArray, upperArray, clear);
    console.log("Clear result for upper: " + clear);
  }
  if (useLowerChars) {
    clear = compareArrays(passwordArray, lowerArray, clear);
    console.log("Clear result for lower: " + clear);
  }
  if (useNumeric) {
    clear = compareArrays(passwordArray, numArray, clear);
    console.log("Clear result for num: " + clear);
  }
  if (useSpecialChars) {
    clear = compareArrays(passwordArray, specialCharArray, clear);
    console.log("Clear result for special: " + clear);
  }
  if (!clear) {
    console.log("Password didn't fit all of the requirements: " + password);
    generatePassword(useUpperChars, useLowerChars, useNumeric, useSpecialChars, passLength);
  } else {
    console.log("Password in verify function: " + password);
    return clear;
  }
}

function compareArrays(mainArray, subArray, clear) {
  if (!subArray.some(item => mainArray.includes(item))) {
    return false;
  } else {
    return clear;
  }
}

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

function getLength() {
  if (continueQuestions) {
    var passLength = window.prompt("How long should the password be?\n"+
                                    "(Please enter a number between " + minLength + " and " + maxLength + ")");
    console.log(parseInt(passLength));
    if (!passLength) {
      continueQuestions = false
    } else if (isNaN(parseInt(passLength))) {
      window.alert("Please enter a number");
      getLength();
    } else if (passLength < minLength || passLength > maxLength) {
      window.alert("Please enter a number between " + minLength + " and " + maxLength);
      getLength();
    }
    return passLength
  }
}

function getYesOrNoAnsw(message) {
  if (continueQuestions){
    var fullMessage = message + "\nEnter Y for YES and N for NO."
    var userResponse = window.prompt(fullMessage);
    if (!userResponse) {
      continueQuestions = false;
    } else if (!(userResponse.toUpperCase() in answKey)) {
      window.alert("That answer doesn't make sense. Please try again.");
      return getYesOrNoAnsw(message);
    }
    
    return answKey[userResponse.toUpperCase()];
  }
}



// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
