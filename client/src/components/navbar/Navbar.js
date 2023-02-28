import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../reducer/user";
import decode from "jwt-decode";
import { deepPurple } from "@mui/material/colors";
import Profile from "../Profile";
import { Box } from "@mui/system";

const Navbar = () => {
  // const {authData,token}= useSelector((store)=>store.user)
  // console.log(authData,token)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const user = null;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseLogout = () => {
    handleClose();
    logout();
  };
  // console.log(user)
  const logout = () => {
    dispatch(logOut());
    navigate("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar
      sx={{
        borderRadius: 2,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 50px",
      }}
      position="static"
      color="inherit"
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          component={Link}
          to="/"
          variant="h4"
          align="center"
          sx={{ color: "rgba(0,183,255, 1)", textDecoration: "none" }}
        >
          FriendsBook
        </Typography>
      </div>
      {user && (
        <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar
              sx={{ bgcolor: deepPurple[500] }}
              src={user?.authData?.picture}
              alt={user?.authData?.name}
            >
              {user?.authData?.name.charAt(0)}
            </Avatar>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>{user?.authData?.name}</MenuItem>
            <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      )}
      {!user && (
        <Tooltip
          title="Click to Sign In"
          sx={{ display: { xs: "inline-block", md: "none" } }}
        >
          <IconButton component={NavLink} to="/auth">
            <Avatar sx={{ bgcolor: deepPurple[500] }}>S</Avatar>
          </IconButton>
        </Tooltip>
      )}
      <Box sx={{ display: { xs: "none", md: "inline-block" } }}>
        <Profile user={user} logout={logout} />
      </Box>
    </AppBar>
  );
};

export default Navbar;
