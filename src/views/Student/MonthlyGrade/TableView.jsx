import Button from "../../../components/Elements/Button/index.jsx";
import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";

export default function StudentMonthlyGradeTableView(props) {
  const { data, setSelected } = props;

  const initStaticModal = (item) => {
    setSelected(item);
    document.getElementById("init-static-modal").click();
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
                NIS / NISN
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
                Penialain Bulanan
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
                    {item.kelompok_bimbingan?.siswa?.nis} /{" "}
                    {item.kelompok_bimbingan?.siswa?.nisn}
                  </td>
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
                  <td className="flex items-center justify-center px-3 py-2">
                    <Button onClick={() => updateDrawer(item)}>
                      {item.catatan_pembimbing
                        ? "Edit Penilaian"
                        : "Berikan Penilaian"}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  <NotFound />
                  <h3 className="text-xl text-black font-bold mb-5">
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

StudentMonthlyGradeTableView.propTypes = {
  data: PropTypes.any,
  setSelected: PropTypes.any,
  id: PropTypes.string,
};
