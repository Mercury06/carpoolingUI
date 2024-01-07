import React, { useState } from "react";

const usePasswordTogle = () => {
  const [visible, setVisible] = useState(false);
  const togleHandler = () => {
    setVisible(!visible);
  };

  const InputType = visible ? "text" : "password";

  return { InputType, togleHandler, visible };
};

export default usePasswordTogle;
