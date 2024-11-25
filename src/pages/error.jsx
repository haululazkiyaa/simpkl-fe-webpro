import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return <p>{error.statusText || error.message}</p>;
}
