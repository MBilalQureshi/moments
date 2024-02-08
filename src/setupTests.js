// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// we’ll first import the setupServer function from the msw library.
import {setupServer} from 'msw/node'
import { handlers } from './mocks/handlers';

// Then we’ll create our server by calling the setupServer function we just imported.
// We’ll call it with the spread handlers array that we’ll also auto-import into the file.
// Now we can move onto the test setup and teardown.
const server = setupServer (...handlers)

// We’ll first call the server’s listen method before all the tests
beforeAll(() => server.listen())

// call resetHandlers
afterEach(()=> server.resetHandlers())

//after each test and finally shut the server down after all the tests have been run.
afterAll(()=> server.close)