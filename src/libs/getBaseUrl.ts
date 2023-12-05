import { config } from "dotenv";

config();

interface ProcessEnv {
  BASE_URL?: string;
}

declare const process: {
  env: ProcessEnv;
};

const getBaseURL = (
  endpoint?: string,
  query?: Record<string, string>
): string => {
  let url = process.env.BASE_URL;

  if (endpoint) {
    url += `${endpoint}`;
  }

  if (query) {
    const queryString = new URLSearchParams(query).toString();
    url += `?${queryString}`;
  }

  return url || ""; 
};

export default getBaseURL;
