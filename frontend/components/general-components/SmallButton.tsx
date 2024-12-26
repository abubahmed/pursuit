import React from "react";
import { Button } from "@mui/material";

const SmallButton = ({ type, children }: { type: string; children: React.ReactNode }) => {
  if (type === "contained") {
    return (
      <Button
        variant="contained"
        style={{
          backgroundColor: "#05472A",
          color: "white",
          textTransform: "none",
          borderRadius: "50px",
          padding: "5px 25px",
          fontSize: "0.95rem",
        }}>
        {children}
      </Button>
    );
  } else if (type === "outlined") {
    return (
      <Button
        variant="outlined"
        sx={{
          color: "black",
          textTransform: "none",
          borderRadius: "50px",
          padding: "5px 25px",
          border: "1px solid black",
          fontSize: "0.95rem",
        }}>
        {children}
      </Button>
    );
  }
};

export default SmallButton;
