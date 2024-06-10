import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#09090b',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
