import useApi from "./apiClient";

export const fetchUser = async ({ apiClient }: { apiClient: ReturnType<typeof useApi> }) => {
  if (!apiClient) return {};
  try {
    const response = await apiClient.get("user/");
    const userDetails = response?.data;
    return userDetails;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const fetchProfile = async ({ apiClient }: { apiClient: ReturnType<typeof useApi> }) => {
  if (!apiClient) return { message: "Invalid arguments provided; request rejected" };
  try {
    const response = await apiClient.get("users/profile/");
    const message = response?.data?.message;
    if (response.data?.success === false) {
      return { message };
    }
    const profileDetails = response.data?.data?.profile;
    return { profileDetails, message };
  } catch (error) {
    console.error(error);
    return {
      message: "Fetching profile details failed with error(s) " + error,
    };
  }
};

export const fetchSeasons = async ({ apiClient }: { apiClient: ReturnType<typeof useApi> }) => {
  if (!apiClient) return { message: "Invalid arguments provided; request rejected" };
  try {
    const response = await apiClient.get("seasons/");
    const message = response.data?.message;
    if (response.data?.success === false) {
      return { message };
    }
    const seasons = response.data?.data?.seasons;
    return { seasons, message };
  } catch (error) {
    console.error(error);
    return { message: "Failed to fetch seasons with error(s) " + error };
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
  const seasonNameCharLimit = 50;
  const seasonDescriptionCharLimit = 500;
  if (
    !seasonName ||
    seasonName.length > seasonNameCharLimit ||
    (seasonDescription && seasonDescription.length > seasonDescriptionCharLimit) ||
    !apiClient
  )
    return { message: "Invalid arguments provided; request rejected" };
  try {
    const response = await apiClient.post("seasons/add/", {
      name: seasonName,
      description: seasonDescription || "",
    });
    const message = response.data?.message;
    if (response.data?.success === false) {
      return { message };
    }
    const season = response.data?.data?.season;
    return { season, message };
  } catch (error) {
    console.error(error);
    return { message: "Failed to create season with error(s) " + error };
  }
};

export const deleteJob = async ({
  apiClient,
  jobId,
}: {
  apiClient: ReturnType<typeof useApi>;
  jobId: number | null;
}) => {
  if (!jobId || !apiClient) return { message: "Invalid arguments provided; request rejected" };
  try {
    const response = await apiClient.post("jobs/delete/", { job_id: jobId } as any);
    const message = response.data?.message;
    if (response?.data?.success === false) {
      return { message };
    }
    const job = response.data?.data;
    return { job, message };
  } catch (error) {
    console.error(error);
    return { message: "Failed to delete job with error(s) " + error };
  }
};

export const fetchJobs = async ({
  apiClient,
  seasonId,
}: {
  apiClient: ReturnType<typeof useApi>;
  seasonId: number | null;
}) => {
  return { message: "hello" };
  if (!seasonId || !apiClient) return { message: "Invalid arguments provided; request rejected" };
  try {
    const response = await apiClient.post("jobs/", { season_id: seasonId });
    const message = response.data?.message;
    if (response.data?.success === false) {
      return { message };
    }
    const jobs = response.data?.data?.jobs;
    jobs.forEach((job: any) => {
      job.created_at = new Date(job.created_at as string).toLocaleDateString();
      job.skills = job.skills.join(", ");
    });
    return { jobs, message };
  } catch (error) {
    console.error(error);
    return { message: "Failed to fetch jobs with error(s) " + error };
  }
};

export const fetchJobsExport = async ({
  apiClient,
  seasonId,
}: {
  apiClient: ReturnType<typeof useApi>;
  seasonId: number | null;
}) => {
  if (!seasonId || !apiClient) return { message: "Invalid arguments provided; request rejected" };
  try {
    const response = await apiClient.post("jobs/export/", { season_id: seasonId });
    const message = response.data?.message;
    if (response.data?.success === false) {
      return { message };
    }
    const jobs = response.data?.data;
    return { message, jobs };
  } catch (error) {
    console.error(error);
    return { message: "Failed to fetch jobs for export with error(s) " + error };
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
  const urlCharLimit = 1000;
  if (!seasonId || !jobUrl || !apiClient || jobUrl.length > urlCharLimit)
    return { message: "Invalid arguments provided; request rejected" };
  try {
    const response = await apiClient.post("jobs/add/", { season_id: seasonId, url: jobUrl });
    const message = response.data?.message;
    if (response.data?.success === false) {
      return { message };
    }
    const job = response.data?.data;
    return { message, job };
  } catch (error) {
    console.error(error);
    return { message: "Failed to add job by URL with error(s) " + error };
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
  const textCharLimit = 10000;
  if (!seasonId || !jobText || !apiClient || jobText.length > textCharLimit)
    return { message: "Invalid arguments provided; request rejected" };
  try {
    const response = await apiClient.post("jobs/add/text/", { season_id: seasonId, text: jobText });
    const message = response.data?.message;
    if (response.data?.success === false) {
      return { message };
    }
    const job = response.data?.data;
    return { message, job };
  } catch (error) {
    console.error(error);
    return { message: "Failed to add job by text with error(s) " + error };
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
  if (!apiClient || !jobId || (!starred && !status && !hidden))
    return { message: "Invalid arguments provided; request rejected" };
  try {
    const params: any = { status, starred, hidden, job_id: jobId };
    const response = await apiClient.post(`jobs/update/`, params);
    const message = response.data?.message;
    if (response.data?.success === false) {
      return { message };
    }
    const job = response.data?.data;
    return { job, message };
  } catch (error) {
    console.error(error);
    return { message: "Failed to edit job with error(s) " + error };
  }
};
