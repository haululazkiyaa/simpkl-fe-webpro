import validator from "validator";

export function nameValidation(value) {
  if (value !== "") {
    if (!validator.isLength(value, { min: 0, max: 60 })) {
      return "Nama terlalu panjang!";
    }
    return "";
  }
  return "";
}

export function usernameValidation(value) {
  if (value !== "") {
    if (!validator.isLowercase(value)) {
      return "Username hanya boleh berisi huruf kecil dan angka";
    } else if (!validator.isLength(value, { min: 0, max: 12 })) {
      return "Username tidak boleh lebih dari 12 karakter!";
    }
    return "";
  }
  return "";
}

export function addressValidation(value) {
  if (value !== "") {
    if (!validator.isLength(value, { min: 0, max: 128 })) {
      return "Alamat terlalu panjang!";
    }
    return "";
  }
  return "";
}

export function phoneValidation(value) {
  if (value !== "") {
    if (!validator.isMobilePhone(value)) {
      return "Nomor HP tidak valid";
    }
    return "";
  }
  return "";
}

export function passwordValidation(value) {
  if (value !== "") {
    if (
      !validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return "Password harus terdiri dari 8-12 karakter dan mengandung setidaknya 1 huruf kecil, 1 huruf besar, 1 angka, dan 1 simbol!";
    } else if (!validator.isLength(value, { min: 0, max: 12 })) {
      return "Password tidak boleh lebih dari 12 karakter!";
    }
    return "";
  }
  return "";
}

export function emailValidation(value) {
  if (value !== "") {
    if (!validator.isEmail(value)) {
      return "Email tidak valid";
    }
    return "";
  }
  return "";
}
