import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import logoImage from "@/public/logos/Logo maker project (1).png";
import { MdLogout } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoCalendarClear } from "react-icons/io5";

const drawerWidth = 230;
const seasons = [
  {
    name: "Summer 2025",
    startDate: "2025-06-01",
  },
  {
    name: "Fall 2025",
    startDate: "2025-09-01",
  },
  {
    name: "Winter 2025",
    startDate: "2025-12-01",
  },
  {
    name: "Spring 2026",
    startDate: "2026-03-01",
  },
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState(0);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          border: "none",
          "& .MuiDrawer-paper": {
            backgroundColor: "#05472A",
            p: 2,
          },
        }}>
        <DrawerHeader sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          {open && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                pl: 1,
              }}>
              <Image src={logoImage} alt="logo" height={40} />
            </Box>
          )}
        </DrawerHeader>
        <List
          sx={{
            mt: 2,
          }}>
          {seasons.map((season, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => setSelected(index)}
                sx={[
                  {
                    minHeight: 48,
                  },
                  open
                    ? {
                        justifyContent: "initial",
                        borderRadius: "10px",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}>
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 2.5,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}>
                  {selected !== index ? (
                    <IoCalendarClearOutline color="white" size="1.3rem" />
                  ) : (
                    <IoCalendarClear color="white" size="1.3rem" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={season.name}
                  disableTypography
                  sx={[
                    open
                      ? {
                          opacity: 1,
                          color: "white",
                          fontSize: "1rem",
                        }
                      : {
                          opacity: 0,
                          color: "white",
                          fontSize: "1rem",
                        },
                    selected === index
                      ? {
                          fontWeight: "medium",
                        }
                      : {
                          fontWeight: "regular",
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List
          sx={{
            mt: "auto",
          }}>
          {["Billing", "Log Out"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                  },
                  open
                    ? {
                        justifyContent: "initial",
                        borderRadius: "10px",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}>
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 2.5,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}>
                  {index % 2 === 1 ? (
                    <MdLogout size="1.3rem" color="white" />
                  ) : (
                    <MdPayment size="1.3rem" color="white" />
                  )}
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                          color: "white",
                          fontSize: "1rem",
                          fontWeight: "regular",
                        }
                      : {
                          opacity: 0,
                          color: "white",
                          fontSize: "1rem",
                          fontWeight: "regular",
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
