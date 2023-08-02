import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import IMG from "../assets/fotolog-logo-svg-vector.svg";

const NavBar = () => {
  return (
    <>
      <AppBar
        position='static'
        elevation={10}
        style={{ backgroundColor: "crimson", marginBottom: "10px" }}
      >
        <Toolbar>
          <img src={IMG} alt='logo' height='30px' />

          <IconButton></IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
