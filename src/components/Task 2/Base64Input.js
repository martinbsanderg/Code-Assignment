import { TextField, Button } from "@mui/material";
import { useState } from "react";
import "../componentStyles.css";
import { encodeB64 } from "../../calculations/base64Encoding";
import { isAsciiString } from "../../utils/inputValidation";

export const Base64Input = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [codeRes, setCodeRes] = useState("");

  const onSubmit = (input) => {
    if (!input) {
      setCodeRes("");
      setError(false);
      setErrorText("");
      return;
    }
    setError(!isAsciiString(input));
    if (!isAsciiString(input)) {
      setErrorText(
        "The string you provided contains non-ASCII signs. Only ASCII are allowed"
      );
      setCodeRes("");
      return;
    }
    setCodeRes(encodeB64(input));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target === document.activeElement) {
      // Check if Enter key is pressed and the TextField is active
      onSubmit(value);
    }
  };

  console.log(codeRes.length);

  return (
    <>
      <h3>Input</h3>
      <div className="input-wrapper">
        <TextField
          error={error}
          id="String Input"
          label="String"
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
          Encode
        </Button>
      </div>
      <h3> Result </h3>
      <TextField
        sx={{ width: "600px" }}
        type="text"
        value={codeRes.length <= 0 ? "Waiting for results..." : codeRes}
        variant="outlined"
        inputProps={{ readOnly: true }}
        multiline
        rows={3}
      />
    </>
  );
};
