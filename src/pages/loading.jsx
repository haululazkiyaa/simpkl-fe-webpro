import "@dotlottie/react-player/dist/index.css";

import { DotLottiePlayer } from "@dotlottie/react-player";
import { PropTypes } from "prop-types";

export default function LoadingScreen(props) {
  const { loading } = props;
  return (
    <>
      <div className={loading ? "" : "hidden"}>
        <div className="w-full h-screen flex justify-center items-center absolute z-[100] bg-white">
          <div className="w-72 h-52 text-center">
            <DotLottiePlayer src="/animation/loading.lottie" autoplay loop />
            <p className="text-lg mt-5">Memuat Aplikasi...</p>
          </div>
        </div>
      </div>
    </>
  );
}

LoadingScreen.propTypes = {
  loading: PropTypes.any,
};
