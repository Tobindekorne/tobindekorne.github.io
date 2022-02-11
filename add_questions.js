let questionText,
    answerText = [];

const registerSaveButton = () => {
    $('.save-button').click((e) => saveData(e));
};

const saveData = (e) => {
    e.preventDefault();
    let questions = { 1: [] };
    let answers = { 1: [] };
    for (let i = 1; i < 10; i++) {
        const question = $(`.question.form${i}`).val();
        questions[1].push(question);
        const answer = $(`.answer.form${i}`).val();
        answers[1].push(answer);
    }

    window.localStorage.setItem('questions', JSON.stringify(questions));
    window.localStorage.setItem('answers', JSON.stringify(answers));
    tableData();
};

const tableData = () => {
    console.table(JSON.parse(window.localStorage.getItem('questions')));
    console.table(JSON.parse(window.localStorage.getItem('answers')));
};

const fillInputsWithLastSavedData = () => {
    try {
        const questions = JSON.parse(window.localStorage.getItem('questions'));
        const answers = JSON.parse(window.localStorage.getItem('answers'));
        Object.keys(questions).forEach((round) => {
            let i = 1;
            questions[round].forEach((question) => {
                $(`#question${i}`).val(question);
                i++;
            });
        });

        Object.keys(answers).forEach((round) => {
            let i = 1;
            answers[round].forEach((answer) => {
                $(`#answer${i}`).val(answer);
                i++;
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const registerNewRoundButton = () => {
    $('.new-round').click((e) => addNewRound(e));
};

const registerNavItems = () => {
    $('.nav-item').click((e) => activateNavItem(e));
};

const registerPreview = () => {
    $('.preview-button').click((e) => togglePreview2(e));
};

const togglePreview2 = (e) => {
    e.preventDefault();
    if ($(e.currentTarget).hasClass('preview-math')) {
        previewMode();
        $('.preview-button').removeClass('preview-math');
    } else {
        editMode();
        $('.preview-button').addClass('preview-math');
    }
};

const previewMode = () => {
    questionText = [];
    answerText = [];
    $('.question').replaceWith((elem) => {
        const p = document.createElement('p');
        $(p)
            .addClass($('.question')[elem].className)
            .text($('.question')[elem].value);
        questionText.push($('.question')[elem].value);
        return p;
    });

    $('.answer').replaceWith((elem) => {
        const p = document.createElement('p');
        $(p)
            .addClass($('.answer')[elem].className)
            .text($('.answer')[elem].value);
        answerText.push($('.answer')[elem].value);
        return p;
    });
    setIcon($('.preview-button'), './icons/pen-to-square-solid.svg');
    MathJax.typeset();
};

const editMode = () => {
    $('.question').replaceWith((elem) => {
        const input = document.createElement('input');
        const textElem = $('.question')[elem];
        $(input)
            .addClass($(textElem).attr('class'))
            .attr('type', 'text')
            .attr('placeholder', `Question ${elem + 1}`)
            .val(questionText[elem]);
        return input;
    });

    $('.answer').replaceWith((elem) => {
        const input = document.createElement('input');
        $(input)
            .addClass($('.answer')[elem].className)
            .attr('type', 'text')
            .attr('placeholder', `Answer ${elem + 1}`)
            .val(answerText[elem]);
        return input;
    });
    setIcon($('.preview-button'), './icons/eye-solid.svg');
    registerSaveButton();
    MathJax.typeset();
};

const togglePreview = (e) => {
    e.preventDefault();
    const button = $(e.currentTarget);
    if ($(button).hasClass('preview-math')) {
        $(button).removeClass('preview-math');
        setIcon(button, './icons/pen-to-square-solid.svg');
        // Get the value of the question and answer input and add them to p elements
        // then show those elements and hide the inputs and re-evaluate the MathJax
        const qAndA = $(button).parent().siblings();
        const question = qAndA[0].childNodes[0].nextElementSibling;
        const answer = qAndA[1].childNodes[0].nextElementSibling;
        const questionVal = $(question).val();
        const answerVal = $(answer).val();

        const questionP = document.createElement('p');
        $(questionP)
            .text(questionVal)
            .addClass('form-control text-light p-3 question-preview');
        $(questionP).insertBefore(question);
        $(question).hide();

        const answerP = document.createElement('p');
        $(answerP)
            .text(answerVal)
            .addClass('form-control text-light p-3 answer-preview');
        $(answerP).insertBefore(answer);
        $(answer).hide();

        MathJax.typeset();
    } else {
        $('.question-preview').remove();
        $('.question').show();
        $('.answer-preview').remove();
        $('.answer').show();
        $(button).addClass('preview-math');
        setIcon(button, './icons/eye-solid.svg');
    }
};

const setIcon = (button, icon) => {
    fetch(icon)
        .then((response) => response.text())
        .then((data) => {
            $(button).html(data);
        });
};

const activateNavItem = (e) => {
    e.preventDefault();
    $('.active').removeClass('active');
    $(e.target).addClass('active');
    const id = $(e.target).attr('id');
    $('form').hide();
    $(`#form-${id}`).show();
};

const addNewRound = (e) => {
    e.preventDefault();
    const form = createForm();
    $(form).insertBefore('#format-tips');
    createNewTab();
    $('form').hide();
    $(form).show();
    registerNavItems();
};

const createNewTab = () => {
    const li = document.createElement('li');
    $(li).addClass('nav-item');
    $('.active').removeClass('active');

    const numTabs = $('.nav-item').length;
    const a = document.createElement('a');
    $(a)
        .addClass(`nav-link active`)
        .attr('aria-current', 'page')
        .attr('href', '#')
        .attr('id', `round${numTabs}`)
        .text(`Round ${numTabs}`);
    $(li).append(a);

    $('.nav-tabs').append(li);
    slideDownNewRoundButton();
};

const slideDownNewRoundButton = () => {
    $('.new-round').remove();

    const li = document.createElement('li');
    $(li).addClass('nav-item new-round');
    const a = document.createElement('a');
    $(a).addClass('nav-link new-round').attr('href', '#').text(`+`);
    $(li).append(a);
    $('.nav-tabs').append(li);

    registerNewRoundButton();
};

const createQuestions = () => {
    let questionElements = [];
    const numRounds = Number(window.localStorage.getItem('rounds'));
    for (let i = 1; i < 10; i++) {
        const questionInput = document.createElement('input');
        $(questionInput)
            .addClass(
                `question-input form-control text-light p-3 form${
                    numRounds + 1
                }`
            )
            .attr('placeholder', `Question ${i}`)
            .attr('type', `text`);
        questionElements.push(questionInput);
    }
    return questionElements;
};

const createAnswers = () => {
    let answerElements = [];
    const numRounds = Number(window.localStorage.getItem('rounds'));
    for (let i = 1; i < 10; i++) {
        const answerInput = document.createElement('input');
        $(answerInput)
            .addClass(
                `answer-input form-control text-light p-3 form${numRounds + 1}`
            )
            .attr('placeholder', `Answer ${i}`)
            .attr('type', `text`);
        answerElements.push(answerInput);
    }
    return answerElements;
};

const createFormTitle = () => {
    const row = document.createElement('div');
    $(row).addClass('row g-3 align-items-center justify-content-center');
    const questionHeader = document.createElement('h1');
    $(questionHeader)
        .addClass('form-title col-5 text-center')
        .text('Questions');

    const answerHeader = document.createElement('h1');
    $(answerHeader).addClass('form-title col-5 text-center').text('Answers');

    $(row).append(questionHeader, answerHeader);
    return row;
};

const createForm = () => {
    const questions = createQuestions();
    const answers = createAnswers();
    const numTabs = $('.nav-item').length;

    const form = document.createElement('form');
    $(form)
        .addClass(`form text-light w-100`)
        .attr('id', `form-round${numTabs}`);

    const formTitle = createFormTitle();
    $(form).append(formTitle);

    for (let i = 0; i < questions.length; i++) {
        const row = document.createElement('div');
        $(row).addClass('row g-3 align-items-center justify-content-center');

        const questionDiv = document.createElement('div');
        $(questionDiv).addClass('col-5 p-2');
        $(questionDiv).append(questions[i]);

        const answerDiv = document.createElement('div');
        $(answerDiv).addClass('col-5 p-2');
        $(answerDiv).append(answers[i]);

        $(row).append(questionDiv);
        $(row).append(answerDiv);
        form.append(row);
    }

    const row = document.createElement('div');
    $(row).addClass('row g-3 align-items-center justify-content-center p-3');
    const button = document.createElement('button');
    $(button)
        .addClass(`save-button btn btn-primary col-4 p-3 mb-3 form${numTabs}`)
        .text('Save to Browser');
    $(row).append(button);
    $(form).append(row);

    return form;
};

$(document).ready(() => {
    try {
        const rounds = window.localStorage.getItem('rounds');
        if (!rounds) {
            window.localStorage.setItem('rounds', 1);
        }
    } catch (error) {
        console.log(error);
    }
    fillInputsWithLastSavedData();
    registerSaveButton();
    registerNewRoundButton();
    registerNavItems();
    registerPreview();
});

(function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    document.getElementsByTagName('head')[0].appendChild(script);
})();
