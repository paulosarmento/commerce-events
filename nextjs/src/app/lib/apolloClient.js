import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://alimentofit.com.br/api";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: apiUrl,
    }),
    cache: new InMemoryCache(),
  });
};

export const apolloClient = createApolloClient();
