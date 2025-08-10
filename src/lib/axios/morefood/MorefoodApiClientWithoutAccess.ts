import axios from "axios";


const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  // getClientApiUrl("morefood") || process.env.NEXT_PUBLIC_MOREFOOD_BASE_URL;

const MoreFoodApiClientWA = () => {
  const defaultOptions = {
    baseURL,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  };

  const instance = axios.create(defaultOptions);

  return instance;
};

export default MoreFoodApiClientWA();
