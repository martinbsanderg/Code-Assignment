import {
  hasValidCharacters,
  validateBrackets,
  validateChemicalFormula,
  isAsciiString,
} from "../inputValidation.js";

describe("hasValidCharacters", () => {
  test("returns empty string for valid characters", () => {
    expect(hasValidCharacters("H2O")).toBe("");
    expect(hasValidCharacters("C6H12O6")).toBe("");
    expect(hasValidCharacters("NaCl")).toBe("");
  });

  test("returns error message for invalid characters", () => {
    expect(hasValidCharacters("H2@O")).not.toBe("");
    expect(hasValidCharacters("Na_Cl")).not.toBe("");
  });
});

describe("validateBrackets", () => {
  test("returns empty string for correctly paired brackets", () => {
    expect(validateBrackets("Na[Cl2](OH)3")).toBe("");
    expect(validateBrackets("{[()]}")).toBe("");
  });

  test("returns error message for incorrectly paired brackets", () => {
    expect(validateBrackets("Na[Cl(OH)3")).not.toBe("");
    expect(validateBrackets("Na[Cl(OH)3")).toEqual(
      "Unclosed opening bracket '[' at position 2."
    );
    expect(validateBrackets("NaCl]OH)[")).not.toBe("");
    expect(validateBrackets("NaCl]OH)[")).toEqual(
      "Unmatched closing bracket ']' at position 4. Unmatched closing bracket ')' at position 7. Unclosed opening bracket '[' at position 8."
    );
  });
});

describe("validateChemicalFormula", () => {
  test("validates correct chemical formulas", () => {
    expect(validateChemicalFormula("H2O")).toEqual({
      isValid: true,
      message: "Formula is valid.",
    });
    expect(validateChemicalFormula("C6H12O6")).toEqual({
      isValid: true,
      message: "Formula is valid.",
    });
  });

  test("detects errors in chemical formulas", () => {
    expect(validateChemicalFormula("H2@O")).toEqual(
      expect.objectContaining({ isValid: false })
    );
    expect(validateChemicalFormula("Na[Cl(OH)3")).toEqual(
      expect.objectContaining({ isValid: false })
    );
  });
});

describe("isAsciiString", () => {
  test("correctly identifies ASCII strings", () => {
    expect(isAsciiString("Hello, World!")).toBeTruthy();
    expect(isAsciiString("\x7F")).toBeTruthy();
  });

  test("identifies non-ASCII strings", () => {
    expect(isAsciiString("ñ")).toBeFalsy();
    expect(isAsciiString("你好")).toBeFalsy();
  });
});
