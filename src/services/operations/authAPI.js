import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import {
  setUser,
  getUserFromLocalStorage,
} from "../../redux/slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  UPDATE_PROFILE_API,
} = endpoints;




//Send OTP
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("SEND OTP API RESPONSE", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SEND OTP API ERROR", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


//Signup
export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      console.log("SIGNUP API RESPONSE", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

//Login
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(
        `Welcome to Alles Health, ${response.data.user?.firstName}`
      );
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user?.firstName} ${response.data.user.lastName}`;

      dispatch(
        setUser({
          ...response.data.user,
          image: userImage,
        })
      );
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...response.data.user,
          image: userImage,
        })
      );
      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


//Update Profile
export function updateUserProfile(editedUser) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_PROFILE_API,
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      console.log("UPDATE PROFILE API RESPONSE", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Profile Updated Successfully");

      const existingUser = getUserFromLocalStorage();
      const updatedUser = {
        ...existingUser,
        additionalDetails: response.data.profile,
      };

      dispatch(setUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("UPDATE PROFILE API ERROR", error);
      toast.error("Profile Update Failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}


//Logout
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.clear();
    navigate("/login");
  };
}
