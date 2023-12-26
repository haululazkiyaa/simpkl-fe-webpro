import Button from "../../../components/Elements/Button/index.jsx";
import Input from "../../../components/Elements/Input/index.jsx";
import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";

export default function SupervisorDailyMonitoringTableView(props) {
  const { data, setSelected, tanggal, setTanggal } = props;

  const initStaticModal = (item) => {
    setSelected(item);
    document.getElementById("init-static-modal").click();
  };

  const initStaticModal1 = (item) => {
    setSelected(item);
    document.getElementById("init-static-modal1").click();
  };

  const updateDrawer = (item) => {
    setSelected(item);
    document.getElementById("update-drawer1").click();
  };

  return (
    <>
      <div className={`md:flex justify-between`}>
        <div className="space-x-2 flex items-center justify-center mb-5">
          <label className="text-black font-bold dark:text-white">
            Pilih Tanggal:
          </label>
          <Input
            type="date"
            name="tanggal"
            id="tanggal"
            placeholder="Masukan tanggal jurnal"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required={true}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="w-16 px-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Siswa
              </th>
              <th scope="col" className="px-6 py-3">
                Perusahaan
              </th>
              <th scope="col" className="px-6 py-3">
                Instruktur
              </th>
              <th scope="col" className="w-32 px-3">
                Jurnal Harian
              </th>
              <th scope="col" className="w-32 px-3">
                Catatan Instruktur
              </th>
              <th scope="col" className="w-32 px-3">
                Catatan Anda
              </th>
              <th scope="col" className="w-16 px-3">
                Berikan Catatan
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length != 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="w-16 px-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 truncate text-left">
                    {item.kelompok_bimbingan?.siswa?.nama}
                  </td>
                  <td className="px-6 py-4 truncate text-left">
                    {item.kelompok_bimbingan?.perusahaan?.nama_perusahaan}
                  </td>
                  <td className="px-6 py-4 truncate text-left">
                    {item.kelompok_bimbingan?.instruktur?.nama}
                  </td>
                  <td className="w-32 px-3">
                    <div className="flex items-center justify-center">
                      <Button
                        outline={true}
                        onClick={() => initStaticModal(item)}
                      >
                        <i className="fa-solid fa-eye mr-2"></i>Lihat
                      </Button>
                    </div>
                  </td>
                  <td className="w-32 px-3">
                    <div className="flex items-center justify-center">
                      {item.catatan_instruktur ? (
                        <Button
                          outline={true}
                          onClick={() => initStaticModal1(item)}
                        >
                          <i className="fa-solid fa-eye mr-2"></i>Lihat
                        </Button>
                      ) : (
                        "Tidak ada catatan"
                      )}
                    </div>
                  </td>
                  <td className="w-32 px-3">
                    <div className="flex items-center justify-center">
                      {item.catatan_pembimbing ? (
                        <Button
                          outline={true}
                          onClick={() => initStaticModal1(item)}
                        >
                          <i className="fa-solid fa-eye mr-2"></i>Lihat
                        </Button>
                      ) : (
                        "Tidak ada catatan"
                      )}
                    </div>
                  </td>
                  <td className="w-16 px-3">
                    <div className="flex items-center justify-center">
                      <Button onClick={() => updateDrawer(item)}>
                        <i className="fa-solid fa-comment-medical"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>
                  <NotFound />
                  <h3 className="text-xl text-black font-bold mb-5 dark:text-white">
                    Opps! Belum ada data apapun!
                  </h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

SupervisorDailyMonitoringTableView.propTypes = {
  data: PropTypes.any,
  setSelected: PropTypes.any,
  id: PropTypes.string,
  tanggal: PropTypes.any,
  setTanggal: PropTypes.any,
};
