module.exports = {
	// This API attempts to return appropriate HTTP status codes for every request
	HTTP_STATUS: {
		OK: 200,
		CREATED: 201,
    BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		FORBIDDEN: 403,
		NOT_FOUND: 404,
		INTERNAL_ERROR: 500
	},
	// When the this API returns error messages, it does so in JSON format.
	ERROR_CODES: {
		// Corresponds with HTTP 404 - the specified resource was not found.
		NOT_FOUND: {
			code: 34,
			message: 'Resource not found'
		},
		// Corresponds with HTTP 400. One or more required inputs missing
		MISSING_FIELDS: {
			code: 45,
			message: 'Missing fields'
		},
		// Corresponds with HTTP 500 - An unknown internal error occurred.
		INTERNAL_ERROR: {
			code: 131,
			message: 'Internal Error'
		},
	},
}
