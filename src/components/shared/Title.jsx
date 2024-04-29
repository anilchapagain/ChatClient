import React from "react";
import { Helmet } from "react-helmet-async";
const Title = ({
  title = "Chat App",
  description = "can be used for different chat ",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
