import { DotLottiePlayer } from "@dotlottie/react-player";

export default function OnDev() {
  return (
    <div className="flex justify-center">
      <div className="max-w-sm max-h-60">
        <DotLottiePlayer src="/animation/on-development.lottie" autoplay loop />
      </div>
    </div>
  );
}
