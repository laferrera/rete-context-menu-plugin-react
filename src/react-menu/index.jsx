import React from "react";
import ReactDOM from "react-dom";
import ReactMenu from "./Menu";
import Menu from "../menu";
import { injectItem, traverse } from "../utils";

export default class extends Menu {
  constructor(editor, props) {
    super();
    this.props = props;
    this.items = [];
    this.additonalItems = [];
    this.position = [0, 0];
    this.visible = false;
    this.el = document.createElement("div");
    editor.view.container.appendChild(this.el);

    this.render();
  }

  addItem(title, onClick, path = []) {
    injectItem(this.items, title, onClick, path);
    this.render();
  }

  addAdditionalItems(title, onClick, path = []) {
    injectItem(this.additionalItems, title, onClick, path);
  }

  show(x, y, args) {
    this.position = [x, y];
    this.args = args;
    this.additionalItems = [];
    if (this.args && this.args.additionalNodeItems) {
      traverse(this.args.additionalNodeItems, (name, func, path) =>
        this.addAdditionalItems(name, func, path)
      );
    }
    this.visible = true;
    this.render();
  }

  hide() {
    this.visible = false;
    this.render();
  }

  render() {
    ReactDOM.render(
      <ReactMenu
        {...this.props}
        args={this.args}
        items={this.items}
        additionalItems={this.additionalItems}
        position={this.position}
        visible={this.visible}
        onClose={() => this.hide()}
      />,
      this.el
    );
  }
}

export { Menu };
