const Employee = require("./Employee");

// Child class 'Engineer' calls constructor from Employee class
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = github;
      }
}