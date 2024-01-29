import axios from "axios";

// heroku-drf-deployed-project-link
axios.defaults.baseURL = 'https://django-rest-framework-m5-2af18e6e1cf9.herokuapp.com/'
// as this is the type of data our API will be expecting, and multipart because there is images other than text
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
// To avoid CORS errors while sending cookies
axios.defaults.withCredentials = true


// Response Interceptor: Our response interceptor will listen for  when the API responds that the user's
// access token has expired, and then  refresh that token in the background.  
// This will keep the user  logged in for up to 24 hours.
export const axiosRes = axios.create();

// Request Interceptor: A request interceptor will automatically intercept  any request our application sends to the API  
// that requires information about  the logged in user to work.  
// It will then refresh the user's access  token before sending the request to the API.  
// This will mean our users can keep  liking posts or following profiles.
export const axiosReq = axios.create();

// Inside each interceptor we’ll need to write  the logic to refresh the access token.  
// If our access token has expired, we will  get a 401 error from the server. However,  
// a 401 just means unauthorized access

// Now go to CurrentUserContext.js to apply all the logic mentioned above all