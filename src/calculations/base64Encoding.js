const base64Chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

export const charToBinary = (char) => {
  // String to character code
  const charCode = char.charCodeAt(0);

  // Character code to binary string
  const binaryString = charCode.toString(2);

  // Ensuring 8 bits
  const paddedBinaryString = binaryString.padStart(8, "0");

  return paddedBinaryString;
};

export function encodeB64(input) {
  let output = "";
  let padding = "";
  let binaryString = "";

  // Convert each character to its 8-bit binary representation and concatenate
  for (let i = 0; i < input.length; i++) {
    binaryString += charToBinary(input[i]);
  }

  // Add padding bits if necessary to make the binaryString length a multiple of 6
  const mod = binaryString.length % 24;
  if (mod === 8) {
    binaryString += "0000";
    padding = "==";
  } else if (mod === 16) {
    binaryString += "00";
    padding = "=";
  }

  for (let i = 0; i < binaryString.length; i += 6) {
    const sixBit = binaryString.substring(i, i + 6);
    const index = parseInt(sixBit, 2);
    output += base64Chars[index];
  }

  return output + padding;
}
