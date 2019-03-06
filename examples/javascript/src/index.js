import fetch from "node-fetch";

// Mock `gql` tag for ESLint to identify as GraphQL operation
// https://github.com/apollographql/eslint-plugin-graphql#identity-template-literal-tag
function gql(literals, ...substitutions) {
  let result = "";

  for (let i = 0; i < substitutions.length; i++) {
    result += literals[i];
    result += substitutions[i];
  }

  result += literals[literals.length - 1];

  return result;
}

// GraphQL request factory
async function makeRequest(query) {
  const response = await fetch("http://localhost:4000/", {
    body: JSON.stringify({ query: query }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  const json = await response.json();

  if (typeof json.errors !== "undefined") {
    return json.errors.map(error => console.log(error.message));
  }

  return json;
}

// Valid operation
// => Hello JavaScript!
makeRequest(
  gql`
    {
      hello(name: "JavaScript")
    }
  `
).then(res => {
  console.log(res.data.hello);
});

// Invalid use of response
// => undefined
makeRequest(
  gql`
    {
      hello(name: "JavaScript")
    }
  `
).then(res => {
  console.log(res.data.something);
});

// Invalid argument key
// => Unknown argument "username" on field "hello" of type "Query". Did you mean "name"?
makeRequest(
  gql`
    {
      hello(username: "JavaScript")
    }
  `
);

// Invalid argument value
// => Expected type String, found 123.
makeRequest(
  gql`
    {
      hello(name: 123)
    }
  `
);

// Invalid operation name
// => Cannot query field "hey" on type "Query".
makeRequest(
  gql`
    {
      hey(name: "JavaScript")
    }
  `
);
