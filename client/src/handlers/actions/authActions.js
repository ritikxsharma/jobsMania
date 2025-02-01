import { toast } from "react-toastify";
import authApi from "../../api/authApi";
import { redirect } from "react-router-dom";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await authApi.login(data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {    
    console.log(error);
    
    toast.error(error?.response?.data?.message || "Internal Server Error");
    return error;
  }
};

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    if (data?.formType === "email verification") {
      await authApi.preRegister(data);
      toast.success("Email sent. Please check mail and click to verify.");
      return redirect("/");
    } else {
      await authApi.register(data);
      toast.success("Registeration successful");
      return redirect("/login");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Internal Server Error");
  }
};
