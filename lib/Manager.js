const Employee = require("./Employee");

// Child class 'Manager' calls constructor from Employee class
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email)
        this.officeNumber = officeNumber;
      }
}