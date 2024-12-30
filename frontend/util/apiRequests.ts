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
  seasonName: string;
  seasonDescription: string;
}) => {
  if (!seasonName || !seasonDescription || !apiClient)
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

export const fetchJobs = async ({
  apiClient,
  seasonId,
}: {
  apiClient: ReturnType<typeof useApi>;
  seasonId: number;
}) => {
  if (!seasonId || !apiClient) return { jobs: [], message: "Invalid data" };
  try {
    const response = await apiClient.post("jobs/", { season_id: seasonId });
    const jobs = response?.data?.data?.jobs;
    if (jobs) {
      jobs.forEach((job: any) => {
        job.created_at = new Date(job.created_at as string).toLocaleDateString();
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
  seasonId: number | null
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
