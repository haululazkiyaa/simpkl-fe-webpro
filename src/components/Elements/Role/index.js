export function identifyRole(role) {
  if (role == "ADMINSEKOLAH") {
    return "Admin Sekolah";
  }
  if (role == "PEMBIMBING") {
    return "Pembimbing";
  }
  if (role == "SISWA") {
    return "Siswa";
  }
  if (role == "INSTRUKTUR") {
    return "Instruktur";
  }
  if (role == "PERUSAHAAN") {
    return "Admin Perusahaan";
  }
  if (role == "ORTU") {
    return "Orang Tua";
  }
  return null;
}
