import { useEffect, useState } from "react";

export default function SliderOpacity({ ItemComponent, items }: any) {
  const [position, setPosition] = useState(0);

  const moveAction = (direction: string) => {
    if (direction === "left") {
      if (position > 0) {
        setPosition((position) => position - 1);
      }
    } else {
      if (position < items.length - 1) {
        setPosition((position) => position + 1);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition((position) =>
        position === items.length - 1 ? 0 : position + 1
      );
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden overflow-y-hidden">
      <div className="absolute top-0 left-0 flex flex-col justify-center h-full">
        <MoveButton onClick={() => moveAction("left")}>{"<"}</MoveButton>
      </div>
      <div className="absolute top-0 right-0 flex flex-col justify-center h-full">
        <MoveButton onClick={() => moveAction("right")}>{">"}</MoveButton>
      </div>
      <main className="flex nowrap">
        {items.map((item: any, index: number) => (
          <div
            className="slide-item bg-white transition-opacity"
            key={item.id}
            style={{
              transform: `translateX(${-100 * position}%)`,
              opacity: index === position ? 1 : 0.5,
              transitionDuration: "1000",
            }}
          >
            <ItemComponent item={item} />
          </div>
        ))}
      </main>
    </div>
  );
}

const MoveButton = ({ children, onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 flex justify-center items-center bg-black bg-opacity-50 text-white z-50 outline-none"
    >
      {children}
    </button>
  );
};
