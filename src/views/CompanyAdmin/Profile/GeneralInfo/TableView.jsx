import NotFound from "../../../../components/Elements/EmptyState/NotFound";
import PropTypes from "prop-types";

export default function CompanyProfileTableView(props) {
  const { profile } = props;

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            {profile != null ? (
              <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
                  >
                    Nama Perusahaan
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {profile.dataPengguna?.nama_perusahaan}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
                  >
                    Pimpinan
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {profile.dataPengguna?.pimpinan}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
                  >
                    Alamat
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {profile.dataPengguna?.alamat}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
                  >
                    No. HP
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {profile.dataPengguna?.no_hp}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
                  >
                    Email Perusahaan
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {profile.dataPengguna?.email}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
                  >
                    Web Perusahaan
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {profile.dataPengguna?.website}
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td colSpan={8}>
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

CompanyProfileTableView.propTypes = {
  profile: PropTypes.any,
};
