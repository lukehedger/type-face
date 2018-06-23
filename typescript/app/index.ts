import { print } from 'graphql/language/printer'
import { GraphQLClient } from 'graphql-request'
import gql from 'graphql-tag'

const el_hello = document.getElementById('hello')

const client = new GraphQLClient('http://localhost:4000')

const query = gql`
  query HelloQuery($name: String) {
    hello(name: $name)
  }
`

interface IHello {
  hello: string;
}

// TODO: Type variables
client.request(print(query), { name: 2}).then((data: IHello) => {
  el_hello.innerHTML = data.hello
})
