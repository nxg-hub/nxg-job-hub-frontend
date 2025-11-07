import { API_HOST_URL } from "@/utils/api/API_HOST";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

export const usePostJob = (options = {}) => {
  const postJob = async (payload) => {
    const storeKey =
      localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
      sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

    if (!storeKey) throw new Error("No key stored");

    const authKey = JSON.parse(storeKey)?.authKey;
    const response = await axios.post(
      `${API_HOST_URL}/api/job-postings/employer-post-job`,
      payload,
      {
        headers: {
          authorization: authKey,
        },
      }
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: postJob,
    ...options,
  });

  return {
    mutate: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useFetchJobs = (employerID) => {
  const fetchJobs = async () => {
    const response = await axios.get(
      `${API_HOST_URL}/api/employers/postings/${employerID}`
    );
    return response.data;
  };

  return useQuery({
    queryKey: ["employerJobs", employerID],
    queryFn: fetchJobs,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!employerID,
  });
};

export const useFetchJobApplicants = ({ jobID }) => {
  const fetchJobApplicants = async () => {
    const response = await axios.get(
      `${API_HOST_URL}/api/employers/${jobID}/applicants/count`
    );
    return response.data;
  };

  return useQuery({
    queryKey: ["jobApplicants", jobID],
    queryFn: fetchJobApplicants,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!jobID,
  });
};

export const useJobsEngagements = (employerID) => {
  const fetchJobsEngagements = async () => {
    const response = await axios.get(
      `${API_HOST_URL}/api/employers/engagements/${employerID}`
    );
    return response.data;
  };

  return useQuery({
    queryKey: ["jobsEngagements", employerID],
    queryFn: fetchJobsEngagements,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!employerID,
  });
};

export const useEmployerJobsKpis = (employerID) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["totalJobsPost", employerID],
        queryFn: async () => {
          const response = await axios.get(
            `${API_HOST_URL}/api/employers/postings/${employerID}`
          );
          return response.data;
        },
      },
      {
        queryKey: ["jobsEngagements", employerID],
        queryFn: async () => {
          const response = await axios.get(
            `${API_HOST_URL}/api/employers/engagements/${employerID}`
          );
          return response.data;
        },
      },
    ],
  });

  //request states
  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const error = queries.find((q) => q.error)?.error || null;

  const jobs = queries[0]?.data || [];
  const engagements = queries[1]?.data || {};

  const acceptedJobs = jobs.filter(
    (job) => job.jobStatus?.toLowerCase() === "accepted"
  );
  const rejectedJobs = jobs.filter(
    (job) => job.jobStatus?.toLowerCase() === "rejected"
  );

  const totalJobsPost = jobs.length;
  const totalJobsAccepted = acceptedJobs.length;
  const totalJobsRejected = rejectedJobs.length;

  //return data
  const data = {
    totalJobsPost,
    totalJobsAccepted,
    totalJobsRejected,
    engagements,
  };

  return { isLoading, isError, error, data };
};

export const useDeletePostedJob = () => {
  const deleteJob = async (jobID) => {
    const response = await axios.delete(
      `${API_HOST_URL}/api/job-postings/delete/${jobID}`
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: (jobID) => deleteJob(jobID),
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

// export const useGetAllApplicants = (employerID, token) => {
//   const fetchAllApplicants = async () => {
//     const response = await axios.get(
//       `${API_HOST_URL}/api/employers/employers/${employerID}/get-all-applicants?page=0&size=1000&sort=string`,
//       {
//         headers: {
//           authorization: token,
//         },
//       }
//     );
//     return response.data;
//   };

//   return useQuery({
//     queryKey: ["allApplicants", employerID],
//     queryFn: fetchAllApplicants,
//     staleTime: 1000 * 60 * 5,
//     refetchOnWindowFocus: false,
//     enabled: !!employerID,
//   });
// };

export const useGetAllApplicants = (employerID, token) => {
  const fetchAllApplicants = async () => {
    try {
      const response = await axios.get(
        `${API_HOST_URL}/api/employers/employers/${employerID}/get-all-applicants?page=0&size=1000&sort=string`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return response.data;
    } catch (err) {
      // ✅ Extract backend message
      const message = err.response?.data;
      ("Something went wrong");

      // ✅ Throw custom error to React Query
      throw new Error(message);
    }
  };

  return useQuery({
    queryKey: ["allApplicants", employerID],
    queryFn: fetchAllApplicants,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!employerID,
  });
};

export const useGetAllInterviewCandidates = (employerID, token) => {
  const fetchInterviewCandidates = async () => {
    const response = await axios.get(
      `${API_HOST_URL}/api/interviews/employer/${employerID}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response.data;
  };

  return useQuery({
    queryKey: ["allInterviewCandidates", employerID],
    queryFn: fetchInterviewCandidates,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!employerID,
  });
};
