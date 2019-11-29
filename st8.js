function element(elm) {
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
            const elem = document.createElement(elm);
            this.children.forEach((child) => {
                const node = typeof child === 'string' ? document.createTextNode(child) : child.render();
                elem.appendChild(node);
            });
            const attrString = Object.keys(this.attrs).forEach((attrKey) => {
                elem.setAttribute(attrKey, this.attrs[attrKey]);
            });
            return elem;
        },
    };

    children.forEach((child) => {
        child.parent = compo;
        child.change = function() { this.parent.change(); };
    });

    return compo;
    };
};

const div = element('div');
const span = element('div');
