// ID Validation - checks if a given number is a positive integer
function isValidInteger(id: number) {
  return new Promise((resolve, reject) => {
    if (!id || isNaN(id) || Math.floor(id) !== id || id < 1) {
      reject("Bad data - not an integer");
    } else {
      resolve("Good data - is an integer");
    }
  });
}

// String Validation - checks if a given array of strings exist, and if they are of type string
function isValidString(array: string[]) {
  return new Promise((resolve, reject) => {
    if (!array.every((string) => string && typeof string === "string")) {
      reject("Bad data - not a valid string");
    } else {
      resolve("Good data - is a string");
    }
  });
}

// String Length Validation - checks if an array of strings are within the given lengths
// [["myString", 20], ["mySecondString", 35]]
function isValidStringLength(array: [string, number][]) {
  return new Promise((resolve, reject) => {
    if (!array.every((pair) => pair[0].length < pair[1])) {
      reject("Bad data - string is not in range");
    } else {
      resolve("Good data - string is in range");
    }
  });
}

// Email Validation - checks if a given email matches an email pattern
function isValidEmail(email: string) {
  const emailRegex: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmail: boolean = emailRegex.test(email.toLocaleLowerCase());

  return new Promise((resolve, reject) => {
    if (!isEmail) {
      reject(`Bad data - not an email`);
    } else {
      resolve("Good data - is an email");
    }
  });
}

const Validation = {
  isValidInteger,
  isValidID: isValidInteger,
  isValidString,
  isValidEmail,
  isValidStringLength,
};
export default Validation;

/**
 * array.every() executes a function for every value in the array
 * thus, for every string passed in, it checks if it exists, and if it is of type string
 * array.every() returns true if all values in the array pass the test
 * array.every() returns false if any one value fails the test
 * thus, if a string fails the test, it evaluates to false
 * we want it to run the code inside the IF block, so we negate it
 * therefore, on bad strings, we go inside the iF block
 * and on good strings, we do nothing
 */
