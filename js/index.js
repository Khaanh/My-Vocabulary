let holderWords = document.querySelector('#js-holderWords');
let correctAnswers = document.querySelector('#js-correctAnswers');
let totalAnswers = document.querySelector('#js-totalAnswers');
let btnCheck = document.querySelector('#js-btnCheck');
let inputValues; // SELECT ALL ".form-control"
// let isCorrectResults = [];

//VOCABULARY LIST WORD
let wordsArray = [
	{
		origin: 'Audacious',
		translate: 'дерзкий',
	},
	{
		origin: 'tick off',
		translate: 'поставить галочку',
	},
	{
		origin: 'likely',
		translate: 'скорее всего',
	},
	{
		origin: 'lack',
		translate: 'отсутствие',
	},
	{
		origin: 'solitary',
		translate: 'уединенный',
	},
	{
		origin: 'obstacles',
		translate: 'препятствия',
	},
	{
		origin: 'overcome',
		translate: 'преодолевать'
	}
];


//CHECK AVAILABILITY ARRAY WORD BEFORE START
totalAnswers.textContent = (wordsArray.length > 0) ? `/ ${wordsArray.length}` : '/ 0';
correctAnswers.textContent = 0;


// CREATE A LIST FOR EACH OF WORD
wordsArray.forEach((item, index) => {
	createList(item.origin, item.translate);
});


// FUNCTION TO CREATE LIST WITH TWO PARAMS
function createList(origin, translate) {
	let li = document.createElement('label');
	
	li.classList.add('list-items');
	li.innerHTML = `<span class="list-origin" data-translate="${translate}">${origin}</span>
	<div class="form-holder">
	<input type="text" class="form-control">
	</div>`;
	
	holderWords.appendChild(li);
	
	// AFTER CREATED ALL LIST, SELECT IT TO GET VALUES
	inputValues = document.querySelectorAll('.form-control');
}


// BUTTON TO CHECK VALUES
btnCheck.addEventListener('click', () => {
	let arrValues = [...inputValues];
	let isCorrectAnswer = [];
	let isWrongAnswer = [];
	let isEmptyAnswer = [];
	
	for (let i = 0; i < arrValues.length; i++) {
		if ( getClosestEl(arrValues[i]) === arrValues[i].value.trim().toLowerCase() ) {
			isCorrectAnswer.push(arrValues[i])
		} else if (arrValues[i].value.trim() == '' || arrValues[i].value == '[no answer]') {
			isEmptyAnswer.push(arrValues[i])
		} else {
			isWrongAnswer.push(arrValues[i])
		}
	}

	console.log(isEmptyAnswer);
	
	addMarks(isCorrectAnswer, isWrongAnswer, isEmptyAnswer)
})


// FUNCTION TAKE CLOSEST ORIGIN WORD & RETURN TRANSLATE
function getClosestEl(el) {
	return el.parentElement.previousElementSibling.dataset.translate;
}

// FUNCTION ADD MARKS RELEVANT ANSWERS
function addMarks(correct, wrong, empty) {

	correct.forEach(item => {
		item.disabled = true;
		item.parentElement.classList.add('is-correct');
	})
	
	wrong.forEach(item => {
		item.disabled = true;
		item.parentElement.classList.add('is-wrong');
	})
	
	empty.forEach(item => {
		item.value = '[no answer]';
		item.disabled = true;
		item.parentElement.classList.add('is-empty');
	})
}
