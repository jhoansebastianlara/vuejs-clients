// endpoints
export const ENDPOINTS = {
  CLIENTS: {
    ROOT: 'clients',
    DETAIL: 'clients/:id',
  },
  PROVIDERS: {
    ROOT: 'providers',
    DETAIL: 'providers/:id',
  }
}

// This API attempts to return appropriate HTTP status codes for every request
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
}

// When the this API returns error messages, it does so in JSON format.
export const ERROR_CODES = {
  // Corresponds with HTTP 404 - the specified resource was not found.
  NOT_FOUND: 34,
  // Corresponds with HTTP 400. One or more required inputs missing
  MISSING_FIELDS: 45,
  // Corresponds with HTTP 500 - An unknown internal error occurred.
  INTERNAL_ERROR: 131,
}
