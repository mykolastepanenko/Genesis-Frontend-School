import axios from "axios";
import { api, path } from "../../consts/apiCredentials";

export async function getLessons(lesson) {
  const { host, version } = api;
  const { courses } = path;

  const url = `${host}/${version}/${courses}/${lesson}`;
  const token = await api.credentials.getToken();

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
