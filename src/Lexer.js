const { Token } = require("./Token")
class Lexer {
  constructor(inputText) {
    this.inputText = inputText;
    this.tokens = [];
    this.tokenTypes = [
      // TODO: lexer crashes when putting decimal. could fix regex?
      { type: "number", regex: /^\d+/ },
      { type: "binaryOperator", regex: /^[+\-*/]/ },
      { type: "whitespace", regex: /^\s+/ },
    ];
  };

  tokenize() {
    let currentIndex = 0;
    while (currentIndex < this.inputText.length) {
      let matchedToken = null;

      for (const tokenType of this.tokenTypes) {
        const regexResult = this.inputText
          .slice(currentIndex)
          .match(tokenType.regex);

        if (regexResult && regexResult.index === 0) {
          const value = regexResult[0];
          const type = tokenType.type;
          // handle 'let' keyword
          if (type === "unquotedString" && value === "let") {
            this.tokens.push(new Token("letKeyword", value));
          } else {
            this.tokens.push(new Token(type, value));
          }
          currentIndex += value.length;
          matchedToken = type;
          break;
        }
      }

      if (!matchedToken) {
        console.log(`Unrecognized token: ${this.inputText.slice(currentIndex)}`);
        return;
      }
      
    }
    console.log(this.tokens);
    return this.tokens;
  }
}

exports.Lexer = Lexer;
