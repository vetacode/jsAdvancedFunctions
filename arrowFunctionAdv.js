//Normal functions have “this”
let group = {
  title: 'Our Group',
  students: ['John', 'Pete', 'Alice'],

  showList() {
    this.students.forEach(
      function (student) {
        console.log(this.title + ': ' + student);
      } //normal function have this, so the title returned undefined
    );
  },
};

group.showList();

//Arrow functions have no “this”
let group2 = {
  title: 'Our Group',
  students: ['John', 'Pete', 'Alice'],

  showList() {
    this.students.forEach(
      (student) => {
        console.log(this.title + ': ' + student);
      } //arrow function have no this inside showList(), it will use this from outer env
    );
  },
};

group2.showList();
