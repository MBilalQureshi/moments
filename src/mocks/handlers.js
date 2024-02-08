import { rest } from "msw"

const baseURL = 'https://django-rest-framework-m5-2af18e6e1cf9.herokuapp.com/'

export const handlers = [
    //it'll take three arguments request, response and context
    rest.get(`${baseURL}dj-rest-auth/user/`, (req,res,ctx) => {
        return res(ctx.json(
            // login in app -> go to https://django-rest-framework-m5-2af18e6e1cf9.herokuapp.com/dj-rest-auth/user/ and get current logged in user data copya nd paste below in json
            /**
             * Now when our tests try to reach out to this endpoint to get the users details,
                our mocked api request handlers will intercept the test request and respond with our provided
                data here, indicating that for my test Admin is the currently logged in user.
             */
            {
                "pk": 1,
                "username": "Admin",
                "email": "bilalqureshi.epic@gmail.com",
                "first_name": "",
                "last_name": "",
                "profile_id": 1,
                "profile_image": "https://res.cloudinary.com/dgdejjc6n/image/upload/v1/media/../default_profile_oojj4p"
              }
        ));
    }),
    /**
     * Now, the logout endpoint is going to be much easier. All we want to
        do is log out successfully with no errors. So, for a post request to the logout endpoint,
        our callback function will return a response with a 200 OK status.
     */
    rest.get(`${baseURL}dj-rest-auth/user/`, (req,res,ctx) => {
        return res(ctx.status(200))
    }),
]