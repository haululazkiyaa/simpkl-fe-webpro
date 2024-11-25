import DashboardLayout from "../../components/Layouts/DashboardLayout";
import PropTypes from "prop-types";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="max-w-none mb-5">
        <div className="flex-none flex-row lg:flex">
          <div className="basis-4/6">
            <div className="not-format lg:mr-5">
              <div
                id="default-carousel"
                className="relative w-full "
                data-carousel="slide"
              >
                <div className="relative h-24 overflow-hidden rounded-lg md:h-40 mb-5 p-6 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <img
                      src={import.meta.env.VITE_SLIDER_CONTENT}
                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt="..."
                    />
                  </div>
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <img
                      src={import.meta.env.VITE_SLIDER_CONTENT}
                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt="..."
                    />
                  </div>
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <img
                      src={import.meta.env.VITE_SLIDER_CONTENT}
                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt="..."
                    />
                  </div>
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <img
                      src={import.meta.env.VITE_SLIDER_CONTENT}
                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt="..."
                    />
                  </div>
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <img
                      src={import.meta.env.VITE_SLIDER_CONTENT}
                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  data-carousel-prev
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                      className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                    <span className="sr-only">Previous</span>
                  </span>
                </button>
                <button
                  type="button"
                  className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  data-carousel-next
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                      className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="sr-only">Next</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="basis-2/6">
            <div className="rounded-lg p-3 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 border-t-4 border-t-blue-500">
              <h2 className="font-bold text-lg">Pemberitahuan</h2>
              {/* <p className="text-gray-500 dark:text-white border-b border-neutral-100 my-2 pb-2">
                <span className="text-black">28 Desember 2023</span> - Peserta
                magang harap segera melakukan konfirmasi kepada guru pembimbing
                terkait perusahaannya.
              </p>
              <p className="text-gray-500 dark:text-white border-b border-neutral-100 my-2 pb-2">
                <span className="text-black">23 Desember 2023</span> - Peserta
                magang harap segera melakukan konfirmasi kepada guru pembimbing
                terkait perusahaannya.
              </p> */}
              <p className="text-gray-500 dark:text-white my-2 pb-2">
                {import.meta.env.VITE_DASHOBARD_INFO
                  ? import.meta.env.VITE_DASHOBARD_INFO
                  : "Tidak ada pemberitahuan"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

DashboardPage.propTypes = {
  handleLogout: PropTypes.func,
};
