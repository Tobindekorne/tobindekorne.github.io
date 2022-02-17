let questionText,
    answerText = [];

const registerFormatButton = () => {
    $('.format-btn').click((e) => scrollToTips(e));
};

const scrollToTips = (e) => {
    document.getElementById('format-tips').scrollIntoView();
};

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
    $('.preview-button').click((e) => togglePreview(e));
};

const togglePreview = (e) => {
    e.preventDefault();
    if ($(e.currentTarget).hasClass('preview-math')) {
        previewMode(e.currentTarget);
        $('.preview-button').removeClass('preview-math');
    } else {
        editMode(e.currentTarget);
        $('.preview-button').addClass('preview-math');
    }
};

const previewMode = (button) => {
    const form = $(button).parent().parent().parent();
    questionText = [];
    answerText = [];
    form.find('.question').replaceWith((elem) => {
        const p = document.createElement('p');
        $(p)
            .addClass($('.question')[elem].className)
            .text($('.question')[elem].value);
        questionText.push($('.question')[elem].value);
        return p;
    });

    form.find('.answer').replaceWith((elem) => {
        const p = document.createElement('p');
        $(p)
            .addClass($('.answer')[elem].className)
            .text($('.answer')[elem].value);
        answerText.push($('.answer')[elem].value);
        return p;
    });
    $('.preview-button>i').removeClass('fa-eye').addClass('fa-edit');
    MathJax.typeset();
};

const editMode = (button) => {
    const form = $(button).parent().parent().parent();
    form.find('.question').replaceWith((elem) => {
        const input = document.createElement('input');
        const textElem = $('.question')[elem];
        $(input)
            .addClass($(textElem).attr('class'))
            .attr('type', 'text')
            .attr('placeholder', `Question ${elem + 1}`)
            .val(questionText[elem]);
        return input;
    });

    form.find('.answer').replaceWith((elem) => {
        const input = document.createElement('input');
        $(input)
            .addClass($('.answer')[elem].className)
            .attr('type', 'text')
            .attr('placeholder', `Answer ${elem + 1}`)
            .val(answerText[elem]);
        return input;
    });
    $('.preview-button>i').removeClass('fa-edit').addClass('fa-eye');
    registerSaveButton();
    MathJax.typeset();
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

    const numTabs = $('.nav-tabs>.nav-item').length;
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
    const numTabs = $('.nav-tabs>.nav-item').length;

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
    $(row).addClass(
        'd-flex flex-row g-3 align-items-center justify-content-between p-3'
    );
    const button = document.createElement('button');
    $(button)
        .addClass(`save-button btn btn-primary col-3 p-3 mb-3 form${numTabs}`)
        .text('Save to Browser');
    $(row).append(button);

    const rightButtons = document.createElement('div');
    $(rightButtons).addClass(
        'd-flex flex-row g-3 justify-content-end col-6 p-2'
    );
    const formattingTips = document.createElement('button');
    $(formattingTips)
        .addClass('btn btn-primary col-3 p-3 format-btn')
        .attr('type', 'button')
        .attr('data-bs-toggle', 'collapse')
        .attr('data-bs-target', '#tips')
        .attr('aria-expanded', 'false')
        .attr('aria-controls', 'tips')
        .text('Formatting Tips');
    const previewButton = document.createElement('button');
    $(previewButton).addClass('btn btn-primary preview-button preview-math');
    $('.preview-button>i').addClass('fa-eye');

    $(rightButtons).append(formattingTips, previewButton);
    $(row).append(rightButtons);
    registerPreview();

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
    registerFormatButton();
});

(function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    document.getElementsByTagName('head')[0].appendChild(script);
})();
