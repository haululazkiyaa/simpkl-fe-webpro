import { useEffect, useState } from "react";

import Modal from "../../../components/Elements/Modal/index.jsx";
import PropTypes from "prop-types";

export default function InstructorDailyMonitoringCommentView(props) {
  const { data, selected, id } = props;

  const [detail, setDetail] = useState({});

  useEffect(() => {
    setDetail(data?.find(({ id }) => id === selected?.id));
  }, [data, selected]);

  return (
    <Modal title="Catatan Pembimbing / Instruktur" id={id}>
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
                    Catatan Pembimbing
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
              <tr className="px-6 py-4 text-left">
                <td colSpan={3}>Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}

InstructorDailyMonitoringCommentView.propTypes = {
  data: PropTypes.any,
  selected: PropTypes.any,
  id: PropTypes.string,
};
