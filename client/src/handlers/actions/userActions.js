import { toast } from "react-toastify";
import userApi from "../../api/userApi";

export const updateProdileAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("avatar");
    if (imageFile && imageFile > 50000) {
      toast.error("Image file too large...");
      return null;
    }
    await userApi.updateProfile(formData);
    toast.success("Profile updated successfully.");
    return null;
  } catch (error) {
    console.log(error);
    
    toast.error(error?.response?.data?.message || "Internal Server Error");
    return null;
  }
};
