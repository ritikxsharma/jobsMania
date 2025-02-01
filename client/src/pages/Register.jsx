import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Loader } from "../components";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EmailVerificationForm from "../components/EmailVerificationForm";
import RegisterationForm from "../components/RegisterationForm";

const Register = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [isVerified, setIsVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const res = await axios.post(`/api/auth/validate-email`, { token });
        console.log(res);
        if (res.status === 200) {
          toast.success("Email verified! Complete your registeration");
          setIsVerified(true);
          setVerifiedEmail(res.data.email)
          
        } else {
          toast.error("Verification failed. Try again");
        }
      } catch (error) {
        toast.error(`Catch: ${error?.response?.data?.message}`);
      } finally {
        setLoading(false);
        window.history.replaceState(null, "", window.location.pathname);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!isVerified ? (
            <EmailVerificationForm/>
          ) : (
            <RegisterationForm verifiedEmail={verifiedEmail} />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Register;
