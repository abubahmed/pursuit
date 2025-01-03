import React from "react";
import { Button } from "@mui/material";

const SmallButton = ({
  type,
  children,
  disabled = false,
  onClick = () => {
    console.log("Button clicked");
  },
}: {
  type: string;
  children: React.ReactNode;
  onClick?: any;
  disabled?: boolean;
}) => {
  if (type === "contained") {
    return (
      <Button
        disabled={disabled}
        onClick={onClick}
        variant="contained"
        style={{
          backgroundColor: !disabled ? "rgb(20,86,57)" : "",
          color: "white",
          boxShadow: "none",
          textTransform: "none",
          borderRadius: "100px",
          padding: "8px 25px",
          fontSize: "0.95rem",
        }}>
        {children}
      </Button>
    );
  } else if (type === "outlined") {
    return (
      <Button
        disabled={disabled}
        onClick={onClick}
        variant="outlined"
        sx={{
          color: "black",
          textTransform: "none",
          borderRadius: "100px",
          padding: "8px 25px",
          border: "1px solid black",
          fontSize: "0.95rem",
          boxShadow: "none",
        }}>
        {children}
      </Button>
    );
  }
};

export default SmallButton;
