import React from "react";
import { Box, Typography } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: "250px",
        padding: "20px",
        borderRight: "1px solid rgba(0,0,0,0.1)",
      }}>
      <Typography variant="h6" gutterBottom>
        Sidebar
      </Typography>
    </Box>
  );
};

export default Sidebar;
