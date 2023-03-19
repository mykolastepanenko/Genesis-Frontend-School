export function validateApiCredentials(apiCredentials) {
  Object.values(apiCredentials).forEach((item) => {
    if (!item) {
      throw new Error("API CREDENTIALS ARE EMPTY");
    }
  });
}
