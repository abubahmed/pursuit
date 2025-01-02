import useApi from "./apiClient";
import validator from "validator";
import { statusChoices } from "./pageContent";

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
  if (!apiClient) return { message: "Invalid arguments provided" };
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
  if (!apiClient) return { message: "Invalid arguments provided" };
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
  const seasonNameCharLimit = 25;
  const seasonDescriptionCharLimit = 500;
  if (!seasonName) {
    return { message: "No name provided", code: "ERR_INVALID_SEASON_NAME" };
  }
  if (seasonName.length > seasonNameCharLimit) {
    return {
      message: `Season name must not exceed ${seasonNameCharLimit} characters`,
      code: "ERR_SEASON_NAME_TOO_LONG",
    };
  }
  if (seasonDescription && seasonDescription.length > seasonDescriptionCharLimit) {
    return {
      message: `Season description must not exceed ${seasonDescriptionCharLimit} characters`,
      code: "ERR_SEASON_DESCRIPTION_TOO_LONG",
    };
  }
  if (!apiClient) {
    return { message: "API client is not available", code: "ERR_INVALID_API_CLIENT" };
  }
  try {
    const response = await apiClient.post("seasons/add/", {
      name: seasonName,
      description: seasonDescription || "",
    });
    const message = response.data?.message;
    if (response.data?.success === false) {
      return { message, code: "ERR_CREATE_SEASON" };
    }
    const season = response.data?.data?.season;
    return { season, message, code: "SUCCESS_CREATE_SEASON" };
  } catch (error) {
    console.error(error);
    return { message: "Failed to create season with error(s) " + error, code: "ERR_CREATE_SEASON" };
  }
};

export const deleteJob = async ({
  apiClient,
  jobId,
}: {
  apiClient: ReturnType<typeof useApi>;
  jobId: number | null;
}) => {
  if (!jobId || !apiClient) return { message: "Invalid arguments provided" };
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
  if (!seasonId || !apiClient) return { message: "Invalid arguments provided" };
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
  if (!seasonId || !apiClient) return { message: "Invalid arguments provided" };
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
  if (!seasonId)
    return {
      message: "Invalid season ID provided",
      code: "ERR_INVALID_SEASON_ID",
    };
  if (!jobUrl)
    return {
      message: "No URL provided",
      code: "ERR_INVALID_JOB_URL",
    };
  if (!apiClient)
    return {
      message: "API client is not available",
      code: "ERR_INVALID_API_CLIENT",
    };
  if (!validator.isURL(jobUrl)) {
    return {
      message: "URL provided is not a valid URL",
      code: "ERR_INVALID_URL",
    };
  }
  if (jobUrl.length > urlCharLimit)
    return {
      message: `URL must not exceed ${urlCharLimit} characters`,
      code: "ERR_URL_TOO_LONG",
    };
  try {
    const response = await apiClient.post("jobs/add/", { season_id: seasonId, url: jobUrl });
    const message = response.data?.message;
    if (response.data?.success === false) {
      return { message, code: "ERR_ADD_JOB_URL" };
    }
    const job = response.data?.data;
    return { message, job, code: "SUCCESS_ADD_JOB_URL" };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to add job by URL with error(s) " + error,
      code: "ERR_ADD_JOB_URL",
    };
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
  const textMinCharLimit = 50;
  if (!seasonId) {
    return {
      message: "Invalid season ID provided",
      code: "ERR_INVALID_SEASON_ID",
    };
  }
  if (!jobText) {
    return {
      message: "No text provided",
      code: "ERR_NO_JOB_TEXT",
    };
  }
  if (!apiClient) {
    return {
      message: "API client is not available",
      code: "ERR_INVALID_API_CLIENT",
    };
  }
  if (jobText.length > textCharLimit) {
    return {
      message: `Text must not exceed ${textCharLimit} characters`,
      code: "ERR_TEXT_TOO_LONG",
    };
  }
  if (jobText.length < textMinCharLimit) {
    return {
      message: `Text must be at least ${textMinCharLimit} characters`,
      code: "ERR_TEXT_TOO_SHORT",
    };
  }
  try {
    const response = await apiClient.post("jobs/add/text/", { season_id: seasonId, text: jobText });
    const message = response.data?.message;
    if (response.data?.success === false) {
      return { message, code: "ERR_ADD_JOB_TEXT" };
    }
    const job = response.data?.data;
    return { message, job, code: "SUCCESS_ADD_JOB_TEXT" };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to add job by text with error(s) " + error,
      code: "ERR_ADD_JOB_TEXT",
    };
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
  if (!apiClient) {
    return { message: "API client is not available", code: "ERR_INVALID_API_CLIENT" };
  }
  if (!jobId) {
    return { message: "Invalid job ID provided", code: "ERR_INVALID_JOB_ID" };
  }
  if (!starred && !status && !hidden) {
    return { message: "No valid fields provided to update", code: "ERR_NO_FIELDS_TO_UPDATE" };
  }
  if (status && !statusChoices.includes(status)) {
    return { message: "Invalid status provided", code: "ERR_INVALID_STATUS" };
  }
  try {
    const params: any = { status, starred, hidden, job_id: jobId };
    const response = await apiClient.post(`jobs/update/`, params);
    const message = response.data?.message;
    if (response.data?.success === false) {
      return { message, code: "ERR_EDIT_JOB" };
    }
    const job = response.data?.data;
    return { job, message, code: "SUCCESS_EDIT_JOB" };
  } catch (error) {
    console.error(error);
    return { message: "Failed to edit job with error(s) " + error, code: "ERR_EDIT_JOB" };
  }
};
