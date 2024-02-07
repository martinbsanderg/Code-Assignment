import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { validateChemicalFormula } from "../../utils/inputValidation";
import { parseMolecule } from "../../calculations/moleculeToAtom";
import "../componentStyles.css";

export const FormulaInput = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [calcRes, setCalcRes] = useState("");

  const onSubmit = (input) => {
    if (!input) {
      setCalcRes("");
      return;
    }
    const nInput = input.replace(/\s/g, "");
    const { isValid, message } = validateChemicalFormula(nInput);
    setError(!isValid);
    !isValid && setErrorText(message);
    isValid && setCalcRes(JSON.stringify(parseMolecule(nInput)));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target === document.activeElement) {
      // Check if Enter key is pressed and the TextField is active
      onSubmit(value);
    }
  };

  console.log(calcRes.length);

  return (
    <>
      <div className="input-wrapper">
        <TextField
          error={error}
          id="Formula iput"
          label="Formula"
          value={value}
          helperText={error ? errorText : undefined}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyPress}
          sx={{ width: "600px" }}
        />
        <Button
          size="large"
          variant="contained"
          onClick={() => onSubmit(value)}
        >
          Calculate
        </Button>
      </div>

      <TextField
        type="text"
        value={calcRes.length <= 0 ? "Waiting for results..." : calcRes}
        variant="outlined"
        inputProps={{ readOnly: true }}
        sx={{ width: "600px", marginTop: "24px" }}
        multiline
        rows={3}
      />
    </>
  );
};
