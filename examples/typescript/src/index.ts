import fetch from "node-fetch";

interface Query {
  hello: string;
}

interface QueryHelloArgs {
  name: string;
}

interface QueryHelloResponse {
  data: {
    hello: string;
  };
}

// GraphQL request factory
async function makeRequest(query: string) {
  const response = await fetch("http://localhost:4000/", {
    body: JSON.stringify({ query: query }),
    headers: { "Content-Type": "application/json" },
    method: "POST"
  });

  const json = await response.json();

  if (typeof json.errors !== "undefined") {
    return json.errors.map((error: any) => console.log(error.message));
  }

  return json;
}

// Valid operation
// => Hello TypeScript!
makeRequest('{hello(name: "TypeScript")}').then((res: QueryHelloResponse) => {
  console.log(res.data.hello);
});

// Invalid use of response
// => undefined
makeRequest('{hello(name: "TypeScript")}').then((res: QueryHelloResponse) => {
  console.log(res.data.something);
});

// Invalid argument key
// => Unknown argument "username" on field "hello" of type "Query". Did you mean "name"?
makeRequest('{hello(username: "TypeScript")}');

// Invalid argument value
// => Expected type String, found 123.
makeRequest("{hello(name: 123)}");

// Invalid operation name
// => Cannot query field "hey" on type "Query".
makeRequest('{hey(name: "TypeScript")}');
