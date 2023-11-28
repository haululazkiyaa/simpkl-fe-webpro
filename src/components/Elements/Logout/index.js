import { logout } from "../../../services/auth/auth.service";
import { toast } from "react-toastify";

export default function Logout(callback) {
  logout((status) => {
    if (status) {
      if (!toast.isActive("logout-toast")) {
        toast.error("Sesi anda telah berakhir!", {
          toastId: "logout-toast",

          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      callback(true);
    }
    callback(false);
  });
}
