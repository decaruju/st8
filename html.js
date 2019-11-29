module.exports = new Proxy(
  {},
  {
    get(_target, elm) {
      return function(attrs, children) {
        if (!children) {
          children = attrs;
          attrs = {};
        }
        if (!Array.isArray(children)) {
          children = [children];
        }
        children = children.flat(Number.infinity);

        const compo = {
          attrs: attrs,
          children: children,
          render() {
            const childrenString = this.children.map((child) => typeof child === 'string' ? child : child.render()).join('');
            const attrString = Object.keys(this.attrs).map((attrKey) => ` ${attrKey}="${this.attrs[attrKey]}"`).join('');
            return `<${elm}${attrString}>${childrenString}</${elm}>`;
          },
        };

        children.forEach((child) => {
          child.parent = compo;
          child.change = function() { this.parent.change(); }
        });

        return compo;
      };
    },
  },
);
