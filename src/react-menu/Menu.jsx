import "./style.sass";
import Item from "./Item";
import Context from "./context";
import React from "react";

export default ({ items, additionalItems, position: [x, y], visible, args, onClose }) => {
  if (!visible) return null;
  items = items.concat(additionalItems);
  return (
    <Context.Provider value={{ args, onClose }}>
      <div className="context-menu" style={{ left: x + "px", top: y + "px" }}>
        {items.map((item) => (
          <Item key={item.title} item={item} />
        ))}
      </div>
    </Context.Provider>
  );
};
