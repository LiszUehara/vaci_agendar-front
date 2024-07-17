import env from '../utils/env';

export class FetcherError extends Error {
  original: any;
  cause: any;
  constructor() {
    super();
  }
}

async function fetcher(url: URL | string, options: RequestInit = {}) {
  const response = await fetch(`${env.VITE_BACKEND_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Bearer ${sessionStorage.getItem('@token')}`,
    },
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  return { error: true, cause: data.message,  original: data };
}

fetcher.delete = function (url: string | URL) {
  return fetcher(url, {
    method: 'DELETE',
  });
};

fetcher.get = function (url: string | URL) {
  return fetcher(url);
};

fetcher.post = function (url: string | URL, data: unknown) {
  return fetcher(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

fetcher.put = function (url: string | URL, data: unknown) {
  return fetcher(url, {
    body: JSON.stringify(data),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default fetcher;