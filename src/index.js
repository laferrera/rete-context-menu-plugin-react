import ReactMenu, * as ReactComponents from "./react-menu";
import getMainMenu from "./main-menu";
import getNodeMenu from "./node-menu";
import IMenu from "./menu";

function install(
  editor,
  {
    searchBar = true,
    searchKeep = () => false,
    delay = 1000,
    items = {},
    nodeItems = {},
    allocate = () => [],
    rename = (component) => component.name,
    Menu = null,
  }
) {
  if (!Menu) throw new TypeError("Menu must be defined");

  editor.bind("hidecontextmenu");
  const mainMenu = new (getMainMenu(Menu))(
    editor,
    { searchBar, searchKeep, delay },
    { items, allocate, rename }
  );
  const nodeMenu = new (getNodeMenu(Menu))(
    editor,
    { searchBar: false, delay },
    nodeItems
  );

  editor.on("hidecontextmenu", () => {
    mainMenu.hide();
    nodeMenu.hide();
  });

  editor.on("click contextmenu", () => {
    editor.trigger("hidecontextmenu");
  });

  editor.on("contextmenu", ({ e, node }) => {
    e.preventDefault();
    e.stopPropagation();

    const [x, y] = [e.clientX, e.clientY];
    if (node) {
      let additionalNodeItems =
        typeof nodeItems === "function" ? nodeItems(node) : nodeItems;
      nodeMenu.show(x, y, { node, additionalNodeItems });
    } else {
      mainMenu.show(x, y);
    }
  });
}

export { ReactMenu, ReactComponents };

export default {
  name: "context-menu",
  install,
};
