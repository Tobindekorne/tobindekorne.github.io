# Welcome to Math Tic-Tac-Toe

The goal of this game is to help classrooms full of students learn and practice math together by splitting into two teams and working together with their team to find answers.

The game starts by asking which team will go first: 'X' or 'O'. From there, the chosen team will choose a spot just like regular tic-tac-toe. Click the chosen square and that team will be given their question. They will need to work together to find the answer. Once they get an answer, click the question and it will reveal the answer. After going over the answer with the class, click the answer and the view will return to the board with the team's mark on the spot they chose. From there, play moves to the other team as usual.

# How to Start the Game

Starting up the game is easy: just download the code and open `tic-tac-toe.html` in a browser!

# How to customize

Questions and answers are stored in the `questions.js` file at this project root. This is the only file you need to edit! To enter new math problems, simply change the current questions for each round. Each round has 9 questions and 9 corresponding answers where the answer to each question is listed in the same position in the `answers` object as the question in the `questions` object

The formatting of the math problems is handled by [MathJax](https://www.mathjax.org/) which essentially has the same syntax as LaTeX. One small caveat is that whenever you would like to use a LaTeX-like command like `\sqrt{x}` you will need to precede it with a second backslash (a javascript escape character issue) like `\\sqrt{x}` instead.

## Changing the number of rounds in the game

The number of rounds in the game are defined in the `questions.js` file as well. This is an easy thing to change. If you would only like 1 round for the game, simply remove every array other than `1:` in the `questions` object making it look something like this:

```
const questions = {
    1: [
        `\\( f(x) = x - {7 \\over 5} \\)`,
        `\\( f(x) = x^2\\)`,
        `\\( f(x) = 2x^2 - 3x \\)`,
        `\\( f(x) = 3x^2 - {3 \\over 2} \\)`,
        `\\( f(x) = {1 \\over \\sqrt{x}} \\)`,
        `\\( f(x) = {1 \\over x} \\)`,
        `\\( f(x) = \\sqrt{2x - 3} \\)`,
        `\\( f(x) = \\sqrt{x} \\)`,
        `\\( f(x) = x \\sqrt{139} \\)`,
    ]
}
```

if you would like more rounds than the 2 provided in the base example given, simply add another array labled `3:` with 9 questions in the `questions` object and a matching set of 9 answers in the `answers` object.

# Improvement Ideas

Something that could be improved here is to allow for one team to steal the space from the other team upon an incorrect answer submission. For example, if team X picks the center square and submits an incorrect answer, then team O can try to provide an answer to steal the space allowing team X to pick another space and try again.

Another improvement would be to keep track of score across rounds to go for something like a best 2 out of 3 type of deal.
