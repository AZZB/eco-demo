import { request, gql } from "graphql-request";

const GRAPHQL_ENDPOINT = "http://remotedemo:4000/graphql";

export const requestTrendProducts = async () => {
  const { trendProducts } = await request(
    GRAPHQL_ENDPOINT,
    gql`
      query trendProducts {
        trendsProducts {
          id
          img
          title
          price
        }
      }
    `
  );

  return { trendProducts };
};

export const requestFashionNews = async () => {
  const { fashionNews } = await request(
    GRAPHQL_ENDPOINT,
    gql`
      query fashionNews {
        fashionNews {
          id
          img
          title
          info
        }
      }
    `
  );

  return { fashionNews };
};

export const requestProductDetails = async (id: number) => {
  const { product } = await request(
    GRAPHQL_ENDPOINT,
    gql`
      query productDetails($id: Int!) {
        productDetails(id: $id) {
          id
          imgs
          title
          price
          sizes
        }
      }
    `,
    {
      id: id,
    }
  );

  return product;
};
