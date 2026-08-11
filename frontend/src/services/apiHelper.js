async function checkResponse(response, defaultMessage) {
  if (!response.ok) {
    let message = defaultMessage;
    let body = null;

    try {
      body = await response.json();
      if (body && body.message) {
        message = body.message;
      } else if (typeof body === "string" && body.length) {
        message = body;
      }
    } catch {
      body = await response.text();
      if (body) {
        message = body;
      }
    }

    const error = new Error(message || defaultMessage);
    error.status = response.status;
    error.body = body;
    throw error;
  }
  return response;
}

export { checkResponse };
