const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1";
console.log(process.env.REACT_APP_BASE_URL);

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
};
