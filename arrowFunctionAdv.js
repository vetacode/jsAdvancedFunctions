//Arrow functions have no “this”
let group = {
  title: 'Our Group',
  students: ['John', 'Pete', 'Alice'],

  showList() {
    this.students.forEach(
      function (student) {
        console.log(this.title + ': ' + student);
      } //dont have this
    );
  },
};

group.showList();
