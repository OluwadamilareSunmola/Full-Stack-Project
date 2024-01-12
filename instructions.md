To edit the instructions with a first-person focus and emphasize that it is a personal project from a hackathon, here's a revised version:

---

# Instructions

In my journey through previous workshops, I developed both front-end and back-end applications for a Movie Picker app. In my exploration of [React 101](https://github.com/Black-and-Hispanic-Tech-Summit/React-101), I created a front-end application using multiple components to craft a Movie Picker UI. This initial application utilized an in-memory `data.js` file as its data source.

During my time with [API 101](https://github.com/OluwadamilareSunmola/Full-Stack-Project/tree/master/APIs-101-main), I ventured into creating a RESTful backend API. This API offered several endpoints to retrieve, create, and update Movie data. I made sure this Movies Service persisted movie data in a database and provided CRUD endpoints for manipulating Movies.

Now, in this workshop, I am going to share how I updated the front-end React application to harness the Movie Service API as its back-end data source, moving away from the static `data.js`.

- [Instructions](#instructions)
  - [Initial Setup](#initial-setup)
  - [Step 1: Fetching the Movie Catalog](#step-1-fetching-the-movie-catalog)
    - [Creating a `data` state variable](#creating-a-data-state-variable)
    - [Creating a `useEffect` hook](#creating-a-useeffect-hook)
    - [Making a `fetch` call to our API](#make-a-fetch-call-to-our-api)
    - [Updating our state with the response data](#updating-our-state-with-the-response-data)
  - [Step 2: Pick a Movie](#step-2-pick-a-movie)
    - [Creating a `data` state variable](#create-a-data-state-variable)
    - [Fetching data in a `useEffect` hook](#fetch-data-in-a-useeffect-hook)
  - [Step 3: Add a Movie](#step-3-add-a-movie)
    - [Constructing the Request Body](#construct-the-request-body)
    - [Making a POST request](#making-a-post-request)
    - [Navigating to the main page](#navigate-to-the-main-page)

## Initial Setup

I needed both the front-end and back-end applications open *and running* on my machine to configure the Full-Stack application. Since the React app was designed to make requests to the back-end API, it was crucial that my Express API was up and running on my computer to respond to our requests.

I continued using the applications I built during the workshops, but I also have the [completed React](https://github.com/Black-and-Hispanic-Tech-Summit/React-101/tree/main/movie-picker) and API apps available. If you choose to use these starter apps, make sure to run `npm install` first to install all required app dependencies, then run `npm start` to start the applications.

The React application will run on `http://localhost:3000`, while the API will run on `http://localhost:8080`. Make a request to both URLs to confirm that your apps are running as expected.

I made all the changes for this workshop in the React `movie-picker` application.

## Step 1: Fetching the Movie Catalog

The first place I updated our app was the `Catalog.js` file. Originally, the `Catalog` component displayed Movies from the `data.js` file, but I wanted to pull Movie data from our API instead.

Here's what I did:

1. Used the `useState` hook to create a new `data` variable.
2. Used the `useEffect` hook and `fetch` to make an HTTP Request to our Movie API when the component loaded.
3. Updated our `data` state variable with the data returned in the HTTP Response from the API.

### Creating a `data` state variable

I started by replacing the `data` imported from `data.js` with a new state variable to hold data retrieved from our API.

In the `Catalog` function component, I added:

```jsx
const [data, setData] = useState([]);
```

And imported `useState` from `react`:

```js
import React, { useState } from 'react'
```

I removed the previous `import` of `data` from `data.js`.

### Creating a `useEffect` hook

I used the [Effect Hook](https://reactjs.org/docs/hooks-effect.html) in React for "side effects". The hook ran a function any time the component mounted or updated, controlled by a list of dependencies.

I added this in my `Catalog` component:

```jsx
useEffect(() => {
    // Retrieve Movie data
}, []);
```

And imported `useEffect` and `useState` from `react`.

### Making a `fetch` call to our

 API

I used the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to request data from our Movie API. Fetch uses [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for asynchronous operations.

Here's my fetch request in `Catalog.js`:

```jsx
useEffect(() => {
    fetch('http://localhost:8080/api/movies')
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))
}, []);
```

### Updating our state with the response data

Finally, I updated our `data` state variable with the API response data.

```jsx
useEffect(() => {
    fetch('http://localhost:8080/api/movies')
        .then(response => response.json())
        .then(json => setData(json))
        .catch(err => console.log(err))
}, []);
```

## Step 2: Pick a Movie

For the "Pick a Movie" feature, I again replaced the in-memory `data` storage with API data, following similar steps as before.

### Creating a `data` state variable

In `PickMovie`, I added:

```jsx
const [data, setData] = useState([]);
```

And removed the original `data` import.

### Fetching data in a `useEffect` hook

I used `useEffect` to load movie data for the "Pick a Movie" feature:

```jsx
useEffect(() => {
    fetch('http://localhost:8080/api/movies')
        .then(response => response.json())
        .then(json => setData(json))
        .catch(err => console.log(err))
}, []);
```

## Step 3: Add a Movie

The last step was adding a Movie to the API. In `AddMovie`, I needed to pass user input to the backend Movie API.

### Constructing the Request Body

In `addMovieHandler`, I created the body for the API request:

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

I used `fetch` for a `POST` request to the API:

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

### Navigating to the main page

Finally, I included navigation in the `then` statement of our fetch request:

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

I hope you find these insights from my hackathon project helpful for your own full-stack Movie application endeavors!
