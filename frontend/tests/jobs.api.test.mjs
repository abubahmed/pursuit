import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const backendUrl = process.env.NEXTAUTH_BACKEND_URL || "http://localhost:8000/api/";
console.log(backendUrl);

const dummyUrl =
  "https://careers.genmab.com/global/en/job/GEZGENUSR11139EXTERNALENGLOBAL/-Senior-Manager-Senior-Software-Engineer-Intelligent-Automation-Commercialization-Enabling-Functions?UTM_Source=Indeed_SP";

const getJobs = async () => {
  try {
    const response = await axios({
      url: backendUrl + "jobs/",
      method: "get",
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      console.error(error.response.data);
    } else if (error.request) {
      console.error("Error: No response received from server.");
      console.error(error.request);
    } else {
      console.error("Error:", error.message);
    }
  }
  return null;
};

const addJob = async ({ url }) => {
  try {
    const response = await axios({
      url: backendUrl + "jobs/add/",
      method: "post",
      data: { url },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      console.error(error.response.data);
    } else if (error.request) {
      console.error("Error: No response received from server.");
      console.error(error.request);
    } else {
      console.error(error.message);
    }
  }
  return null;
};

const main = async () => {
  const newJob = await addJob({ url: dummyUrl });
  console.log(newJob);
};

main();
