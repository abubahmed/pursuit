"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import logoImage from "@/public/logos/Pursuit_transparent-.png";
import Image from "next/image";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const subTabSXProps = {
  alignItems: "flex-start",
  alignContent: "flex-start",
  textTransform: "none",
  color: "black",
  fontSize: "1rem",
  "&.Mui-selected": {
    color: "rgb(20,86,57)",
  },
  pl: 2,
  fontWeight: "regular",
};

const tabSXProps = {
  alignItems: "flex-start",
  alignContent: "flex-start",
  textTransform: "none",
  color: "black",
  fontSize: "1rem",
  "&.Mui-selected": {
    color: "rgb(20,86,57)",
  },
  fontWeight: "regular",
};

function VerticalTabs({ seasons }: { seasons: { name: string; date: string }[] }) {
  const [selectedTab, setSelectedTab] = React.useState({ tab: 0, subTab: 0 });
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab({ subTab: 0, tab: newValue });
  };
  const handleChangeSub = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab({ ...selectedTab, subTab: newValue });
  };

  return (
    <Box
      sx={{ bgcolor: "background.paper", display: "flex", flexDirection: "column", width: "100%" }}>
      <Tabs
        orientation="vertical"
        value={selectedTab.tab}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        TabIndicatorProps={{
          style: {
            backgroundColor: "rgb(20,86,57)",
          },
        }}
        sx={{
          borderColor: "divider",
          pl: 3,
        }}>
        {seasons &&
          seasons.length > 0 &&
          seasons.map((season, index) => {
            return (
              <Tab
                sx={tabSXProps}
                key={index}
                label={
                  <Typography sx={{ fontSize: "1rem", fontWeight: "regular" }}>
                    {season.name}
                  </Typography>
                }
              />
            );
          })}
      </Tabs>
    </Box>
  );
}

const Sidebar = () => {
  const seasons = [
    {
      name: "Season 1",
      date: "2021-10-10",
    },
    {
      name: "Season 2",
      date: "2022-10-10",
    },
    {
      name: "Season 3",
      date: "2023-10-10",
    },
    {
      name: "Season 4",
      date: "2024-10-10",
    },
    {
      name: "Season 5",
      date: "2025-10-10",
    },
  ];

  return (
    <Box
      sx={{
        width: "250px",
        py: "20px",
        boxShadow: "0px 2px 3px rgba(0,0,0,0.3)",
        zIndex: 2,
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}>
        <Image src={logoImage} alt="logo" width={130} height={40} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          mt: 3,
          width: "100%",
        }}>
        <VerticalTabs seasons={seasons} />
      </Box>
    </Box>
  );
};

export default Sidebar;
