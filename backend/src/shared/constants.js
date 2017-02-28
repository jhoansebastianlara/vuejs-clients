module.exports = {
	// Indicates the port on which the api runs
  PORT: 3000,
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

// https://dev.twitter.com/docs/error-codes-responses
// 200 - Generic everything is OK
// 201 - Created something OK
// 202 - Accepted but is being processed async (for a video means
// encoding, for an image means resizing, etc.)
// 400-BadRequest(shouldreallybeforinvalidsyntax,butsomefolks
// use for validation)
// 401 - Unauthorized (no current user and there should be)
// 403 - The current user is forbidden from accessing this data
// 404-ThatURLisnotavalidroute,ortheitemresourcedoesnotexist
// 405 - Method Not Allowed (your framework will probably do this for
// you)
// 410 - Data has been deleted, deactivated, suspended, etc.
// 500 - Something unexpected happened, and it is the APIs fault
// 503 - API is not here right now, please try again later
