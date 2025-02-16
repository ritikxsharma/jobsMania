import React, { lazy, Suspense, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Loader } from "../components";
import { useState } from "react";
import { toast } from "react-toastify";
import EmailVerificationForm from "../components/EmailVerificationForm";
const RegisterationForm = lazy(() => {
  import("../components/RegisterationForm");
});
import authApi from "../api/authApi";

const Register = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [isVerified, setIsVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyEmail = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);

      const res = await authApi.validateEmail(token);

      if (res.status === 200) {
        toast.success("Email verified! Complete your registeration");
        setIsVerified(true);
        setVerifiedEmail(res.data.email);
      } else {
        toast.error("Verification failed. Try again");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoading(false);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [token]);

  useEffect(() => {
    verifyEmail();
  }, [token]);

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!isVerified ? (
            <EmailVerificationForm />
          ) : (
            <Suspense fallback={<Loader />}>
              <RegisterationForm verifiedEmail={verifiedEmail} />
            </Suspense>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Register;
