import axios from "axios";

// heroku-drf-deployed-project-link
axios.defaults.baseURL = 'https://moments-m5-c936d2b80f9b.herokuapp.com/'
// as this is the type of data our API will be expecting, and multipart because there is images other than text
axios.defaults.headers.post['Content-type'] = 'multipart/form-data'
// To avoid CORS errors while sending cookies
axios.defaults.withCredentials = true