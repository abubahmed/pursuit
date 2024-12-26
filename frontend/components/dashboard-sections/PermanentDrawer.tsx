import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Image from "next/image";
import logoImage from "@/public/logos/Pursuit_transparent-.png";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaFolderOpen } from "react-icons/fa";
import { FiInbox } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { MdPayment } from "react-icons/md";

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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
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

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 1 }}>
          {open && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}>
              <Image src={logoImage} alt="logo" width={110} height={40} />
            </Box>
          )}
          {/* <IconButton
            onClick={handleDrawer}
            sx={{
              color: "black",
            }}>
            {!open ? (
              <ChevronRightIcon sx={{ fontSize: 25 }} />
            ) : (
              <ChevronLeftIcon sx={{ fontSize: 25 }} />
            )}
          </IconButton> */}
        </DrawerHeader>
        {/* <Divider /> */}
        <List sx={{
          mt: 1
        }}>
          {seasons.map((season, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 4,
                  },
                  open
                    ? {
                        justifyContent: "initial",
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
                  {<FiInbox color="black" size="1.3rem" />}
                </ListItemIcon>
                <ListItemText
                  primary={season.name}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                          color: "black",
                          fontSize: "1rem",
                          fontWeight: "regular",
                        }
                      : {
                          opacity: 0,
                          color: "black",
                          fontSize: "1rem",
                          fontWeight: "regular",
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {["Billing", "Log Out"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 4,
                  },
                  open
                    ? {
                        justifyContent: "initial",
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
                    <MdLogout size="1.3rem" color="black" />
                  ) : (
                    <MdPayment size="1.3rem" color="black" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
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
