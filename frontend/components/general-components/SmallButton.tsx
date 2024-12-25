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
      // <Button
      //   sx={{
      //     color: "black",
      //     textTransform: "none",
      //     borderRadius: "50px",
      //     padding: "5px 25px",
      //     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      //     border: "1px solid black",
      //     "&:hover": {
      //   backgroundColor: "rgb(240, 240, 240)",
      //     },
      //     fontWeight: "regular",
      //     fontSize: "1rem",
      //   }}>
      //   {children}
      // </Button>
      <Button
        variant="outlined"
        sx={{
          color: "black",
          textTransform: "none",
          borderRadius: "50px",
          padding: "5px 25px",
          border: "1px solid black",
          fontSize: "0.95rem"
        }}>
        {children}
      </Button>
    );
  }
};

export default SmallButton;
