import { config } from "./config"

export const fetchApi = async () => {
    try {
      const response = await fetch(
        `${config.baseUrl}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };