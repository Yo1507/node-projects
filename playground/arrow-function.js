var square = x => x * x;
console.log(square(4));

var user = {
    name: 'Yo',
    sayHiAlt() {
        console.log(arguments);
        console.log(`Hi! I'm ${this.name}`);
    }
};

user.sayHiAlt(1, 2, 3);