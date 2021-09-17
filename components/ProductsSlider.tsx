import { useState } from "react";
import Link from "next/link";
export default function ProductsSlider({ products }: any) {
  const [position, setPosition] = useState(0);

  const moveAction = (direction: string) => {
    if (direction === "right") {
      if (position < products.length - 3) {
        setPosition((position) => position + 1);
      }
    } else {
      if (position > 0) {
        setPosition((position) => position - 1);
      }
    }
  };

  return (
    <main className="overflow-x-hidden overflow-y-hidden mt-5 relative">
      <div className="absolute left-3 top-0 h-full flex flex-col justify-center flex-nowrap">
        <MoveButton onClick={() => moveAction("left")}>{"<"}</MoveButton>
      </div>
      <div className="absolute right-3 top-0 h-full flex flex-col justify-center">
        <MoveButton onClick={() => moveAction("right")}>{">"}</MoveButton>
      </div>
      <div
        className="flex flex-nowrap transition-transform transition-duration-1000"
        style={{
          transform: `translateX(-${(100 / 3) * position}%)`,
        }}
      >
        {products.map((item: any) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}

const MoveButton = ({ children, onClick }: any) => {
  return (
    <button
      className="w-10 h-10 border bg-white flex justify-center items-center rounded-full cursor-pointer text-xs text-gray-600 outline-none z-50"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

function ProductItem({ item }: any) {
  return (
    <Link href={`/product/${item.id}`}>
      <article
        key={item.id}
        className="mx-2 slider-product-item hover:opacity-80"
      >
        <div className="bg-gray-200 pb-4">
          <img src={item.img} alt={item.title} className="" />
        </div>
        <p className="text-sm text-gray-900 mt-3">{item.title}</p>
        <span className="text-sm text-gray-700">{item.price}.00 $</span>
      </article>
    </Link>
  );
}
