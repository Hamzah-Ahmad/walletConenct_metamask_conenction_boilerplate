import { Grid, Container } from "@material-ui/core";
import Header from "../common/Header";
const Layout = (props) => {
  return (
    <>
      <Header />
      <Container maxWidth="xl" style={{ padding: "0" }}>
        <Grid container item xs={12} justify="center">
          {props.children}
        </Grid>
      </Container>
    </>
  );
};

export default Layout;
