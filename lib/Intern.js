const Employee = require("./Employee");

// Child class 'Intern' calls constructor from Employee class
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email)
        this.school = school;
      }
}

