import React from "react";
import { Button } from "@mui/material";

const SmallButton = ({
  type,
  children,
  onClick = () => {
    console.log("Button clicked");
  },
}: {
  type: string;
  children: React.ReactNode;
  onClick?: any;
}) => {
  if (type === "contained") {
    return (
      <Button
        onClick={onClick}
        variant="contained"
        style={{
          backgroundColor: "#05472A",
          color: "white",
          boxShadow: "none",
          textTransform: "none",
          borderRadius: "50px",
          padding: "8px 25px",
          fontSize: "0.95rem",
        }}>
        {children}
      </Button>
    );
  } else if (type === "outlined") {
    return (
      <Button
        onClick={onClick}
        variant="outlined"
        sx={{
          color: "black",
          textTransform: "none",
          borderRadius: "50px",
          padding: "8px 25px",
          border: "1px solid black",
          fontSize: "0.95rem",
        }}>
        {children}
      </Button>
    );
  }
};

export default SmallButton;
