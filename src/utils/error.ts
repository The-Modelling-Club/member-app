export default function formatError(error: any) {
  // Handle timeout errors
  if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
    return "Request timed out. Please try again.";
  }

  // Handle network errors
  if (
    error.code === "ERR_NETWORK" ||
    error.message?.includes("Network Error")
  ) {
    return "Network error. Please check your connection and try again.";
  }

  // Handle server response errors
  if (error.response) {
    const message = error.response.data?.message || error.response.data?.error;
    if (message) {
      return message;
    }

    // Handle specific HTTP status codes
    switch (error.response.status) {
      case 400:
        return "Invalid request. Please check your input.";
      case 401:
        return "Unauthorized. Please check your credentials.";
      case 403:
        return "Access denied. You don't have permission for this action.";
      case 404:
        return "Resource not found.";
      case 409:
        return "Conflict. This resource already exists.";
      case 422:
        return "Validation error. Please check your input.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return `Server error (${error.response.status}). Please try again.`;
    }
  }

  // Handle axios errors
  if (error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
