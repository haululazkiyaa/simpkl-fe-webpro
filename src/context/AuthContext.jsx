import { createContext, useState } from "react";

import LoadingBar from "react-top-loading-bar";
import LoadingScreen from "../pages/loading";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const { children } = props;

  // handle data
  const [profile, setProfile] = useState("");
  const [progress, setProgress] = useState(0);

  // handle loading
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{ profile, loading, setProfile, setProgress, setLoading }}
    >
      <LoadingBar
        color="#1A56DB"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <LoadingScreen loading={loading} />
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
