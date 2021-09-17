import { createContext, useContext, useReducer } from "react";

type Items = [any];
type Dispatch = (...args: any) => void;

const BagContext = createContext<
  | {
      items: Items;
      addToBag: Dispatch;
      removeFromBag: Dispatch;
      updateQuantity: Dispatch;
    }
  | undefined
>(undefined);

function bagReducer(state: any, action: any) {
  switch (action.type) {
    case "addToBag": {
      const index = state.items.findIndex(
        (item: any) => item.id === action.item.id
      );
      if (index > -1) {
        return state;
      }

      return { items: [...state.items, action.item] };
    }
    case "removeFromBag": {
      return {
        items: state.items.filter((item: any) => item.id !== action.id),
      };
    }

    case "updateQuantity": {
      const newItems = [...state.items];
      const index = newItems.findIndex((item: any) => item.id === action.id);

      if (index < 0) {
        return state;
      }

      newItems[index].quantity = action.quantity;
      return {
        items: newItems,
      };
    }

    default: {
      throw new Error("Unknown action");
    }
  }
}

export function BagProvider({ children }: any) {
  const [state, dispatch] = useReducer(bagReducer, { items: [] });

  const addToBag = (item: any) => dispatch({ type: "addToBag", item });
  const removeFromBag = (id: any) => dispatch({ type: "removeFromBag", id });
  const updateQuantity = (id: any, quantity: number) =>
    dispatch({ type: "updateQuantity", id, quantity });

  const value = { items: state.items, addToBag, removeFromBag, updateQuantity };

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error("useBag must be used within a BagProvider");
  }

  return context;
}
