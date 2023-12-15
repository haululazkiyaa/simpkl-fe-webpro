export const NavList = [
  {
    label: "Dashboard",
    href: "/",
    icon: "fa-house",
  },
  {
    group: "Admin Sekolah",
    child: [
      {
        label: "Pengaturan",
        href: "/school-admin/settings",
        icon: "fa-gear",
      },
      {
        label: "Kelola Jurusan",
        href: "/school-admin/major-management",
        icon: "fa-list-ul",
      },
      {
        label: "Data Pembimbing",
        href: "/school-admin/supervisor-data",
        icon: "fa-user-tie",
      },
      {
        label: "Data Siswa",
        href: "/school-admin/student-data",
        icon: "fa-user",
      },
      {
        label: "Kelompok Bimbingan",
        href: "/school-admin/guidance-group",
        icon: "fa-users",
      },
    ],
  },
  {
    group: "Admin Perusahaan",
    child: [
      {
        label: "Profil Perusahaan",
        href: "/company-admin/profile",
        icon: "fa-building",
      },
      {
        label: "Data Instruktur",
        href: "/company-admin/instructor-data",
        icon: "fa-building-user",
      },
      {
        label: "Kelompok Bimbingan",
        href: "/company-admin/guidance-group",
        icon: "fa-users",
      },
    ],
  },
  {
    group: "Instruktur",
    child: [
      {
        label: "Monitoring Harian",
        href: "/instructor/profile",
        icon: "fa-calendar-days",
      },
      {
        label: "Monitoring Bulanan",
        href: "/instructor/profile",
        icon: "fa-calendar-check",
      },
      {
        label: "Penilaian Bulanan",
        href: "/instructor/profile",
        icon: "fa-chart-simple",
      },
    ],
  },
  {
    group: "Guru Pembimbing",
    child: [
      {
        label: "Monitoring Harian",
        href: "/profile",
        icon: "fa-calendar-days",
      },
      {
        label: "Monitoring Bulanan",
        href: "/profile",
        icon: "fa-calendar-check",
      },
      {
        label: "Rekap Penilaian Instruktur",
        href: "/profile",
        icon: "fa-chart-simple",
      },
      {
        label: "Penilaian Akhir",
        href: "/profile",
        icon: "fa-book",
      },
    ],
  },
  {
    group: "Siswa",
    child: [
      {
        label: "Jurnal Harian",
        href: "/profile",
        icon: "fa-calendar-days",
      },
      {
        label: "Jurnal Bulanan",
        href: "/profile",
        icon: "fa-calendar-check",
      },
      {
        label: "Penilaian Instruktur",
        href: "/profile",
        icon: "fa-chart-simple",
      },
      {
        label: "Nilai Akhir",
        href: "/profile",
        icon: "fa-book",
      },
    ],
  },
];
