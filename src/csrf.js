import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }
  const res = await window.fetch(url, options);
  if (res.status >= 400) throw res;
  return res;
}

export function restoreCSRF() {
   return csrfFetch('https://todos-s2mo.onrender.com/api/csrf/restore',
    {
      method: 'GET',
      credentials: 'include'
  });
}

//export const API_URL = "https://todos-s2mo.onrender.com";
export default csrfFetch;