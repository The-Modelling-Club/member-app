import Cookies from "js-cookie";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  membership_id: string;
  type: string;
  school: string;
  programme: string;
  status: string;
}

export interface AuthData {
  access_token: string;
  refresh_token: string;
  user: User;
}

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

export function setAuthData(data: AuthData) {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("tmcAuthToken", data.access_token);
  Cookies.set("tmcRefreshToken", data.refresh_token);
  Cookies.set("tmcUserData", JSON.stringify(data.user));
}

export function getUserData(): User | null {
  if (typeof window === "undefined") {
    return null;
  }
  const userData = Cookies.get("tmcUserData");
  if (!userData) {
    return null;
  }
  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
}

export function getRefreshToken() {
  if (typeof window === "undefined") {
    return null;
  }
  const token = Cookies.get("tmcRefreshToken");
  if (!token) {
    return null;
  }
  return token;
}

export function removeAuthData() {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("tmcAuthToken");
  Cookies.remove("tmcRefreshToken");
  Cookies.remove("tmcUserData");
}

export function logout() {
  removeAuthData();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

export function setToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("tmcAuthToken", token);
}

export function removeToken() {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("tmcAuthToken");
}
