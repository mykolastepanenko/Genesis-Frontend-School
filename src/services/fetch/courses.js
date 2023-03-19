import axios from "axios";
import { api, path } from "../../consts/apiCredentials";
import { validateApiCredentials } from "../validation/validateApiCredentials";

export async function getCources() {
  validateApiCredentials(api.credentials);

  const { host, version } = api;
  const { courses } = path;

  const url = `${host}/${version}/${courses}`;
  const token = await api.credentials.getToken();

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
