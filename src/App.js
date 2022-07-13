import React from "react";
import "./App.css";
import Peticiones from "./Users/index";
import Modal from "./components/modal/index";

const App = () => {
  return (
    <div>
      <Peticiones />
      <Modal />
    </div>
  );
};

export default App;
