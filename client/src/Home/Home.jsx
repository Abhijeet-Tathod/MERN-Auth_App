import React from "react";
import Navbar from "./Navbar";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state) => state.UserInfo);

  return (
    <>
      <Navbar />
      <Typography variant="h2">Name : {currentUser.fullName}</Typography>
    </>
  );
}
