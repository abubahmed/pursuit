import useApi from "./apiClient";

export const fetchUser = async ({ apiClient }: { apiClient: ReturnType<typeof useApi> }) => {
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
  seasonId: string;
}) => {
  try {
    const response = await apiClient.post("jobs/", { season_id: seasonId });
    const jobs = response?.data?.data?.jobs;
    const message = response?.data?.message;
    return { jobs, message };
  } catch (error) {
    console.error(error);
    return { jobs: [], message: error };
  }
};

export const addJobUrl = async ({
  apiClient,
  seasonId,
  jobUrl,
}: {
  apiClient: ReturnType<typeof useApi>;
  seasonId: string;
  jobUrl: string;
}) => {
  try {
    const response = await apiClient.post("jobs/add/", { season_id: seasonId, url: jobUrl });
    const message = response?.data?.message;
    const job = response?.data?.data?.job;
    return { message, job };
  } catch (error) {
    console.error(error);
    return { message: error, job: null };
  }
};
