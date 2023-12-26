import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";
import SelectInput from "../../../components/Elements/SelectInput/index.jsx";

export default function StudentPresenceTableView(props) {
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
                Tanggal
              </th>
              <th scope="col" className="w-16 px-3">
                Hadir
              </th>
              <th scope="col" className="w-16 px-3">
                Izin
              </th>
              <th scope="col" className="w-16 px-3">
                Sakit
              </th>
              <th scope="col" className="w-16 px-3">
                Alpa
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length != 0 ? (
              data.data_kehadiran?.map((item, index) => (
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
                  <td className="px-6 py-4 truncate">
                    {new Date(item.tanggal).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="w-16 px-3">
                    <div className="flex">
                      <div className="flex items-center">
                        <input
                          id="hadir"
                          type="radio"
                          value="HADIR"
                          name={"kehadiran" + index}
                          checked={item.status === "HADIR"}
                          disabled={true}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="hadir"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Hadir
                        </label>
                      </div>
                    </div>
                  </td>
                  <td className="w-16 px-3">
                    <div className="flex">
                      <div className="flex items-center">
                        <input
                          id="izin"
                          type="radio"
                          value="IZIN"
                          name={"kehadiran" + index}
                          checked={item.status === "IZIN"}
                          disabled={true}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="izin"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Izin
                        </label>
                      </div>
                    </div>
                  </td>
                  <td className="w-16 px-3">
                    <div className="flex">
                      <div className="flex items-center">
                        <input
                          id="sakit"
                          type="radio"
                          value="SAKIT"
                          name={"kehadiran" + index}
                          checked={item.status === "SAKIT"}
                          disabled={true}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="sakit"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Sakit
                        </label>
                      </div>
                    </div>
                  </td>
                  <td className="w-16 px-3">
                    <div className="flex">
                      <div className="flex items-center">
                        <input
                          id="alpa"
                          type="radio"
                          value="ALPA"
                          name={"kehadiran" + index}
                          checked={item.status === "ALPA"}
                          disabled={true}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="alpa"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Alpa
                        </label>
                      </div>
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

StudentPresenceTableView.propTypes = {
  data: PropTypes.any,
  setSelected: PropTypes.any,
  setData: PropTypes.any,
  handlePresensi: PropTypes.func,
  setBulan: PropTypes.any,
  bulan: PropTypes.any,
  setTahun: PropTypes.any,
  tahun: PropTypes.any,
};
