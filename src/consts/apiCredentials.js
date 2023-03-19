import axios from "axios";
import { validateApiCredentials } from "../services/validation/validateApiCredentials";

export const api = {
  host: process.env.REACT_APP_API_HOST ?? "https://api.wisey.app",
  version: process.env.REACT_APP_API_VERSION ?? "api/v1",
  credentials: {
    header: process.env.REACT_APP_API_HEADER,
    body: process.env.REACT_APP_API_BODY,
    signature: process.env.REACT_APP_API_SIGN,
    async getToken() {
      if (!process.env.REACT_APP_TOKEN_FROM_API) {
        const url = `${api.host}/${api.version}/auth/anonymous?platform=subscriptions`;
        const {
          data: { token },
        } = await axios.get(url);
        return token;
      }

      validateApiCredentials(api.credentials);
      return [
        api.credentials.header,
        api.credentials.body,
        api.credentials.signature,
      ].join(".");
    },
  },
};

export const path = {
  courses: "core/preview-courses",
};
