const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "nooutput");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

// function buildPage(){
//   fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
// }
createTeam();

function createTeam() {
  return inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "Build up your team",
      choices: [
        'Add Manager',
        'Add Engineer',
        'Add Intern',
        'No more employees to add']
    },

  ]).then(teamRole => {
    switch (teamRole.role) {
      case 'Add Manager':
        addManager();
        break;

      case 'Add Engineer':
        addEngineer();
        break;

      case 'Add Intern':
        addIntern();
        break;

      case 'No more employees to add':
        render(teamMembers);
        break;

      default:
        buildPage();
        break;
    }

  });
}

function addManager() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: answer => {
        if (answer !=="") {
            return true;
        }
        return "Please enter a name.";
      }
    },
    {
      type: "input",
      name: "id",
      message: "What is your id number?", 
      validate: answer => {
        const match = answer.match(
          /^[1-9]\d*$/
        )
        if (match) {
            return true;
        }
        return "Must be a valid number";
      }
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?",
      validate: answer => {
        const match = answer.match(
          /\S+@\S+\.\S+/
        )
        if (match) {
            return true;
        }
        return "Must be a valid email address";
      }
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is your office number?",
      validate: answer => {
        const match = answer.match(
          /^[1-9]\d*$/
        )
        if (match) {
            return true;
        }
        return "Must be a valid office number";
      }
    },
  ])

    .then(function(res) {
      const manager = new Manager(res.name, res.id, res.email, res.officeNumber);
      teamMembers.push(manager);
      console.log(teamMembers);
      
      createTeam();

    });

}

function addEngineer() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: answer => {
        if (answer !=="") {
            return true;
        }
        return "Please enter a name.";
      }
    },
    {
      type: "input",
      name: "id",
      message: "What is your id number?",
      validate: answer => {
        const match = answer.match(
          /^[1-9]\d*$/
        )
        if (match) {
            return true;
        }
        return "Must be a valid number";
      }
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?",
      validate: answer => {
        const match = answer.match(
          /\S+@\S+\.\S+/
        )
        if (match) {
            return true;
        }
        return "Must be a valid email address";
      }
    },
    {
      type: "input",
      name: "Github",
      message: "What is your Github username?",
      validate: answer => {
        if (answer !=="") {
          return true;
        }
        return "Please enter a username";
      }
    },
  ])

    .then(function(res) {
      const engineer = new Engineer(res.name, res.id, res.email, res.Github);
      teamMembers.push(engineer);
      console.log(teamMembers);
      
      createTeam();

    });
}

function addIntern() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: answer => {
        if (answer !=="") {
            return true;
        }
        return "Please enter a name.";
      }
    },
    {
      type: "input",
      name: "id",
      message: "What is your id number?",
      validate: answer => {
        const match = answer.match(
          /^[1-9]\d*$/
        )
        if (match) {
            return true;
        }
        return "Must be a valid number";
      }
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?",
      validate: answer => {
        const match = answer.match(
          /\S+@\S+\.\S+/
        )
        if (match) {
            return true;
        }
        return "Must be a valid email address";
      }
    },
    {
      type: "input",
      name: "school",
      message: "What educational institution are you attending?",
      validate: answer => {
        if (answer !=="") {
            return true;
        }
        return "Please enter a name.";
      }
    },
  ])

    .then(function(res) {
      const intern = new Intern(res.name, res.id, res.email, res.school);
      teamMembers.push(intern);
      console.log(teamMembers);
      
      createTeam();

    });

}


function buildPage() {
  fs.writeFileSync(outputPath, render(teamMembers), "utf8", function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("HTML generated!")
    })
  }
// module.exports = teamMembers;



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
