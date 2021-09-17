import Topbar from "../../components/Topbar";
import Head from "next/head";
import { useBag } from "../../contexts/bag";
import { useEffect, useState } from "react";

export default function ShopCart() {
  const { items, removeFromBag, updateQuantity } = useBag();

  const totalPrice = items.reduce((acc: number, { price, quantity }: any) => {
    return acc + price * quantity;
  }, 0);

  console.log(totalPrice);

  return (
    <div className="h-full">
      <Head>
        <title>My Bag</title>
        <meta
          name="description"
          content="A remote demo for remotemore's team"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Topbar />

      <main className="max-w-screen-xl m-auto flex mt-20">
        <section className="flex-1 ">
          <div className="border-t border-black mr-4 pt-4">
            <h1>YOUR BAG</h1>
            <div>
              {items.map((item: any) => (
                <OrderItem
                  key={item.id}
                  item={item}
                  removeItem={() => removeFromBag(item.id)}
                  updateQuantity={updateQuantity}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="w-2/6">
          <div className="ml-5 border-t border-black pt-4">
            <h1>ORDER SUMMARY</h1>
            <div className="flex mt-20">
              <span className="flex-1">TOTAL</span>
              <span>{totalPrice} $</span>
            </div>
            <button className="bg-black text-white hover:bg-opacity-80 text-center w-full py-3 mt-6">
              CHECKOUT
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function OrderItem({ item, removeItem, updateQuantity }: any) {
  const [quantiy, setQuantity] = useState(1);

  useEffect(() => {
    updateQuantity(item.id, quantiy);
  }, [quantiy]);

  return (
    <article className="flex mt-4 border-b pb-3">
      <div className="w-44">
        <img srcSet={item.img} />
      </div>
      <div className="flex-1 px-2">
        <h2 className="text-lg text-gray-900">{item.title}</h2>
        <p className="text-gray-900 text-xs mt-5">Color: {item.color}</p>
        <p className="text-gray-900 text-xs">Size: {item.size}</p>
        <div className="mt-5">
          <button
            className="inline-block border px-2 py-1 text-gray-600 outline-none"
            onClick={() =>
              setQuantity((quantiy) => (quantiy > 1 ? quantiy - 1 : 1))
            }
          >
            -
          </button>
          <span className="inline-block border px-3 py-2 text-sm text-gray-900">
            {quantiy}
          </span>
          <button
            className="inline-block border px-2 py-1 text-gray-600 outline-none"
            onClick={() => setQuantity((quantiy) => quantiy + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-end">
        <p className="text-gray-900">${item.price * quantiy}.00 USD</p>
        <button className="text-gray-600 text-sm" onClick={removeItem}>
          REMOVE
        </button>
      </div>
    </article>
  );
}
