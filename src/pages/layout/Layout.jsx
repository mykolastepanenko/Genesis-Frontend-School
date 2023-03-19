import { AppBar, Toolbar, Link } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";

function Layout() {
  const linkStyles = {
    underline: "hover",
    color: "#fff",
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Link component={RouterLink} to="/courses" {...linkStyles}>
            Your courses
          </Link>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
export default Layout;
