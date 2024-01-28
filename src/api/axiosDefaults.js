import axios from "axios";

// heroku-drf-deployed-project-link
axios.defaults.baseURL = 'https://django-rest-framework-m5-2af18e6e1cf9.herokuapp.com/'
// as this is the type of data our API will be expecting, and multipart because there is images other than text
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
// To avoid CORS errors while sending cookies
axios.defaults.withCredentials = true