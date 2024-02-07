import { charToBinary, encodeB64 } from "../base64Encoding";

describe("charToBinary", () => {
  test("converts characters to 8-bit binary strings", () => {
    expect(charToBinary("A")).toBe("01000001");
    expect(charToBinary("a")).toBe("01100001");
    expect(charToBinary("0")).toBe("00110000");
  });
});

describe("encodeB64", () => {
  test("encodes ASCII strings to Base64", () => {
    expect(encodeB64("ABC")).toBe("QUJD");
    expect(encodeB64("Man")).toBe("TWFu");
  });

  test("handles padding for non-multiple of 3 length strings", () => {
    expect(encodeB64("M")).toBe("TQ==");
    expect(encodeB64("Ma")).toBe("TWE=");
  });

  test("encodes an empty string to an empty Base64 string", () => {
    expect(encodeB64("")).toBe("");
  });

  test("encodes strings with special characters to Base64", () => {
    expect(encodeB64("!@#$%^&*()")).toMatch(/^[A-Za-z0-9+/]+={0,2}$/);
  });

  test("encodes long strings to Base64", () => {
    const longString = "a".repeat(1000); // A string of 1000 'a's
    expect(encodeB64(longString)).toHaveLength(
      Math.ceil(longString.length / 3) * 4
    );
  });
});
