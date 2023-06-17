import { QueryClient } from "@tanstack/react-query";
import Axios from "axios";

// Axios.defaults.baseURL = "https://prep-api.vercel.app/api/v1/";

export const Fetcher = Axios.create({
  baseURL: "https://prep-api.vercel.app/api/v1/",});

export default new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});
