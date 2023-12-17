import Button from "../../../components/Elements/Button/index.jsx";
import PropTypes from "prop-types";

export default function SupervisorDailyMonitoringTableView(props) {
  const { data, setSelected } = props;

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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
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
              <th scope="col" className="px-6 py-3">
                Journal Harian
              </th>
              <th scope="col" className="px-6 py-3">
                Catatan Instruktur
              </th>
              <th scope="col" className="px-6 py-3">
                Catatan Anda
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
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
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                  <td className="px-3 py-2">
                    <Button
                      outline={true}
                      onClick={() => initStaticModal(item)}
                    >
                      Tampilkan
                    </Button>
                  </td>
                  <td className="px-6 py-4">
                    {item.catatan_instruktur ? (
                      <Button
                        outline={true}
                        onClick={() => initStaticModal1(item)}
                      >
                        Tampilkan
                      </Button>
                    ) : (
                      "Tidak ada catatan"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.catatan_pembimbing ? (
                      <Button
                        outline={true}
                        onClick={() => initStaticModal1(item)}
                      >
                        Tampilkan
                      </Button>
                    ) : (
                      "Tidak ada catatan"
                    )}
                  </td>
                  <td className="flex items-center justify-center px-3 py-2">
                    <Button onClick={() => updateDrawer(item)}>
                      {item.catatan_pembimbing
                        ? "Edit Catatan"
                        : "Berikan Catatan"}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="px-6 py-4">
                <td colSpan={5}>Tidak ada data</td>
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
};
