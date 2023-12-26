import { useEffect, useState } from "react";

import Button from "../../../../components/Elements/Button/index.jsx";
import NotFound from "../../../../components/Elements/EmptyState/NotFound.jsx";
import PropTypes from "prop-types";

export default function AssesmentAspectTableView(props) {
  const { aspekPenilaian, setSelected } = props;

  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    let category = [];
    let list = [];

    for (let item of aspekPenilaian) {
      if (!category.includes(item.kelompok_penilaian)) {
        category.push(item.kelompok_penilaian);
      }
    }

    for (let item of category) {
      let child_list = [];
      for (let data of aspekPenilaian) {
        if (item === data.kelompok_penilaian) {
          child_list.push(data);
        }
      }
      list.push({
        kategori: item,
        data: child_list,
      });
    }
    setGroupData(list);
  }, [aspekPenilaian]);

  const updateDrawer = (item) => {
    setSelected(item);
    document.getElementById("update-drawer3").click();
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="w-16 px-3">
                No
              </th>
              <th scope="col" className="px-3 py-3">
                Aspek Penilaian
              </th>
              <th scope="col" className="px-3 py-3">
                Sub Aspek Penialaian
              </th>
              <th scope="col" className="w-16 px-3">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {groupData.length != 0 ? (
              groupData.map((item, index) => (
                <>
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="w-16 px-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      rowSpan={item.data?.length}
                    >
                      {index + 1}
                    </th>
                    <td className="px-3 py-4" rowSpan={item.data?.length}>
                      <div className="flex items-center justify-start text-left">
                        {item.kategori}
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center justify-start text-left">
                        {item.data[0]?.judul}
                      </div>
                    </td>
                    <td className="w-16 px-3">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="yellow"
                          onClick={() => updateDrawer(item.data[0])}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {item.data?.slice(1).map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-3 py-4">
                        <div className="flex items-center justify-start text-left">
                          {item.judul}
                        </div>
                      </td>
                      <td className="w-16 px-3">
                        <div className="flex items-center justify-center">
                          <Button
                            variant="yellow"
                            onClick={() => updateDrawer(item)}
                          >
                            <i className="fa-solid fa-pen"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ))
            ) : (
              <tr>
                <td colSpan={4}>
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

AssesmentAspectTableView.propTypes = {
  aspekPenilaian: PropTypes.any,
  setSelected: PropTypes.any,
};
