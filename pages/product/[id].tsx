import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Topbar from "../../components/Topbar";
import { useBag } from "../../contexts/bag";
import { requestProductDetails } from "../../endpoints/gql_requests";
import Head from "next/head";

export default function ProductPage({
  notFound,
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { addToBag } = useBag();

  const addToBagAction = () => {
    addToBag({
      id: product?.id,
      title: product?.title,
      price: product?.price,
      img: product?.imgs[0],
      color: "Red",
      size: "L",
      quantity: 1,
    });
  };

  if (notFound) {
    return (
      <div>
        <Head>
          <title>Not found</title>
          <meta
            name="description"
            content="A remote demo for remotemore's team"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Topbar />
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <Head>
        <title>{product?.title}</title>
        <meta
          name="description"
          content="A remote demo for remotemore's team"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar />
      <main className="flex  mt-20  max-w-screen-xl m-auto">
        <section className="flex flex-1 flex-wrap justify-center">
          {product?.imgs.map((img, index) => (
            <ProductImage img={img} key={index} />
          ))}
        </section>
        <section className="w-72 pt-4 px-3 border-t border-black">
          <h1 className="font-bold text-4xl">{product?.title}</h1>
          <p className="mt-10 mb-2 text-gray-900">${product?.price}.00 USD</p>
          <div className="mb-10">
            <span className="bg-gray-200 text-center text-xs px-2 py-1 rounded-sm mr-2">
              Free shipping
            </span>
            <span className="bg-gray-200 text-center text-xs px-2 py-1 rounded-sm">
              Duties & Taxes Paid
            </span>
          </div>

          <div>
            <label className="block text-gray-700">Size</label>
            <select className="w-full py-2 px-2 outline-none cursor-pointer">
              {product?.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={addToBagAction}
            className="bg-black text-white text-sm hover:bg-opacity-80 text-center py-2 w-full mt-5"
          >
            ADD TO BAG
          </button>
          <ul className="mt-3 list-disc pl-5">
            <li className="text-xs text-gray-900 mb-1">
              This product ships for free
            </li>
            <li className="text-xs text-gray-900">14 days free returns</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

const ProductImage = ({ img }: any) => {
  return (
    <article className="product_details_item mx-2 mb-4">
      <img srcSet={img} />
    </article>
  );
};

type Product = {
  id: number;
  imgs: string[];
  title: string;
  price: string;
  sizes: string[];
};

export const getStaticProps: GetStaticProps<{
  product?: Product | null;
  notFound?: boolean;
}> = async (ctx) => {
  const product = await requestProductDetails(
    parseInt(ctx.params?.id as string, 10)
  );

  if (product) {
    return { props: { product } };
  }

  return {
    props: {
      notFound: !product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
