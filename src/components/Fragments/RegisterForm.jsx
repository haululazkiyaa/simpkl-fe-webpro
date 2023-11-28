import {
  addressValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
  usernameValidation,
} from "../Elements/Validation";
import { useContext, useEffect, useState } from "react";

import Alert from "../Elements/Alert";
import { AuthContext } from "../../context/AuthContext";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import PropTypes from "prop-types";
import { register } from "../../services/auth/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();

  // handle loading
  const [loading, setLoading] = useState(false);
  const { setProgress } = useContext(AuthContext);

  // handle input
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHP, setNoHP] = useState("");
  const [password, setPassword] = useState("");

  // handle validation
  const [errNama, setErrNama] = useState("");
  const [errUsername, setErrUsername] = useState("");
  const [errAlamat, setErrAlamat] = useState("");
  const [errNoHP, setErrNoHP] = useState("");
  const [errPassword, setErrPassword] = useState("");

  // handle message
  const [message, setMessage] = useState("");

  useEffect(() => {
    setErrNama(nameValidation(nama));
  }, [nama]);

  useEffect(() => {
    setErrUsername(usernameValidation(username));
  }, [username]);

  useEffect(() => {
    setErrAlamat(addressValidation(alamat));
  }, [alamat]);

  useEffect(() => {
    setErrNoHP(phoneValidation(noHP));
  }, [noHP]);

  useEffect(() => {
    setErrPassword(passwordValidation(password));
  }, [password]);

  const handleRegister = (e) => {
    e.preventDefault();
    setProgress(30);
    setLoading(true);
    setMessage("");
    const data = {
      username: username,
      password: password,
      nama: nama,
      alamat: alamat,
      no_hp: noHP,
    };
    setProgress(60);
    register(data, (status, message) => {
      if (status) {
        toast.success("Pendaftaran sukses! Silahkan login dengan akun anda.", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/login");
      } else {
        setMessage(message);
      }
      setProgress(100);
      setLoading(false);
    });
  };

  return (
    <>
      <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
        <Input
          label="Nama"
          name="nama"
          id="nama"
          placeholder="Masukan nama lengkap anda"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required={true}
          error={errNama !== ""}
          errMessage={errNama}
        />
        <Input
          label="Username"
          name="username"
          id="username"
          placeholder="Masukan username anda"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
          error={errUsername !== ""}
          errMessage={errUsername}
        />
        <Input
          label="Alamat"
          name="alamat"
          id="alamat"
          placeholder="Masukan alamat lengkap anda"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          required={true}
          error={errAlamat !== ""}
          errMessage={errAlamat}
        />
        <Input
          label="No. HP"
          type="tel"
          name="no_hp"
          id="no_hp"
          placeholder="Masukan nomor HP aktif anda"
          value={noHP}
          onChange={(e) => setNoHP(e.target.value)}
          required={true}
          error={errNoHP !== ""}
          errMessage={errNoHP}
        />
        <Input
          label="Kata Sandi"
          type="password"
          name="password"
          id="password"
          placeholder="Masukan kata sandi anda"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          error={errPassword !== ""}
          errMessage={errPassword}
        />
        <Alert>{message}</Alert>
        <Button
          type="submit"
          width="full"
          disabled={
            loading ||
            errNama != "" ||
            errUsername != "" ||
            errAlamat != "" ||
            errNoHP != "" ||
            errPassword != ""
          }
        >
          {loading ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </>
          ) : (
            "Daftar"
          )}
        </Button>
      </form>
    </>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};
