import { Response } from "express";

// ID Validation - checks if a given number is a positive integer
function isValidInteger(res: Response, id: number) {
  if (id || isNaN(id) || Math.floor(id) !== id || id < 1) {
    res.status(400).json({ message: "Crap data" });
    return;
  }
}

// String Validation - checks if a given array of strings exist, and if they are of type string
function isValidString(res: Response, array: string[]) {
  if (!array.every((string) => string && typeof string === "string")) {
    res.status(400).json({ message: "Crap data" });
    return;
  }
}

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

// String Validation - Returns false when there is bad data
function isValidStringClient(array: string[]) {
  if (!array.every((string) => string && typeof string === "string")) {
    return false;
  }
}

// String Length Validation - checks if an array of strings are within the given lengths
function isValidStringLength(res: Response, array: [string, number][]) {
  if (!array.every((pair) => pair[0].length > pair[1])) {
    res.status(400).json({ message: "Crap data" });
    return;
  }
}

// String Length Validation - Returns false when there is bad data
function isValidStringLengthClient(array: [string, number][]) {
  if (!array.every((pair) => pair[0].length > pair[1])) {
    return false;
  }
}

// Email Validation - checks if a given email matches an email pattern
function isValidEmail(res: Response, email: string) {
  const emailRegex: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmail: boolean = emailRegex.test(email.toLocaleLowerCase());

  if (!isEmail) {
    res.status(400).json({ message: `crap data` });
    return;
  }
}

// Email Validation - returns true if there is bad data
function isValidEmailClient(email: string) {
  const emailRegex: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmail: boolean = emailRegex.test(email.toLocaleLowerCase());

  if (!isEmail) {
    return false;
  }
}

const Validation = {
  isValidInteger,
  isValidID: isValidInteger,
  isValidString,
  isValidStringClient,
  isValidEmail,
  isValidEmailClient,
  isValidStringLength,
  isValidStringLengthClient,
};
export default Validation;
