/* tslint:disable */

export interface Query {
  hello: string;
}
export interface HelloQueryArgs {
  name?: string | null;
}
export namespace HelloQuery {
  export type Variables = {
    name?: string | null;
  };

  export type Query = {
    __typename?: "Query";
    hello: string;
  };
}
