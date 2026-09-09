import React, { createContext, useContext, useEffect, useState } from "react";
import { seedItems } from "../data/items";

const ItemsContext = createContext(null);

function getStoredItems() {
  try {
    const saved = localStorage.getItem("foundly_items");
    return saved ? JSON.parse(saved) : seedItems;
  } catch {
    return seedItems;
  }
}

export function ItemsProvider({ children }) {
  const [items, setItems] = useState(getStoredItems);

  useEffect(() => {
    localStorage.setItem("foundly_items", JSON.stringify(items));
  }, [items]);

  function addItem(item) {
    const newItem = {
      ...item,
      id: `LF-${Math.floor(1000 + Math.random() * 9000)}`,
      status: item.type === "lost" ? "Active" : "Found",
      createdAt: new Date().toISOString()
    };
    setItems((current) => [newItem, ...current]);
    return newItem;
  }

  function updateItem(id, updates) {
    setItems((current) =>
      current.map((item) => item.id === id ? { ...item, ...updates } : item)
    );
  }

  const deleteItem = (id) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  function clearDemoData() {
    setItems(seedItems);
  }

  return (
    <ItemsContext.Provider value={{ items, addItem, updateItem, deleteItem, clearDemoData }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  return useContext(ItemsContext);
}