const fetch = require('node-fetch');

export const handleResponse = (response) => {
  if (response.ok) return response.json().catch(() => {});
  throw new Error(response.text());
};

export const fetchWrapper = async ({
                                     endpoint,
                                     method = 'GET',
                                     headers = { 'Content-Type': 'application/json' },
                                     body = null
                                   } = {}) => {
  const payload = { method, headers };
  if (body) {
    payload.body = JSON.stringify(body);
  }
  const response = await fetch("http://localhost:8080/" + endpoint, payload);
  return handleResponse(response);
};