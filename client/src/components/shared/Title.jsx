import React from "react";
import { Helmet } from "react-helmet-async";

export default function Title({
  title = "Chat",
  description = "This is the chat app called ChatterBox",
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
