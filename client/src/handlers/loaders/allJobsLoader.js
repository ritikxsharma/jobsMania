import jobApi from "../../api/jobApi";
import { toast } from "react-toastify";

export const allJobsQuery = (params) => {
  return {
    queryKey: ["jobs", params.search ?? "", params.page ?? 1],
    queryFn: async () => (await jobApi.getAllJobs(params)).data,
  };
};

export const allJobsLoader =
  (queryClient) =>
  async ({ request }) => {
    try {
      const params = Object.fromEntries(
        new URL(request.url).searchParams.entries()
      );
      await queryClient.ensureQueryData(allJobsQuery(params));

      return { searchValues: params};
    } catch (error) {
      toast.error("Error in fetching all jobs");
    }
  };
