import { useContext, useState } from "react";

import Alert from "../../../components/Elements/Alert/index.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Button from "../../../components/Elements/Button/index.jsx";
import Drawer from "../../../components/Elements/Drawer/index.jsx";
import Input from "../../../components/Elements/Input/index.jsx";
import Logout from "../../../components/Elements/Logout/index.js";
import PropTypes from "prop-types";
import SelectInput from "../../../components/Elements/SelectInput/index.jsx";
import SuccessBadge from "../../../components/Elements/SuccessBadge/index.jsx";
import { addSiswa } from "../../../services/school-admin/student-data.service.js";
import { getJurusan } from "../../../services/school-admin/major-management.service.js";
import { refreshToken } from "../../../services/auth/auth.service.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function GuidanceGroupAddDrawerView(props) {
  const { handleKelBimbingan, id } = props;
  const { setProgress } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle loading
  const [loading, setLoading] = useState(false);

  // handle input
  const [idJurusan, setIDJurusan] = useState("");
  const [nis, setNis] = useState("");
  const [nisn, setNisn] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHP, setNoHP] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");

  // handle message
  const [message, setMessage] = useState("");

  // handle data jurusan
  const [opsiJurusan, setOpsiJurusan] = useState([]);

  const handleDataJurusan = () => {
    setProgress(30);
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        getJurusan(token, (status, data) => {
          if (status) {
            let options = [];
            for (let item of data) {
              options.push({
                value: item.id,
                label: item.kompetensi_keahlian,
              });
            }
            setOpsiJurusan(options);
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
    });
  };

  const handleTambahSiswa = (e) => {
    e.preventDefault();
    setProgress(30);
    setLoading(true);
    setMessage("");
    const data = {
      id_jurusan: idJurusan,
      nis: nis,
      nisn: nisn,
      nama: nama,
      alamat: alamat,
      no_hp: noHP,
      tempat_lahir: tempatLahir,
      tanggal_lahir: tanggalLahir,
    };
    refreshToken((status, token) => {
      if (status) {
        setProgress(60);
        addSiswa(data, token, (status, message) => {
          if (status) {
            toast.success(`Sukses! Siswa a.n. ${nama} ditambahakan.`, {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            handleKelBimbingan();
            setMessage("success");
          } else {
            setMessage(message);
            toast.error("Gagal menambahkan siswa!", {
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

  const initDrawer = () => {
    handleDataJurusan();
    setMessage("");
    document.getElementById("init-drawer" + id).click();
  };

  return (
    <>
      <Button onClick={() => initDrawer()}>Tambah Siswa Baru</Button>
      <Drawer title="Tambah Siswa Baru" id={id}>
        {message != "success" ? (
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e) => handleTambahSiswa(e)}
          >
            <SelectInput
              options={opsiJurusan}
              label="Pilih Jurusan"
              id="pilih_jurusan"
              onChange={(e) => setIDJurusan(e.value)}
            />
            <Input
              className="text-sm"
              type="text"
              label="NIS"
              name="nis"
              id="nis"
              placeholder="Masukan NIS siswa"
              value={nis}
              onChange={(e) => setNis(e.target.value)}
              required={true}
            />
            <Input
              type="text"
              label="NISN"
              name="nisn"
              id="nisn"
              placeholder="Masukan NISN siswa"
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              required={true}
            />
            <Input
              type="text"
              label="Nama"
              name="nama"
              id="nama"
              placeholder="Masukan nama siswa"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required={true}
            />
            <Input
              type="text"
              label="Alamat"
              name="alamat"
              id="alamat"
              placeholder="Masukan alamat siswa"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required={true}
            />
            <Input
              type="text"
              label="No. HP"
              name="no_hp"
              id="no_hp"
              placeholder="Masukan nomor HP siswa"
              value={noHP}
              onChange={(e) => setNoHP(e.target.value)}
              required={true}
            />
            <Input
              type="text"
              label="Tempat Lahir"
              name="tempat_lahir"
              id="tempat_lahir"
              placeholder="Masukan tempat lahir siswa"
              value={tempatLahir}
              onChange={(e) => setTempatLahir(e.target.value)}
              required={true}
            />
            <Input
              type="date"
              label="Tanggal Lahir"
              name="tanggal_lahir"
              id="tanggal_lahir"
              placeholder="Masukan tanggal lahir siswa"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
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
                "Tambahkan"
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

GuidanceGroupAddDrawerView.propTypes = {
  handleKelBimbingan: PropTypes.func,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  id: PropTypes.string,
};
