import { DotLottiePlayer } from "@dotlottie/react-player";

export default function AddDataFirst() {
  return (
    <div className="flex justify-center">
      <div className="max-w-sm max-h-60">
        <DotLottiePlayer src="/animation/add-data-first.lottie" autoplay loop />
      </div>
    </div>
  );
}
