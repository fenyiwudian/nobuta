class Creature {
  constructor(data) {
    this.name = data.name || 'no name';
    this.age = data.age || 0;
  }

  static hehe() {
    console.log('hehe creature');
  }

  showStatus() {
    console.log(`name: ${this.name}, age: ${this.age}`);
  }

  grow() {
    this.age++;
  }

  hello() {
    console.log('hello');
  }
}


class Animal extends Creature {
  constructor(data) {
    super(data);
    this.moveSpeed = data.moveSpeed || 10;
  }
  static hehe() {
    super.hehe();
    console.log('hehe animal');
  }
  static heheAgain() {
    this.hehe();
    super.hehe();
  }

  showStatus() {
    super.showStatus();
    super.hello();
    console.log(`move speed: ${this.moveSpeed}`);
  }

  mix() {
    super.hello();
    console.log('mix animal');
    Animal.hehe();
  }
}

const animal = new Animal({});
animal.showStatus();
animal.grow();
animal.showStatus();

Animal.hehe();
Animal.heheAgain();
animal.mix();