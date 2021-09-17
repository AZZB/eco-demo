import { rest, graphql } from "msw";
import { allProducts, fashionNews } from "./mocks";

const apiGraph = graphql.link("http://remotedemo:4000/graphql");

export const handlers = [
  rest.get("/", (_req, res, ctx) => {
    return res(ctx.json({}));
  }),
  apiGraph.query("trendProducts", (_req, res, ctx) => {
    return res(
      ctx.data({
        trendProducts: allProducts.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          img: item.imgs[0],
        })),
      })
    );
  }),

  apiGraph.query("fashionNews", (_req, res, ctx) => {
    return res(
      ctx.data({
        fashionNews: fashionNews,
      })
    );
  }),

  apiGraph.query("productDetails", (req, res, ctx) => {
    const { id } = req.variables;
    const product = allProducts.find((item: any) => item.id == id);

    return res(ctx.data({ product }));
  }),
];
