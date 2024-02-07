// Helperfunctions
function isUpper(char) {
  return char >= "A" && char <= "Z";
}

function isLower(char) {
  return char >= "a" && char <= "z";
}

function isNumber(char) {
  return char >= "0" && char <= "9";
}

function getQuantity(quantity, multiplier) {
  return quantity ? parseInt(quantity) * multiplier : 1 * multiplier;
}

export const helperFunctions = { isUpper, isLower, isNumber, getQuantity };

// Main function
export function parseMolecule(formula) {
  // Nested function to parse a segment of the formula recursively
  // Accepts a segment of the formula and a multiplier, defaulting to 1
  const parseSegment = (segment, multiplier = 1) => {
    let atomCounts = {}; // Object to store counts of each atom
    let atom = ""; // String to accumulate the current atom symbol
    let quantity = ""; // String to accumulate the current quantity of atoms
    let i = 0; // Index for iterating through the segment

    // Add or update the count of an atom
    const addAtomCount = (atom, count) => {
      if (!atomCounts[atom]) {
        atomCounts[atom] = 0;
      }
      atomCounts[atom] += count;
    };

    // Iterates over the segment to parse atoms, quantities, and nested structures
    while (i < segment.length) {
      const char = segment[i];

      if (isUpper(char)) {
        // Handling uppercase
        if (atom) {
          // If there's a previously accumulated atom, add it with its quantity before proceeding
          addAtomCount(atom, getQuantity(quantity, multiplier));
          quantity = "";
        }
        atom = char;
      } else if (isLower(char)) {
        // Handling lowercase
        atom += char;
      } else if (isNumber(char)) {
        // Accumulating digits as quantity
        quantity += char;
      } else {
        // Handling brackets indicating nested structures
        if (atom) {
          // Add the current atom and its quantity before processing the bracket
          addAtomCount(atom, getQuantity(quantity, multiplier));
          atom = "";
          quantity = "";
        }

        let bracketType = char; // The current bracket type
        let closeBracket = { "(": ")", "[": "]", "{": "}" }[bracketType]; // Mapping to the corresponding closing bracket
        let bracketContent = ""; // String to accumulate content inside the brackets
        let depth = 1; // Depth counter for nested brackets
        i++;

        // Extracts content within nested brackets, adjusting depth for matching pairs
        while (i < segment.length && depth > 0) {
          if (segment[i] === bracketType) {
            depth++;
          } else if (segment[i] === closeBracket) {
            depth--;
          }
          if (depth > 0) {
            bracketContent += segment[i];
          }
          i++;
        }

        // Accumulates the multiplier following the closing bracket
        let bracketMultiplier = "";
        while (i < segment.length && isNumber(segment[i])) {
          bracketMultiplier += segment[i];
          i++;
        }

        // Recursively parses the content within the brackets with the appropriate multiplier
        const nestedCounts = parseSegment(
          bracketContent,
          parseInt(bracketMultiplier) || 1
        );

        // Adds the counts from nested structures to the main atomCounts, adjusted by the current multiplier
        for (const nestedAtom in nestedCounts) {
          addAtomCount(nestedAtom, nestedCounts[nestedAtom] * multiplier);
        }
        continue;
      }
      i++;
    }

    // Adds any remaining atom and its quantity after the last iteration
    if (atom) {
      addAtomCount(atom, getQuantity(quantity, multiplier));
    }

    return atomCounts; // Returns the accumulated atom counts for this segment
  };

  return parseSegment(formula); // Parses the entire formula
}

// // Example usage of the parseMolecule function
// console.log(parseMolecule("H2O")); // Expected: { H: 2, O: 1 }
// console.log(parseMolecule("Mg(OH)2")); // Expected: { Mg: 1, O: 2, H: 2 }
// console.log(parseMolecule("K4[ON(SO3)2]2")); // Expected: { K: 4, O: 14, N: 2, S: 4 }
