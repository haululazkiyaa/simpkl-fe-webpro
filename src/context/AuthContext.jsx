import { createContext, useState } from "react";

import LoadingBar from "react-top-loading-bar";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const { children } = props;

  // handle data
  const [profile, setProfile] = useState("");
  const [progress, setProgress] = useState(0);

  return (
    <AuthContext.Provider value={{ profile, setProfile, setProgress }}>
      <LoadingBar
        color="#1A56DB"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
