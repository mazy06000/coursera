// Fetch API

// Async Await

const getDataFromForm = () => {
    const requestObj = {
        firstName: "Bruce",
        lastName: "Lee",
        category: ["nerdy"]
    };
    
    return requestObj;
}

const buildRequestUrl = (requestObj) => {
    const { firstName, lastName, category } = requestObj;
    
    return `http://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}&limitTo=[${category}]`;
}

const requestJoke = async (url) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  const joke = jsonResponse.value.joke;
  postJokeToPage(joke);
};

const postJokeToPage = (joke) => {
    console.log(joke);
};

// Workflow
const processRequest = async () => {
    const requestData = getDataFromForm();
    const url = buildRequestUrl(requestData);
    await requestJoke(url);
    console.log("Done!");
}

processRequest();