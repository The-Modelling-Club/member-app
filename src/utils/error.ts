export default function formatError(error: any) {
  if (error.response) {
    return error.response.data.message;
  }

  if (error.message) {
    return error.message;
  }

  return "Something went wrong";
}
