getQuestions();
getAnswers();

const questions = JSON.parse(localStorage.getItem('questions'));
const answers = JSON.parse(localStorage.getItem('answers'));
const input = document.querySelector('.question-text');
const button = document.querySelector('.submit');
const answersContainer = document.querySelector('.answers-container');

button.addEventListener('click', () => {
    const regex = new RegExp(input.value.toLowerCase(), 'g');
    console.log(regex);
    answersContainer.innerHTML = '';

    if(input.value.length >= 3) {
        for ( let key in questions ) {
            if( questions[key].text.match(regex)){
                answersContainer.innerHTML += '<hr>' + `<p style="color: blue;">${questions[key].text}<\p>`+ '<hr>';
                for(let answ of answers[key].split(',')) {
                    answersContainer.innerHTML += `<p style="color: green;">${questions[key].a[answ]}<\p>`;
                }
            }
        }   
    }
    
})

// ----------------------------------------- //
async function getQuestions() {
    try {
        const response = await fetch('./QuestionsObj.json');
        if(response.ok){
            const questions = await response.json();
            store(questions);
        }
        throw new Error('Load failed!');
    } catch(error) { console.log(error); }
      
}

async function getAnswers() {
    try {
        const response = await fetch('./answersObj.json');
        if(response.ok){
            const answers = await response.json();
            store(answers, 'answers');
        }
        throw new Error('Load failed!');
    } catch(error) { console.log(error); }
      
}


function store(param, name = 'questions'){
    localStorage.setItem(name, JSON.stringify(param));
}


