import { useEffect, useState } from "react";

import Modal from "../../../components/Elements/Modal/index.jsx";
import PropTypes from "prop-types";

export default function StudentDailyJournalDetailView(props) {
  const { data, selected } = props;

  const [detail, setDetail] = useState({});

  useEffect(() => {
    setDetail(selected?.foto);
  }, [data, selected]);

  return (
    <Modal title="Foto Kegiatan">
      {detail != null ? (
        <>
          <img src={detail} alt="Foto Kegiatan" />
        </>
      ) : (
        <p className="text-center">Tidak ada data</p>
      )}
    </Modal>
  );
}

StudentDailyJournalDetailView.propTypes = {
  data: PropTypes.any,
  selected: PropTypes.any,
};
