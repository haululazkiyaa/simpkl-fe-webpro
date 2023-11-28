import YearSettingsDrawerView from "../../../views/SchoolAdmin/Settings/YearSettings/YearSettingsDrawer";
import YearSettingsTableView from "../../../views/SchoolAdmin/Settings/YearSettings/YearSettingsTable";

export default function SchoolAdminSettingsPage() {
  return (
    <>
      <div className="format max-w-none mb-5">
        <h1>Pengaturan</h1>
        <div className="flex-none flex-row lg:flex">
          <div className="basis-2/6 lg:mr-5">
            <h2>Tahun Ajaran</h2>
            <p>
              Anda dapat mengubah tahun ajaran berjalan melalui pengaturan ini.
              Data pada aplikasi akan ditampilkan sesuai tahun yang anda pilih.
            </p>
            <div className="not-format">
              <YearSettingsDrawerView />
            </div>
          </div>
          <div className="basis-4/6">
            <div className="not-format">
              <YearSettingsTableView />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
