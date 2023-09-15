import { useEffect, useState } from "react";
import OTPIMAGE from "../assets/OTP.jpg";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
function Otp() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          <img src={OTPIMAGE} className="img-fluid" alt="Alles Health" />
          <h1 style={{ color: "#3BA5DC" }}>Enter OTP</h1>
          <p className="fw-ligh text-body-secondary">
            4 digit code has been sent to{" "}
            <span style={{ color: "#3BA5DC" }}>{signupData?.email}</span>
          </p>
          <form className="position-relative" onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              containerStyle={{ justifyContent: "space-evenly", gap: "0 6px" }}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "0.5rem",
                    border: "none",
                    backgroundColor: "#dce1e8",
                    color: "#3BA5DC",
                    textAlign: "center",
                    fontSize: "1rem",
                  }}
                />
              )}
            />
            <div className="text-center">
              <button
                className="my-3"
                style={{
                  color: "#3BA5DC",
                  border: "none",
                  background: "none",
                }}
                onClick={() => dispatch(sendOtp(signupData.email))}
              >
                Resend OTP
              </button>
            </div>
            <div className="my-4 flex justify-center space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Back
                </Link>
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Otp;
