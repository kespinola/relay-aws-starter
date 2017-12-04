import React from "react";
import { render } from "react-dom";
import Main from "./main";

const load = () => {
  render(<Main />, document.getElementById("root"));
};

load();
