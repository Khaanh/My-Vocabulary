let holderWords = document.querySelector('#js-holderWords');
let correctAnswers = document.querySelector('#js-correctAnswers');
let totalAnswers = document.querySelector('#js-totalAnswers');
let btnCheck = document.querySelector('#js-btnCheck');
let inputValues; // SELECT ALL ".form-control"
let iconForHelp;
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
totalAnswers.textContent = (wordsArray.length > 0) ? `/${wordsArray.length}` : '/ 0';
correctAnswers.textContent = 0;


// CREATE A LIST FOR EACH OF WORD
wordsArray.forEach((item) => {
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

	// console.log(isEmptyAnswer);
	displayScore(isCorrectAnswer)
	addMarks(isCorrectAnswer, isWrongAnswer, isEmptyAnswer)
	iconForHelp = document.querySelectorAll('.icon-empty');
	showTooltTips(iconForHelp)
})


// FUNCTION TAKE CLOSEST ORIGIN WORD & RETURN TRANSLATE
function getClosestEl(el) {
	return el.parentElement.previousElementSibling.dataset.translate;
}


// FUNCTION ADD MARKS RELEVANT ANSWERS
function addMarks(correct, wrong, empty) {
	
	correct.forEach( item => {
		item.disabled = true;
		item.parentElement.classList.add('is-correct');
	})
	
	wrong.forEach( item => {
		item.disabled = true;
		item.parentElement.classList.add('is-wrong');
	})
	
	empty.forEach( item => {
		let iconEmpty = createIconEmpty();

		item.value = '[no answer]';
		item.disabled = true;
		item.parentElement.classList.add('is-empty');
		item.parentElement.appendChild(iconEmpty);
	})
}


// FUNCTION DISPLAY USER'S SCORES
function displayScore(scores) {
	let totalScore = document.querySelector('.total-score');
	let titleH2 = document.querySelector('.title-h2');

	correctAnswers.textContent = scores.length;
	totalScore.classList.remove('is-hidden');
	titleH2.classList.add('is-hidden');
}


// FUNCTION CREATE TAG "<i>" FOR APPEND ICON 
function createIconEmpty() {
	let emptyElem = document.createElement('i');
	emptyElem.classList.add('icon-empty')
	return emptyElem;
}


// FUNCTION SHOW TOOL TIPS
function showTooltTips(nodeList) {
	let arr = [...nodeList];
	
	for (let i = 0; i < arr.length; i++) {
		arr[i].addEventListener('mouseenter', function () {
			let toolTip = arr[i].parentElement.previousElementSibling.dataset.translate;
			console.log(toolTip);
		})
	}
}


