import { Grid } from "@mui/material";
import NavBar from "./components/NavBar";
import { HomePage } from "./components/HomePage";

export const App = () => {
  return (
    <>
    <div style={{backgroundColor:"crimson"}}>
      <Grid container fluid spacing={0} style={{backgroundColor:"crimson", padding:"20px"}}>
        <NavBar />
        <HomePage />
        <Grid>
          <Grid
            item
            xs={12}
            style={{
              backgroundColor: "crimson",
              display: "flex",
              justifyContent: "center",
              height: "100vh",
            }}
          ></Grid>
        </Grid>
      </Grid>
      </div>
    </>
  );
};
