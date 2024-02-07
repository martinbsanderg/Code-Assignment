import { parseMolecule, helperFunctions } from "../moleculeToAtom";

describe("helperFunctions", () => {
  test("isUpper", () => {
    expect(helperFunctions.isUpper("A")).toBeTruthy();
    expect(helperFunctions.isUpper("a")).toBeFalsy();
  });

  test("isLower", () => {
    expect(helperFunctions.isLower("a")).toBeTruthy();
    expect(helperFunctions.isLower("A")).toBeFalsy();
  });

  test("isNumber", () => {
    expect(helperFunctions.isNumber("1")).toBeTruthy();
    expect(helperFunctions.isNumber("a")).toBeFalsy();
  });

  test("getQuantity", () => {
    expect(helperFunctions.getQuantity("3", 2)).toBe(6);
    expect(helperFunctions.getQuantity(undefined, 2)).toBe(2);
  });
});

describe("parseMolecule", () => {
  test("parses simple molecule", () => {
    expect(parseMolecule("H2O")).toEqual({ H: 2, O: 1 });
  });

  test("parses molecule with single group", () => {
    expect(parseMolecule("Mg(OH)2")).toEqual({ Mg: 1, O: 2, H: 2 });
  });

  test("parses molecule with nested groups", () => {
    expect(parseMolecule("K4{Fe[ON(SO3)2]2}2")).toEqual({
      K: 4,
      Fe: 2,
      O: 28,
      N: 4,
      S: 8,
    });
  });

  test("parses molecules with edge cases", () => {
    expect(parseMolecule("")).toEqual({});
    expect(parseMolecule("[(H2O)2]3")).toEqual({ H: 12, O: 6 }); // Assuming your parser can handle this syntax
  });
});
