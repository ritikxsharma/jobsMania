import { toast } from "react-toastify";
import jobApi from "../../api/jobApi";
import { redirect } from "react-router-dom";

export const createJobAction = (queryClient) => async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await jobApi.createJob(data);
    queryClient.invalidateQueries(['jobs'])
    queryClient.invalidateQueries(['stats'])
    toast.success("job created successfully.");
    
    return null;
  } catch (error) {    
    toast.error(error?.response?.data?.message || "Error occured in creating a job. Please try again.");
  }
};

export const editJobAction = (queryClient) => async ({ params, request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const { id } = params
    
    await jobApi.updateJob(id, data)
    queryClient.invalidateQueries(['jobs'])
    queryClient.invalidateQueries(['stats'])
    toast.success('job updated successfully!')
    return null
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Error in updating the job')
    return null
  }
};

export const deleteJobAction = (queryClient) => async({params}) => {
  try{
    window.confirm('Are you sure you want to delete the job?')
    const { id } = params
    await jobApi.deleteJob(id)
    toast.success('job deleted successfully')
    queryClient.invalidateQueries(['jobs'])
    queryClient.invalidateQueries(['stats'])
    return redirect('/dashboard')
  }catch(error){
    toast.error(error?.response?.data?.message || 'Error in deleting the job.')    
    return redirect('/dashboard')
  }
}
