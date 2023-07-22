import React from "react";
import "./miniLoading.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function MiniLoading({ productsLoading = null, full = null, noMargin = false}) {
  return (
    <>
      <Box
        className={!productsLoading ? "mini-loading-box" : null}
        sx={{
          "& .MuiCircularProgress-svg": { color: "#003082" },
          textAlign: "center",
          marginTop: noMargin ? "0px" : "40px",
          height: full ? "100vh" : "",
        }}
      >
        <CircularProgress />
      </Box>
    </>
  );
}

export default MiniLoading;
