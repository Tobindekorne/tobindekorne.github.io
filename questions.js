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
    ],
    2: [
        `\\( f(x)= 6x^3 - 9x + 4 \\)`,
        `\\( y = 2t^4 - 10t^2 + 13t \\)`,
        `\\( g(z)=4z^7 - 3z^{-7} + 9z \\)`,
        `\\( h(y)=y^{-4} - 9y^{-3} + 8y^{-2} + 12 \\)`,
        `\\( y = \\sqrt{x} + 8\\sqrt[3]{x} - 2\\sqrt[4]{x}  \\)`,
        `\\( f(x) = 10\\sqrt[5]{x^3} - \\sqrt{x^7} + 6\\sqrt[3]{x^8} - 3 \\)`,
        `\\( f(t) = {4 \\over t} - {16 \\over t^3} + {8 \\over t^5}  \\)`,
        `\\( R(z) = {6 \\over \\sqrt{z^3}} + {18 \\over z^4} - {13 \\over z^10}  \\)`,
        `\\( z = x(3x^2 - 9) \\)`,
    ],
};

const answers = {
    1: [
        `\\( f'(x) = 1 \\)`,
        `\\( f'(x) = 2x \\)`,
        `\\( f'(x) = 4x - 3 \\)`,
        `\\( f'(x) = 6x \\)`,
        `\\( f'(x) = {-1 \\over 2x \\sqrt{x}} \\)`,
        `\\( f'(x) = {-1 \\over x^2} \\)`,
        `\\( f'(x) = {1 \\over \\sqrt{2x - 3}} \\)`,
        `\\( f'(x) = {1 \\over 2 \\sqrt{x}} \\)`,
        `\\( f'(x) = \\sqrt{139} \\)`,
    ],
    2: [
        `\\( f'(x) = 18x^2 - 9 \\)`,
        `\\( {dy \\over dt} = 8t^3 - 20t + 13 \\)`,
        `\\( g'(z)=28z^6 + 21z^{-8} + 9 \\)`,
        `\\( h'(y)=-4y^{-5} + 27y^{-4} - 16y^{-3} \\)`,
        `\\( {dy \\over dx} = {1 \\over 2}x^{-{1 \\over 2}} + {8 \\over 3}x^{-{2 \\over 3}} - {1 \\over 2}x^{-{3 \\over 4}} \\)`,
        `\\( f'(x) = 6x^{-{2 \\over 5}} - {7 \\over 2}x^{5 \\over 2} + 16x^{5 \\over 3} \\)`,
        `\\( f'(t) = -4t^{-2} + 12t^{-4} - 40t^{-6} \\)`,
        `\\( R'(z) = -9z^{-{5 \\over 2}} - {1 \\over 2}z^{-5} + {10 \\over 3}z^{-11} \\)`,
        `\\( {dz \\over dx} = 9x^2 - 9 \\)`,
    ],
};

const getQuestions = (roundNumber) => {
    const quest = JSON.parse(window.localStorage.getItem('questions'));
    if (quest && Object.keys(quest).length >= roundNumber)
        return quest[roundNumber];
    return questions[roundNumber];
};

const getAnswers = (roundNumber) => {
    const ans = JSON.parse(window.localStorage.getItem('answers'));
    if (ans && Object.keys(ans).length >= roundNumber) return ans[roundNumber];
    return answers[roundNumber];
};

const getNumberOfRounds = () => {
    return Object.keys(questions).length;
};

export { getQuestions, getAnswers, getNumberOfRounds };
