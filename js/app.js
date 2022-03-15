const getElement = id => document.getElementById(id)


const checkInputField = id => {
    console.log(id, 'can not be empty');
}

// get all the input frield
const question = getElement('question');
const optionA = getElement('option-a');
const optionB = getElement('option-b');
const optionC = getElement('option-c');
const optionD = getElement('option-d');

// get the redio buttons
const radioA = getElement('a');
const radioB = getElement('b');
const radioC = getElement('c');
const radioD = getElement('d');

// get the buttons
const addBtn = getElement('add-btn');

let allQuestions = [];

addBtn.addEventListener('click', function () {
    const questionValue = question.value;
    const aOptionValue = optionA.value;
    const bOptionValue = optionB.value;
    const cOptionValue = optionC.value;
    const dOptionValue = optionD.value;
    const correctAns = getRadioValue();


    const singleQuestion = {
        name: questionValue,
        firstOption: aOptionValue,
        secondOption: bOptionValue,
        thirdOption: cOptionValue,
        fourthOption: dOptionValue,
        correctOption: correctAns

    }
    allQuestions.push(singleQuestion);
    displayPreview(allQuestions);
    // console.log(allQuestions);
})

const displayPreview = data => {
    const allQuestionsDiv = getElement('single-question');

    // reste all value
    question.value = '';
    optionA.value = '';
    optionB.value = '';
    optionC.value = '';
    optionD.value = '';
    allQuestionsDiv.textContent = '';
    let i = 1;
    data.forEach(question => {
        const div = document.createElement('div');
        div.classList.add('question-container');
        div.innerHTML = `
            <h5>${i++}. ${question.name}</h5>
            <table class="table table-borderless mb-0">
                <tr>
                    <td>A. ${question.firstOption}</td>
                    <td>B. ${question.secondOption}</td>
                </tr>
                <tr>
                    <td class ="fw-bold">C. ${question.thirdOption}</td>
                    <td>D. ${question.fourthOption}</td>
                </tr>
             </table>
             <button onclick= "modal('${question.name}')" type="button" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
             <button onclick= "deleteQuestion('${question.name}')" type="button" class="btn btn-danger mt-2">Delete</button>
        `;
        allQuestionsDiv.appendChild(div);
    });
}

const getRadioValue = () => {
    let correctAns = '';
    if (radioA.checked) {
        correctAns = radioA.value;
    }
    else if (radioB.checked) {
        correctAns = radioB.value;
    }
    else if (radioC.checked) {
        correctAns = radioC.value;
    }
    else if (radioD.checked) {
        correctAns = radioD.value;
    }
    else {
        alert("please select the corect answer");
        return;
    }
    return correctAns;
}

// get all the edit input frield
const editQuestion = getElement('edit-question');
const editOptionA = getElement('edit-option-a');
const editOptionB = getElement('edit-option-b');
const editOptionC = getElement('edit-option-c');
const editOptionD = getElement('edit-option-d');

// get the edit redio buttons
const editRadioA = getElement('edit-a');
const editRadioB = getElement('edit-b');
const editRadioC = getElement('edit-c');
const editRadioD = getElement('edit-d');

let targetId = '';

const modal = id => {
    const editAbleQuestion = allQuestions.filter(question => id === question.name);
    editQuestion.value = editAbleQuestion[0].name;
    editOptionA.value = editAbleQuestion[0].firstOption;
    editOptionB.value = editAbleQuestion[0].secondOption;
    editOptionC.value = editAbleQuestion[0].thirdOption;
    editOptionD.value = editAbleQuestion[0].fourthOption;

    targetId = id;
}


const edit = id => {
    const editedQuestion = editQuestion.value;
    const editedOptionA = editOptionA.value;
    const editedOptionB = editOptionB.value;
    const editedOptionC = editOptionC.value;
    const editedOptionD = editOptionD.value;

    allQuestions.forEach(question => {
        if (question.name === id) {
            question.name = editedQuestion;
            question.firstOption = editedOptionA;
            question.secondOption = editedOptionB;
            question.thirdOption = editedOptionC;
            question.fourthOption = editedOptionD;
        }
    });
    displayPreview(allQuestions);
}

const deleteQuestion = id => {
    allQuestions = allQuestions.filter(question => question.name !== id);
    displayPreview(allQuestions);
}

const saveChanges = getElement('save-changes');
saveChanges.addEventListener('click', function () {
    edit(targetId);
});