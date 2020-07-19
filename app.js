const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

createTeam();

function createTeam() {
  return inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "Build your team",
      choices: [
        'Add Manager',
        'Add Engineer',
        'Add Intern'
        ]
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

      default:
        buildPage();
        break;
    }

  });
}

// Add manager
function addManager() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: answer => {
        if (answer !== "") {
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
      
      addMember();

    });

}

// Add engineer
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
      
      addMember();

    });
}

// Add intern
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
      
      addMember();

    });

}

// Ask user if they would like to add more team members
function addMember()  {
  return inquirer.prompt([
    {
      type: "list",
      name: "addMember",
      message: "Would you like to add another member to your team?",
      choices: ["yes please", "no thanks"]
    }

  ]).then(function(choice)  {
  if ("yes please" === choice.addMember) {
    createTeam();
  } else  {
    const output = render(teamMembers);
    fs.writeFileSync(outputPath, output, "utf-8", function(err) {
      console.log(err);
    })
    console.log("Successfully generated a webpage for your team!")
  };
});
};


module.exports = teamMembers;
