const readline = require("readline");
const { Lexer } = require("./Lexer");

async function getStdin() {  
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    return new Promise((resolve) => {
        rl.question("> ", (input) => {
          rl.close();
          resolve(input);
        });
      });
}

async function main() {
    let showTokens = false;
    let showAst = false;
    let variables = {};
    while (true) {
        const input = await getStdin();
        console.log(input)
        if (input === "#quit") {
            console.log("Exiting");
            break;
          } else if (input === "#clear") {
            console.clear();
            process.stdout.write("> ");
            continue;
          } else if (input === "#tokens") {
            showTokens = !showTokens;
            console.log(showTokens ? "Showing tokens" : "Hiding tokens");
            continue;
          } else if (input === "#ast") {
            showAst = !showAst;
            console.log(showAst ? "Showing AST" : "Hiding AST");
            continue;
          } else if (input === "") {
            continue;
          } // add more commands
      
          let lexer = new Lexer(input);
          lexer.tokenize()
          }
        }
main()