//export const BASE_URL = "/api";

// export const BASE_URL = "http://localhost:8888";

console.log("Local host name for now " + location.hostname);

export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:8888" : "/api";
