import axios from "axios";

export const api = {
  host: process.env.REACT_APP_API_HOST,
  version: process.env.REACT_APP_API_VERSION,
  credentials: {
    header: process.env.REACT_APP_API_HEADER,
    body: process.env.REACT_APP_API_BODY,
    signature: process.env.REACT_APP_API_SIGN,
    async getToken() {
      if (process.env.REACT_APP_TOKEN_FROM_API) {
        const url = `${api.host}/${api.version}/auth/anonymous?platform=subscriptions`;
        const {
          data: { token },
        } = await axios.get(url);
        return token;
      }
      return [this.header, this.body, this.signature].join(".");
    },
  },
};

export const path = {
  courses: "core/preview-courses",
};
