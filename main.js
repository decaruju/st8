const statelessNode = function(name) {
  return [show(div({ class: 'hidden' }, name), false), show(div({ class: 'shown' }, name), true)];
};

function show(child, shown=true) {
  return shown ? child : '';
}

const statefulNode1 = function(name) {
  this.name = name;
    this.left = 0;
  setTimeout(() => {
    this.left += 1;
    this.change();
  }, 100);

  this.render = function() {
      return div({ class: 'stateful', style: `left: ${this.left}px` }, this.name).render();
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

const instance = div({ class: 'root' }, [statelessNode('Julien'), new statefulNode1('Julien'), new statefulNode2('poopoopoo')]);

instance.change = function() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(this.render());
};

instance.change();
