import { toast } from "react-toastify";
import userApi from "../../api/userApi";
import { redirect } from "react-router-dom";

export const updateProfileAction = (queryClient) => async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const imageFile = data.avatar;

    delete data['avatar']    

    if (imageFile.size !== 0) {
      if (imageFile.size > 1000 * 1024) {
        toast.error("Image file too large...");
        return null;
      }
      const res = await userApi.getUploadURL(imageFile.type);            
      data.avatarPublicId = res.data.Key
      
      await fetch(res.data.uploadURL, {
        method: "PUT",
        body: imageFile,
        headers: { "Content-Type": imageFile.type },
      });      
    }
    
    await userApi.updateProfile(data)    
    queryClient.invalidateQueries(['user'])
    toast.success('Profile Updated successfully.')
    redirect('/dashboard')
    
  } catch (error) {
    toast.error(error?.response?.data?.message || "Internal Server Error");
    return null;
  }
};
