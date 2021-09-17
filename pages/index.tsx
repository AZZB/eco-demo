import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SliderOpacity from "../components/SliderOpacity";
import Topbar from "../components/Topbar";
import ProductsSlider from "../components/ProductsSlider";
import SliderItem from "../components/SliderItem";
import {
  requestFashionNews,
  requestTrendProducts,
} from "../endpoints/gql_requests";

const srcImg =
  "https://static.highsnobiety.com/thumbor/OQvd0vDMRR5cwzaPnvGCu6SI80Y=/320x160/smart/static.highsnobiety.com/wp-content/uploads/2021/09/14151117/met-gala-fits-feature01.jpg";
const srcSet =
  "https://static.highsnobiety.com/thumbor/OQvd0vDMRR5cwzaPnvGCu6SI80Y=/320x160/smart/static.highsnobiety.com/wp-content/uploads/2021/09/14151117/met-gala-fits-feature01.jpg 320w, https://static.highsnobiety.com/thumbor/49ncU71MEHHFNkDHCkiWQ7S1wT0=/400x200/smart/static.highsnobiety.com/wp-content/uploads/2021/09/14151117/met-gala-fits-feature01.jpg 400w, https://static.highsnobiety.com/thumbor/l1NHtY_Y4dzg3FiFHIXqqccf6Sk=/600x300/smart/static.highsnobiety.com/wp-content/uploads/2021/09/14151117/met-gala-fits-feature01.jpg 600w, https://static.highsnobiety.com/thumbor/G-6bb7zBg0nXYvFCDya1gHjxg9E=/800x400/smart/static.highsnobiety.com/wp-content/uploads/2021/09/14151117/met-gala-fits-feature01.jpg 800w, https://static.highsnobiety.com/thumbor/o8og6f8emccf1FZheRkrEmfYjRE=/1000x500/smart/static.highsnobiety.com/wp-content/uploads/2021/09/14151117/met-gala-fits-feature01.jpg 1000w, https://static.highsnobiety.com/thumbor/Rn5URU1UXfhQZU6rId323QWyd4s=/1200x600/smart/static.highsnobiety.com/wp-content/uploads/2021/09/14151117/met-gala-fits-feature01.jpg 1200w";

const Home = ({
  products,
  fashionNews,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="h-full">
      <Head>
        <title>Remote Demo</title>
        <meta
          name="description"
          content="A remote demo for remotemore's team"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Topbar />
      <section className="max-w-screen-lg m-auto mt-10 h-1/2">
        <SliderOpacity ItemComponent={SliderItem} items={fashionNews} />
      </section>
      <section className="max-w-screen-lg m-auto mt-20 border-t border-black">
        <h1 className="text-sm text-gray-900 mt-3">
          LATEST PRODUCTS FROM THE{" "}
          <span className="font-semibold">REMOTE DEMO</span> SHOP
        </h1>
        <ProductsSlider products={products} />
        <div>
          <a
            href="#"
            className="block bg-black text-sm text-white text-center hover:bg-opacity-80 py-3 mt-5"
          >
            VIEW ALL PRODUCTS
          </a>
        </div>
      </section>
      <section className="h-44"></section>
    </div>
  );
};

export default Home;

type FashionNews = {
  id: number;
  img: string;
  title: string;
  info: string;
};

type Product = {
  id: number;
  img: string;
  title: string;
  price: string;
};

export const getStaticProps: GetStaticProps<{
  fashionNews: FashionNews[];
  products: Product[];
}> = async () => {
  const { trendProducts } = await requestTrendProducts();
  const { fashionNews } = await requestFashionNews();
  return {
    props: {
      fashionNews: fashionNews || [],
      products: trendProducts || [],
    },
  };
};
