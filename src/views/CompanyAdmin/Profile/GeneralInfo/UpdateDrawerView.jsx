import { useContext, useEffect, useState } from "react";

import Alert from "../../../../components/Elements/Alert";
import { AuthContext } from "../../../../context/AuthContext";
import Button from "../../../../components/Elements/Button";
import Drawer from "../../../../components/Elements/Drawer";
import Input from "../../../../components/Elements/Input";
import Logout from "../../../../components/Elements/Logout";
import { PropTypes } from "prop-types";
import SuccessBadge from "../../../../components/Elements/SuccessBadge";
import { refreshToken } from "../../../../services/auth/auth.service";
import { toast } from "react-toastify";
import { updatePerusahaan } from "../../../../services/company-admin/company-data.service";
import { useNavigate } from "react-router-dom";

export default function CompanyProfileUpdateDrawerView(props) {
  const { handleProfilPerusahaan, id } = props;
  const { profile, setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle loading
  const [loading, setLoading] = useState(false);

  // handle input
  const [namaPerusahaan, setNamaPerusahaan] = useState("");
  const [pimpinan, setPimpinan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHP, setNoHP] = useState("");
  const [email, setEmail] = useState("");
  const [web, setWeb] = useState("");

  // handle message
  const [message, setMessage] = useState("");

  const handleUpdateJurusan = (e) => {
    e.preventDefault();
    setProgress(30);
    setLoading(true);
    setMessage("");
    const data = {
      nama_perusahaan: namaPerusahaan,
      pimpinan: pimpinan,
      alamat: alamat,
      no_hp: noHP,
      email: email,
      website: web,
    };
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        updatePerusahaan(data, token, (status, message) => {
          if (status) {
            toast.success(`Sukses! Profil perusahaan diperbarui.`, {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            handleProfilPerusahaan();
            setMessage("success");
          } else {
            setMessage(message);
            toast.error("Gagal memperbarui profil perusahaan!", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      } else {
        Logout((status) => {
          if (status) {
            navigate("/login");
          }
        });
      }
      setProgress(100);
      setLoading(false);
    });
  };

  useEffect(() => {
    setNamaPerusahaan(profile.dataPengguna?.nama_perusahaan);
    setPimpinan(profile.dataPengguna?.pimpinan);
    setAlamat(profile.dataPengguna?.alamat);
    setNoHP(profile.dataPengguna?.no_hp);
    setEmail(profile.dataPengguna?.email);
    setWeb(profile.dataPengguna?.website);
  }, [profile]);

  const getDetails = () => {
    document.getElementById("init-drawer" + id).click();
  };

  return (
    <>
      <button
        id={"update-drawer" + id}
        hidden={true}
        onClick={() => {
          setMessage("");
          getDetails();
        }}
      ></button>
      <Drawer title="Update Profil Perusahaan" id={id}>
        {message != "success" ? (
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => handleUpdateJurusan(e)}
          >
            <Input
              type="text"
              label="Nama Perusahaan"
              name="nama_perusahaan"
              id="nama_perusahaan"
              placeholder="Masukan nama perusahaan"
              value={namaPerusahaan}
              onChange={(e) => setNamaPerusahaan(e.target.value)}
              required={true}
            />
            <Input
              type="text"
              label="Pimpinan"
              name="pimpinan"
              id="pimpinan"
              placeholder="Masukan program keahlian"
              value={pimpinan}
              onChange={(e) => setPimpinan(e.target.value)}
              required={true}
            />
            <Input
              type="text"
              label="Alamat"
              name="alamat"
              id="alamat"
              placeholder="Masukan alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required={true}
            />
            <Input
              type="text"
              label="No. HP"
              name="no_hp"
              id="no_hp"
              placeholder="Masukan nomor HP"
              value={noHP}
              onChange={(e) => setNoHP(e.target.value)}
              required={true}
            />
            <Input
              type="text"
              label="Email Perusahaan"
              name="email"
              id="email"
              placeholder="Masukan email perusahaan"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />

            <Input
              type="text"
              label="Website Perusahaan"
              name="web"
              id="web"
              placeholder="Masukan website perusahaan"
              value={web}
              onChange={(e) => setWeb(e.target.value)}
              required={true}
            />
            <Alert>{message}</Alert>
            <Button type="submit" width="full" disabled={loading}>
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
                "Perbarui"
              )}
            </Button>
          </form>
        ) : (
          <SuccessBadge id={id}>Berhasil menambahkan data!</SuccessBadge>
        )}
      </Drawer>
    </>
  );
}

CompanyProfileUpdateDrawerView.propTypes = {
  data: PropTypes.any,
  handleProfilPerusahaan: PropTypes.func,
  id: PropTypes.string,
};
