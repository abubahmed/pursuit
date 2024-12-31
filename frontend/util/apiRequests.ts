import useApi from "./apiClient";

export const fetchUser = async ({ apiClient }: { apiClient: ReturnType<typeof useApi> }) => {
  if (!apiClient) return {};
  try {
    const response = await apiClient.get("user/");
    const userDetails = response?.data;
    return userDetails;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const fetchProfile = async ({ apiClient }: { apiClient: ReturnType<typeof useApi> }) => {
  if (!apiClient) return { profileDetails: {}, message: "Invalid data" };
  try {
    const response = await apiClient.get("users/profile/");
    const profileDetails = response?.data?.data?.profile;
    const message = response?.data?.message;
    return { profileDetails, message };
  } catch (error) {
    console.error(error);
    return { profileDetails: {}, message: error };
  }
};

export const fetchSeasons = async ({ apiClient }: { apiClient: ReturnType<typeof useApi> }) => {
  if (!apiClient) return { seasons: [], message: "Invalid data" };
  try {
    const response = await apiClient.get("seasons/");
    const seasons = response?.data?.data?.seasons;
    const message = response?.data?.message;
    return { seasons, message };
  } catch (error) {
    console.error(error);
    return { seasons: [], message: error };
  }
};

export const createSeason = async ({
  apiClient,
  seasonName,
  seasonDescription,
}: {
  apiClient: ReturnType<typeof useApi>;
  seasonName: string | null;
  seasonDescription: string | null;
}) => {
  if (!seasonName || !apiClient)
    return { season: null, message: "Invalid data" };
  try {
    const response = await apiClient.post("seasons/add/", {
      name: seasonName,
      description: seasonDescription,
    });
    const message = response?.data?.message;
    const season = response?.data?.data?.season;
    return { season, message };
  } catch (error) {
    console.error(error);
    return { season: null, message: error };
  }
};

export const deleteJob = async ({
  apiClient,
  jobId,
}: {
  apiClient: ReturnType<typeof useApi>;
  jobId: number | null;
}) => {
  if (!jobId || !apiClient) return { message: "Invalid data" };
  try {
    const response = await apiClient.post("jobs/delete/", { job_id: jobId } as any);
    const message = response?.data?.message;
    return { message };
  } catch (error) {
    console.error(error);
    return { message: error };
  }
};

export const fetchJobs = async ({
  apiClient,
  seasonId,
}: {
  apiClient: ReturnType<typeof useApi>;
  seasonId: number | null;
}) => {
  if (!seasonId || !apiClient) return { jobs: [], message: "Invalid data" };
  try {
    const response = await apiClient.post("jobs/", { season_id: seasonId });
    const jobs = response?.data?.data?.jobs;
    if (jobs) {
      jobs.forEach((job: any) => {
        job.created_at = new Date(job.created_at as string).toLocaleDateString();
        job.skills = job.skills.join(", ");
      });
    }
    const message = response?.data?.message;
    return { jobs, message };
  } catch (error) {
    console.error(error);
    return { jobs: [], message: error };
  }
};

export const fetchJobsExport = async ({
  apiClient,
  seasonId,
}: {
  apiClient: ReturnType<typeof useApi>;
  seasonId: number | null;
}) => {
  if (!seasonId || !apiClient) return { message: "Invalid data", jobs: null };
  try {
    const response = await apiClient.post("jobs/export/", { season_id: seasonId });
    const message = response?.data?.message;
    const jobs = response?.data?.data;
    return { message, jobs };
  } catch (error) {
    console.error(error);
    return { message: error, jobs: null };
  }
};

export const addJobUrl = async ({
  apiClient,
  seasonId,
  jobUrl,
}: {
  apiClient: ReturnType<typeof useApi>;
  seasonId: number | null;
  jobUrl: string;
}) => {
  if (!seasonId || !jobUrl || !apiClient) return { message: "Invalid data", job: null };
  try {
    const response = await apiClient.post("jobs/add/", { season_id: seasonId, url: jobUrl });
    const message = response?.data?.message;
    const job = response?.data?.data;
    return { message, job };
  } catch (error) {
    console.error(error);
    return { message: error, job: null };
  }
};

export const addJobText = async ({
  apiClient,
  seasonId,
  jobText,
}: {
  apiClient: ReturnType<typeof useApi>;
  seasonId: number | null;
  jobText: string;
}) => {
  if (!seasonId || !jobText || !apiClient) return { message: "Invalid data", job: null };
  try {
    const response = await apiClient.post("jobs/add/text/", { season_id: seasonId, text: jobText });
    const message = response?.data?.message;
    const job = response?.data?.data;
    return { message, job };
  } catch (error) {
    console.error(error);
    return { message: error, job: null };
  }
};

export const editJob = async ({
  apiClient,
  jobId,
  status,
  starred,
  hidden,
}: {
  apiClient: ReturnType<typeof useApi>;
  jobId: number | null;
  status: string | null;
  starred: string | null;
  hidden: string | null;
}) => {
  if (!apiClient || !jobId || (!starred && !status && !hidden)) return { message: "Invalid data" };
  try {
    const params: any = { status, starred, hidden, job_id: jobId };
    const response = await apiClient.post(`jobs/update/`, params);
    const message = response?.data?.message;
    return { message };
  } catch (error) {
    console.error(error);
    return { message: error };
  }
};
