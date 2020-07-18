const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "app.js");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./htmlRenderer");

let teamArray = [];

function buildPage(){
  fs.writeFileSync(outputPath, render(teamArray), "utf-8")
}

function promptUser() {
    return inquirer.prompt([
      {
        type: "list",
        name: "role",
        message: "What is your role?", 
        choices: ['Manager', 'Engineer', 'Intern']
      },
   
    ]).then(function(teamRole) {
      switch(teamRole.role) {
        case 'Manager':
          addManager();
          break;

          case 'Engineer':
          addEngineer();
          break;

          case 'Intern':
          addIntern();
          break;

          default:
            buildPage();
      }

    });
  

function addManager() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is your id number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?"
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is your office number?"
    },
  ])

  .then(function(res) {
    const name = res.name;
    const id = res.id;
    const email = res.email;
    const officeNumber = res.officeNumber;
    const manager = new Manager(name, id, email, officeNumber);
    teamArray.push(manager);
    
    promptUser();
    
  })
    
}
  
function addEngineer() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is your id number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?"
    },
    {
      type: "input",
      name: "Github",
      message: "What is your Github username?"
    },
  ])

  .then(function(res) {
    const name = res.name;
    const id = res.id;
    const email = res.email;
    const github = res.Github;
    const engineer = new Engineer(name, id, email, github);
    teamArray.push(engineer);
    
    promptUser();

  })
}

function addIntern() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is your id number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?"
    },
    {
      type: "input",
      name: "school",
      message: "What educational institution are you attending?"
    },
  ])

  .then(function(res) {
    const name = res.name;
    const id = res.id;
    const email = res.email;
    const school = res.school;
    const intern = new Intern(name, id, email, school);
    teamArray.push(intern);

    promptUser();

  })
}}

promptUser();


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
