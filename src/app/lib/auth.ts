import Cookies from "js-cookie";

export function getToken() {
  if (typeof window === "undefined") {
    return null;
  }
  const token = Cookies.get("tmcAuthToken");
  if (!token) {
    return null;
  }
  return token;
}

export function setToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("tmcAuthToken", token);
}
