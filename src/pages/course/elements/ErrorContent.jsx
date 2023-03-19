import { red } from "@mui/material/colors";
import { Typography } from "@mui/material";

function ErrorContent({ error }) {
  return (
    <>
      <Typography variant="h2" component="span" color={red[700]}>
        Error!
      </Typography>
      <Typography variant="body1">Error code: {error.code}</Typography>
      <Typography variant="body1">Error message: {error.message}</Typography>
    </>
  );
}
export default ErrorContent;
