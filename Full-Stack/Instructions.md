# Instructions

In our previous workshops, we've created the front and back-end applications for a Movie Picker app. In [React 101](https://github.com/Black-and-Hispanic-Tech-Summit/React-101), you created a front-end application that uses multiple components to render a Movie Picker UI. This starter application used an in-memory `data.js` file as its data source for the application.

In [API 101](https://github.com/Black-and-Hispanic-Tech-Summit/APIs-101), you created a RESTful backend API that provides several endpoints that can be used to retrieve, create, and update Movie data. This Movies Service persists movie data in a database and provides CRUD endpoints for manipulating Movies.

In this workshop, we will update the front-end React application to use the Movie Service API as its back-end data source, instead of `data.js`.

- [Instructions](#instructions)
  - [Initial Setup](#initial-setup)
  - [Step 1: Fetching the Movie Catalog](#step-1-fetching-the-movie-catalog)
    - [Creating a `data` state variable](#creating-a-data-state-variable)
    - [Creating a `useEffect` hook](#creating-a-useeffect-hook)
    - [Make a `fetch` call to our API](#make-a-fetch-call-to-our-api)
    - [Updating our state with the response data](#updating-our-state-with-the-response-data)
  - [Step 2: Pick a Movie](#step-2-pick-a-movie)
    - [Create a `data` state variable](#create-a-data-state-variable)
    - [Fetch data in a `useEffect` hook](#fetch-data-in-a-useeffect-hook)
  - [Step 3: Add a Movie](#step-3-add-a-movie)
    - [Construct the Request Body](#construct-the-request-body)
    - [Making a POST request](#making-a-post-request)
    - [Navigate to the main page](#navigate-to-the-main-page)

## Initial Setup

You will need to have both the front-end and back-end applications open *and running* on your machine in order to configure your Full-Stack application. Since our React app will need to make requests to the back-end API, you will need to ensure your Express API is up and running on your computer so that the server can respond to our requests.

You can continue using the applications you built during the workshops, but we also have the [completed React](https://github.com/Black-and-Hispanic-Tech-Summit/React-101/tree/main/movie-picker) and API apps available. If you choose to use one or both of these starter apps, make sure you run `npm install` first to install all of the required app dependencies, then run `npm start` to start the applications.

The React application will run on `http://localhost:3000`, while the API will run on `http://localhost:8080`. Make a request to both URLs to confirm that your apps are running as expected.

We will be making all of our changes for this workshop in the React `movie-picker` application.

## Step 1: Fetching the Movie Catalog

The first place we are going to update our app is the `Catalog.js` file. Currently, the `Catalog` component is displaying the Movies from the `data.js` file, but we want to update this to pull its Movie data from our API instead.

To make this update, we will make a few changes:

1. Use the `useState` hook to create a new `data` variable
2. Use the `useEffect` hook and `fetch` to make an HTTP Request to our Movie API when the component loads
3. Update our `data` state variable with the data returned in the HTTP Response from the API

### Creating a `data` state variable

The first thing we need to do is replace the `data` imported from `data.js` with a new state variable that can hold data retrieved from our API.

On the first line of the `Catalog` function component definition (before the `return` statement), add the following line of code:

```jsx
const [data, setData] = useState([]);
```

This will require an import statement for `useState` from `react`.

```js
import React, { useState } from 'react'
```

This line creates our `data` state variable, along with a `setData` function we can use to set our data after retrieve it from the API.

Now, you can remove the `import` of the previous `data` variable, since we've replaced it with our state variable.

```jsx
// delete this
import {data} from '../data/data'
```

### Creating a `useEffect` hook

The [Effect Hook](https://reactjs.org/docs/hooks-effect.html) in React is used to perform "side effects" in React Components. This hook will allow us to define a function that should run any time the component mounts or updates. The hook accepts two parameters: the function (or *effect*) we want to execute on updates, and a list of dependencies that can help determine how often the hook runs. This dependency list will tell React to skip applying our effect if those dependencies haven't changed between re-renders. You can read more about using `useEffect` here: [React useEffect Hooks](https://www.w3schools.com/react/react_useeffect.asp).

To create an effect that only runs when the component first loads, we can provide an empty array `[]` to the dependency list. This will cause our effect function to only run the first time the component is rendered.

Add this to your `Catalog` component right after you define the `data` state variable:

```jsx
useEffect(() => {
    // Retrieve Movie data
}, []);
```

You will also need to import this from `react`:

```js
import React, { useEffect, useState } from 'react'
```

This hook will run the function provided (implementation TBD) when the component is first rendered, and then will not run it again.

### Make a `fetch` call to our API

Now, we are ready to retrieve data from our Movie API! We will use JavaScript's [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to help us construct and send an HTTP Request to our API, and then also process the HTTP Response that is returned.

Since requests made to an external data source may take an indeterminate amount of time, the Fetch API uses [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to handle the asynchronous requests. A Promise is an asynchronous function that *promises* to return a value once the result is available. We can process the returned result using the `.then()` method.

Here is an example of the syntax used to make an HTTP Request using `fetch`:

```js
fetch('http://example.com/data.json')
    .then((response) => response.json())
    .then((data) => console.log(data));
```

The first `then` function takes the response received from the API and converts it into a JSON format. The second ("chained") `then` function simple logs the data. We will use a similar approach for making a request to our API.

To request all of the Movie data, we will need to make a `GET` request to `http://localhost:8080/api/movies`. We will convert the corresponding response to JSON, and then use the json data to update our `data` state variable. All of this will go into our `useEffect` hook.

Here is the code all put together. Update your `Catalog.js` component with the following:

```jsx
useEffect(() => {
    fetch('http://localhost:8080/api/movies')
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))
}, []);
```

> Note: We have also included a `catch` function to log any errors that may occur with the `fetch` call.

At this point, if you run the React app and open your browser console, when you load the Categories page, you should see the Category data from our API printed to the console.

### Updating our state with the response data

The final piece is to update our new `data` state variable with the data returned from the API. Replace the `console.log(json)` with `setData(json)`.

```jsx
useEffect(() => {
    fetch('http://localhost:8080/api/movies')
        .then(response => response.json())
        .then(json => setData(json))
        .catch(err => console.log(err))
}, []);
```

This will update the `data` within our component, which will trigger the component to re-render. The Movie data will then be mapped into `Movie` components onto the screen.

Test it out and see if the Movie data is appearing on your Categories page. Congratulations! You have now implemented your first Full-Stack feature!

## Step 2: Pick a Movie

Next up is to implement the "Pick a Movie" feature. This will be very similar how we implemented our Catalog.

As with the Catalog, we need to simply replace the in-memory `data` storage with our back-end API's Movie data. To accomplish this, we will follow the same steps.

### Create a `data` state variable

Within the `PickMovie` component, add a new state variable for `data`, under the other state variables:

```jsx
const [data, setData] = useState([]);
```

You can delete the import statement for the original `data` at the top of the file.

### Fetch data in a `useEffect` hook

Next, we will use a `useEffect` hook to load the movie data when the component loads. This data is what will be used to pick random movies.

Add this hook to your `PickMovie` component, after the state variables and before the `moviePicker` function:

```jsx
useEffect(() => {
    fetch('http://localhost:8080/api/movies')
        .then(response => response.json())
        .then(json => setData(json))
        .catch(err => console.log(err))
}, []);
```

This will require an `import` for `useEffect` from `react` at the top of the file.

That's it! Our Pick a Movie feature should now be functional, using the API's movie data. Try it out!

## Step 3: Add a Movie

Our final step is to implement adding a Movie to the API. Our `AddMovie` component already handles processing the user input to create a `Movie` object - now, we simply need to pass this data to the backend Movie API in the proper format.

If you recall, to create a Movie in the backend API, we need to make a `POST` request to the `/api/movies` route with the Movie data passed in on the request body.

The only changes we will need to make to the `AddMovie` component is in the `addMovieHandler` function. In this function, we'll construct a request body, then make a `POST` request to the API. We'll use a `fetch` call like we did before; however this time, we will include some additional request options to specify more details about our HTTP request.

### Construct the Request Body

Delete the existing code within the `addMovieHandler` function. You can also delete the `import` statement for `data` at the top of the file.

The first thing we want to do within `addMovieHandler` is construct the body that we want to send with our API request to the server. This JSON object should reflect the properties that the `POST` route in the API is expecting to create a Movie:

```jsx
const addMovieHandler = (event) => {
    const newMovie = {
        name: name,
        genre: genre,
        img: image
    };
}
```

### Making a POST request

Next, we can make our `fetch` request to the API. This will look similar to our prior requests, however we will be including a `method` type and a `body` since this is a `POST` method. Here is the generic format of a `POST` `fetch` call:

```jsx
fetch('http://someapi.com', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqObj)
})
```

To adapt this to our usage, we can add the following to the `addMovieHandler`:

```jsx
fetch('http://localhost:8080/api/movies', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMovie)
});
```

### Navigate to the main page

Finally, we need to tell the app what to do once the Movie is successfully created. We'll still use the `navigate` method to direct users back to the home page, like we did before. However, this time we will include this code in the `then` statement of our `fetch` request, so that the navigation only occurs after the Movie was successfully created.

Here is our completed `addMovieHandler` function:

```jsx
const addMovieHandler = (event) => {
    const newMovie = {
        name: name,
        genre: genre,
        img: image
    }
    fetch('http://localhost:8080/api/movies', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
    })
    .then(navigate("../", ({replace: true})))
    .catch(err => console.log(err))
}
```

Try it out! Add in the details for a new movie on the "Add a Movie" page, and see the new movie appear on the Catalog page.

Now, when you restart your React app, the movies you created will persist.

Congratulations, you have now completed your full-stack Movie application!
