import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";
import SelectInput from "../../../components/Elements/SelectInput/index.jsx";

export default function StudentMonthlyGradeTableView(props) {
  const { data, bulan, setBulan, tahun, setTahun } = props;

  const opsiBulan = [
    { value: "1", label: "Januari" },
    { value: "2", label: "Februari" },
    { value: "3", label: "Maret" },
    { value: "4", label: "April" },
    { value: "5", label: "Mei" },
    { value: "6", label: "Juni" },
    { value: "7", label: "Juli" },
    { value: "8", label: "Agustus" },
    { value: "9", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];

  const opsiTahun = [
    { value: new Date().getFullYear(), label: new Date().getFullYear() },
    {
      value: new Date().getFullYear() + 1,
      label: new Date().getFullYear() + 1,
    },
  ];

  return (
    <>
      {!(bulan === "" && tahun === "") && (
        <div className="flex justify-start items-center space-x-2 mb-5">
          <SelectInput
            options={opsiBulan}
            id="pilih_bulan"
            onChange={(e) => setBulan(e.value)}
            defaultValue={opsiBulan.find(({ value }) => value == bulan)}
          />
          <SelectInput
            options={opsiTahun}
            id="pilih_tahun"
            onChange={(e) => setTahun(e.value)}
            defaultValue={opsiTahun.find(({ value }) => value === tahun)}
          />
        </div>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="w-16 px-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Tujuan Pembelajaran
              </th>
              <th scope="col" className="px-6 py-3">
                Skor (1-100)
              </th>
              <th scope="col" className="px-6 py-3">
                Deskripsi Penilaian
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
                  <td className="px-6 py-4 text-left">
                    {item.tujuan_pembelajaran?.judul}
                  </td>
                  <td className="px-6 py-4 truncate">{item.nilai}</td>
                  <td className="px-6 py-4 text-left">{item.deskripsi}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
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

StudentMonthlyGradeTableView.propTypes = {
  data: PropTypes.any,
  setSelected: PropTypes.any,
  id: PropTypes.string,
  bulan: PropTypes.any,
  setBulan: PropTypes.any,
  tahun: PropTypes.any,
  setTahun: PropTypes.any,
};
