import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  //https://testing-library.com/docs/queries/about/
  //  First, we need to render the component we’d like to test.
  //render(<App />);

  /*  Then, we’ll have to target specific elements on the screen, using an appropriate query method.
  Optionally, we could interact with the returned elements,
  for example simulate a user click, depending on how sophisticated we’d like our test to be*/
  //const linkElement = screen.getByText(/learn react/i);

  //  Finally, we can make our assertions
  //expect(linkElement).toBeInTheDocument();
   //------------------------------
  /**
   * https://testing-library.com/docs/react-testing-library/intro/
   *  there are quite a few drawbacks to this approach:
      Requests are slow. Requests can occasionally cause errors even when
      our code is fine. So it’s not ideal for the tests to depend on an external resource such as an API.
      Requests can be costly. When you come to work in a professional environment you’re
      likely to work with paid for 3rd party APIs. In this case, making constant API requests to
      test code may become very expensive. How do we go about doing that then?
      We can do it by creating mock API responses using request handlers
      to interact with our components and functions. To do this, the React testing library recommends
      using a library called Mock Service Worker, which uses an API built into
      all modern browsers to intercept requests so that we can declaratively mock API responses.
      So let’s use it to create the two mock endpoints we need to test our NavBar component.

      npm install msw --save-dev
      only need it for testing, we’ll use the --save-dev tag at the end of the command. This way,I’ll have
      it saved as a dependency which we only use in the development version of our project.
   */

});
