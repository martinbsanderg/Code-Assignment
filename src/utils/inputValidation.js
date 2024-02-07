// Checks if the formula contains only valid characters (letters, digits, and brackets)
export function hasValidCharacters(formula) {
  const validChars = /^[A-Za-z0-9[\]{}()]+$/;
  return validChars.test(formula) ? "" : "Formula contains invalid characters.";
}

// Validates the pairing and order of brackets in the formula
export function validateBrackets(formula) {
  const stack = [];
  const openingBrackets = "([{";
  const closingBrackets = ")]}";
  const bracketPairs = { ")": "(", "]": "[", "}": "{" };
  let errors = [];

  for (let i = 0; i < formula.length; i++) {
    const char = formula[i];
    if (openingBrackets.includes(char)) {
      stack.push({ char, i }); // Push opening bracket and position onto stack
    } else if (closingBrackets.includes(char)) {
      if (stack.length === 0) {
        errors.push(`Unmatched closing bracket '${char}' at position ${i}.`);
        continue;
      }
      const last = stack.pop();
      if (last.char !== bracketPairs[char]) {
        errors.push(
          `Mismatched bracket '${char}' at position ${i}, does not match opening bracket '${last.char}' at position ${last.i}.`
        );
      }
    }
  }

  stack.forEach(({ char, i }) => {
    errors.push(`Unclosed opening bracket '${char}' at position ${i}.`);
  });

  return errors.join(" ");
}

export function validateChemicalFormula(formula) {
  let errors = [];
  let errorMessage;

  // Check for valid characters
  errorMessage = hasValidCharacters(formula);
  if (errorMessage) {
    errors.push(errorMessage);
  }

  // Validate brackets
  errorMessage = validateBrackets(formula);
  if (errorMessage) {
    errors.push(errorMessage);
  }

  // Compile errors and determine validity
  if (errors.length > 0) {
    return { isValid: false, message: errors.join(" ") };
  } else {
    return { isValid: true, message: "Formula is valid." };
  }
}

export function isAsciiString(str) {
  return /^[\x00-\x7F]*$/.test(str);
}
