async function checkResponse(response, defaultMessage) {
    if (!response.ok) {
        let message = defaultMessage;
        let body = null;

        try {
            body = await response.text();

            if (body) {
                try {
                    const parsedBody = JSON.parse(body);

                    if (parsedBody && parsedBody.message) {
                        message = parsedBody.message;
                    } else {
                        message = body;
                    }
                } catch {
                    // Response was plain text
                    message = body;
                }
            }
        } catch {
            // Keep the default error message if the response body cannot be read.
        }

        const error = new Error(message || defaultMessage);

        error.status = response.status;
        error.body = body;

        throw error;
    }

    return response;
}

export { checkResponse };