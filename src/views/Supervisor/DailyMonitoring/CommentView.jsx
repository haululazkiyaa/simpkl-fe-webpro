import { useEffect, useState } from "react";

import Modal from "../../../components/Elements/Modal/index.jsx";
import NotFound from "../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";

export default function SupervisorDailyMonitoringCommentView(props) {
  const { data, selected, id } = props;

  const [detail, setDetail] = useState({});

  useEffect(() => {
    setDetail(data?.find(({ id }) => id === selected?.id));
  }, [data, selected]);

  return (
    <Modal title="Catatan dari Pembimbing dan Instruktur" id={id}>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            {detail != null ? (
              <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Catatan Anda
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {detail.catatan_pembimbing || "Tidak ada catatan"}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white text-left"
                  >
                    Catatan Instruktur
                  </th>
                  <td className="px-6 py-4 text-left">
                    : {detail.catatan_instruktur || "Tidak ada catatan"}
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
    </Modal>
  );
}

SupervisorDailyMonitoringCommentView.propTypes = {
  data: PropTypes.any,
  selected: PropTypes.any,
  id: PropTypes.string,
};
