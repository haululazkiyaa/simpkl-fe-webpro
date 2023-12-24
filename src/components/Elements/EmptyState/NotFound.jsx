import { DotLottiePlayer } from "@dotlottie/react-player";

export default function NotFound() {
  return (
    <div className="flex justify-center">
      <div className="max-w-sm max-h-60">
        <DotLottiePlayer src="/animation/not-found.lottie" autoplay loop />
      </div>
    </div>
  );
}
