// @flow
import fetch from "node-fetch";

type Query = {
  hello: string
};

type QueryHelloArgs = {
  name: string
};

type QueryHelloResponse = {
  data: {
    hello: string
  }
};

// GraphQL request factory
async function makeRequest(query: string) {
  const response = await fetch("http://localhost:4000/", {
    body: JSON.stringify({ query: query }),
    headers: { "Content-Type": "application/json" },
    method: "POST"
  });

  const json = await response.json();

  if (typeof json.errors !== "undefined") {
    return json.errors.map(error => console.log(error.message));
  }

  return json;
}

// Valid operation
// => Hello Flow!
makeRequest('{hello(name: "Flow")}').then((res: QueryHelloResponse) => {
  console.log(res.data.hello);
});

// Invalid use of response
// => undefined
makeRequest('{hello(name: "Flow")}').then((res: QueryHelloResponse) => {
  console.log(res.data.something);
});

// Invalid argument key
// => Unknown argument "username" on field "hello" of type "Query". Did you mean "name"?
makeRequest('{hello(username: "Flow")}');

// Invalid argument value
// => Expected type String, found 123.
makeRequest("{hello(name: 123)}");

// Invalid operation name
// => Cannot query field "hey" on type "Query".
makeRequest('{hey(name: "Flow")}');
