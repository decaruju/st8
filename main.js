
const { html, body, div, span } = require('./html');

const statelessNode = function(name) {
  return [show(div({ class: 'hidden' }, name), false), show(div({ class: 'shown' }, name), true)];
};

function show(child, shown=true) {
  return shown ? child : '';
}

const statefulNode1 = function(name) {
  this.name = name;
  setTimeout(() => {
    this.name = 'poopoo';
    this.change();
  }, 1000);

  this.render = function() {
    return div({ class: 'stateful' }, this.name).render();
  };
};

const statefulNode2 = function(name) {
  this.name = name;
  setTimeout(() => {
    this.name = 'PAG';
  }, 100);

  this.render = function() {
    return div({ class: 'stateful' }, this.name).render();
  };
};

const instance = html(body(div({ class: 'root' }, [statelessNode('Julien'), new statefulNode1('Julien'), new statefulNode2('poopoopoo')])));

console.log(instance.render());
instance.change = function() { console.log(this.render()); };
