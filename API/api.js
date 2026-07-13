const host = window.location.hostname;

let API_HOST;

if (host === 'localhost' || host === '127.0.0.1') {
  API_HOST = 'http://172.16.68.238';
} else if (host === '172.16.68.238') {
  API_HOST = 'http://172.16.68.238';
} else {
  API_HOST = 'http://2.180.11.140';
}

export default API_HOST;
