export default function SliderItem({ item }: any) {
  return (
    <article className="bg-white cursor-pointer hover:opacity-80">
      <div>
        <img srcSet={item.img} src={item.img} alt="img title" className="" />
      </div>
      <div className="flex mt-5">
        <div>
          <h1 className="flex-1 text-3xl font-bold hover:underline ">
            {item.title}
          </h1>
          <p className="mt-3 text-xs text-gray-700">{item.info}</p>
        </div>

        <div className="w-44"></div>
      </div>
    </article>
  );
}
