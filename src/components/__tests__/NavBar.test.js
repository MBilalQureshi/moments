import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter  as Router } from "react-router-dom"
import NavBar from '../NavBar'
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
//https://mswjs.io/docs/
//https://testing-library.com/docs/react-testing-library/intro/


// 1
test('render NavBar', () => {
    render(
    <Router>
        {/* We need Router because the NavBar component renders Router Link components. */}

        {/* Make sure you’re importing your custom NavBar component with the capital B,
            not the bootstrap Navbar component with the small b */}
        <NavBar />
    </Router>);

    /**
     * Screen.debug works just like console.log and you can put it in wherever you want.
    One thing worth noting is that if you put it below an assertion,
    and the assertion throws an error, you won’t see anything printed to the terminal.
    If we have a look at the terminal, we can see the printout of our navbar and its links to home,
    sign in and sign up pages. It’s a useful thing to know about for debugging your tests,*/
    // screen.debug()

    const signInLink = screen.getByRole('link', {name: 'Sign in'})

    // to fail 
    // expect(signInLink).not.toBeInTheDocument()

    //to pass
    expect(signInLink).toBeInTheDocument()
})

// 2 we’ll need the callback function to be asynchronous because our test will be fetching data and we’ll need to await changes in the document
test('render link to the user profile for logged in user', async () => {
    render(
    <Router>
        {/* Our profile link will only show once the currentUser data is fetched,
            so for that we’ll need to render the CurrentUserProvider as well. */}
        <CurrentUserProvider>
            <NavBar />
        </CurrentUserProvider>
    </Router>);
    /** (Above is causing this issue below this comment is solution in short await is required)
     * console.error 
    Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
    To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

    Explaination:
    The reason for that is the CurrentUserProvider is fetching currentUser details,
    but we’re not awaiting any UI changes in our test,
    so JEST moves on to the next test without waiting for the request and state update to finish.
    As we need to target elements that aren’t there on mount, because they appear as a result of an async
    function, we should use one of the find query methods with the await keyword
     */
    //You probably noticed that we used a different query method this time to find the profileAvatar, we did this because the “profile” text we are searching for isn’t inside a link this time.
    
    const profileAvatar = await screen.findByText("Profile")

    // to fail
    // expect(profileAvatar).not.toBeInTheDocument()
    // to pass
    expect(profileAvatar).toBeInTheDocument()
})


// 3
test('render Sign in and Sign up buttons again on log out', async () => {
    render(
    <Router>
        <CurrentUserProvider>
            <NavBar />
        </CurrentUserProvider>
    </Router>);
    /**
     *  we’ll define a new variable to query our signOutLink.
        Similar to the profile link, the sign out link isn’t present in the document on mount either.
        So, we will use a find method like last time.
        This time we’ll use the findByRole method because it’s an asynchronous query.
        Now, we need to simulate a user click event. The way to
        do this is by importing fireEvent from the React testing library.
     */
    const signOutLink = await screen.findByRole("link", {name: 'Sign out'});
    fireEvent.click(signOutLink);

    const signInLink = await screen.findByRole("link", {name: 'Sign in'});
    expect(signInLink).toBeInTheDocument();

    const signUpLink = await screen.findByRole("link", {name: 'Sign up'});
    expect(signUpLink).toBeInTheDocument();
    /**
     * (above)
     * So i am curently at "Moments Finishing up Testing in React - part 2", 
     * there was challenge at the end of the video to write two test. 
     * My answers we same as the instructor. But my test fails. 
     * There is one thing If a comments the instructors test "const signOutLink = await screen.findByRole("link", {name: 'Sign out'});
    fireEvent.click(signOutLink);", and run challenge test, they pass instaed of failing. and if I comment challenge test, 
    the above mentioned instructors test pass. But If I uncomment all the test from line 86 to 93 they fail
     */

})
