/**
 * 11/04/21
 * TODO : Add button reset; +
 * TODO : Modal with new words; +
 *
 * 18/04/21
 * TODO : CHECK NEW USERS;
 * TODO : SAVE TO LOCAL STORAGE;
 * TODO : UI/UX ALL BUTTONS; +
 * TODO : SPLIT TO MODULES;
 * TODO : REMOVE RED BORDER AFTER FOCUS;
 * TODO : SAVE == "ENTER";
 * TODO : REMOVE == "DELETE";
 */

let holderWords = document.querySelector('#js-holderWords');
let correctAnswers = document.querySelector('#js-correctAnswers');
let totalAnswers = document.querySelector('#js-totalAnswers');
let btnCheck = document.querySelector('#js-btnCheck');
let btnReset = document.querySelector('#js-btnReset');
let totalScore = document.querySelector('.total-score');
let titleH2 = document.querySelector('.title-h2');
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
		translate: 'преодолевать',
	},
];

//CHECK AVAILABILITY ARRAY WORD BEFORE START
totalAnswers.textContent = wordsArray.length > 0 ? `/${wordsArray.length}` : '/ 0';
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
btnCheck.addEventListener('click', function () {
	let arrValues = [...inputValues];
	let isCorrectAnswer = [];
	let isWrongAnswer = [];
	let isEmptyAnswer = [];

	for (let i = 0; i < arrValues.length; i++) {
		let currentItem = arrValues[i].value.trim().toLowerCase();

		if (getTranslates(arrValues[i]) === currentItem || getTranslates(arrValues[i]).includes(currentItem)) {
			isCorrectAnswer.push(arrValues[i]);
		} else if (arrValues[i].value.trim() == '' || arrValues[i].value == '[no answer]') {
			isEmptyAnswer.push(arrValues[i]);
		} else {
			isWrongAnswer.push(arrValues[i]);
		}
	}

	console.log('Result: ', getTranslates(arrValues[arrValues.length - 1]).includes('zz'));
	console.log('Result: ', getTranslates(arrValues[arrValues.length - 1]));

	this.disabled = true;
	displayScore(isCorrectAnswer);
	addMarks(isCorrectAnswer, isWrongAnswer, isEmptyAnswer);
	iconForHelp = document.querySelectorAll('.icon-empty');
	showTooltTips(iconForHelp);
	showCorrectAnswers(isWrongAnswer);

	totalAnswers.textContent = inputValues.length > 0 ? `/${inputValues.length}` : '/ 0';
});

// BUTTON RESET ALL
btnReset.addEventListener('click', () => {
	btnCheck.disabled = false;
	resetValuesAndStates();
	hideScore();
});

// FUNCTION RESET ALL INPUT VALUES AND STATES
function resetValuesAndStates() {
	let arrForReset = inputValues;

	for (let i = 0; i < arrForReset.length; i++) {
		if (arrForReset[i].parentElement.classList.contains('is-correct')) {
			arrForReset[i].parentElement.classList.remove('is-correct');
		}

		if (arrForReset[i].parentElement.classList.contains('is-wrong')) {
			arrForReset[i].parentElement.classList.remove('is-wrong');
			arrForReset[i].nextElementSibling.remove();
		}

		if (arrForReset[i].parentElement.classList.contains('is-empty')) {
			arrForReset[i].parentElement.classList.remove('is-empty');
			arrForReset[i].nextElementSibling.remove();
			arrForReset[i].previousElementSibling.remove();
		}

		arrForReset[i].value = '';
		arrForReset[i].disabled = false;
	}
}

// FUNCTION TAKE CLOSEST ORIGIN WORD & RETURN TRANSLATE
function getTranslates(el) {
	let synonyms = el.parentElement.previousElementSibling.dataset.translate.split(',');
	return synonyms;
}

// FUNCTION ADD MARKS RELEVANT ANSWERS
function addMarks(correct, wrong, empty) {
	correct.forEach((item) => {
		item.disabled = true;
		item.parentElement.classList.add('is-correct');
	});

	wrong.forEach((item) => {
		item.disabled = true;
		item.parentElement.classList.add('is-wrong');
	});

	empty.forEach((item) => {
		let iconEmpty = createIconEmpty();
		let translates = createTagTranslate.call(item);

		item.value = '[no answer]';
		item.disabled = true;
		manipulateParentElem(item, iconEmpty, translates);
	});
}

// FUNCTION HIDE USER'S SCORES
function hideScore() {
	totalScore.classList.add('is-hidden');
	titleH2.classList.remove('is-hidden');
}

// FUNCTION DISPLAY USER'S SCORES
function displayScore(scores) {
	correctAnswers.textContent = scores.length;
	totalScore.classList.remove('is-hidden');
	titleH2.classList.add('is-hidden');
}

// FUNCTION CREATE TAG "<i>" FOR APPEND ICON
function createIconEmpty() {
	let emptyElem = document.createElement('i');
	emptyElem.classList.add('icon-empty');
	return emptyElem;
}

// FUNCTION CREATE TAG "<span>" FOR INNERTEXT TRANSLATES TO TOOLTIPS
function createTagTranslate() {
	let tagTranslate = document.createElement('span');
	tagTranslate.classList.add('tool-tip');
	tagTranslate.innerHTML = this.parentElement.previousElementSibling.dataset.translate;
	return tagTranslate;
}

// FUNCTION CREATE TAG "<span>" FOR CORRECT ANSWERS
function createTagForCorrectAnswers(value) {
	let showAnswer = document.createElement('span');
	showAnswer.classList.add('show-answer');

	showAnswer.textContent = value.parentElement.previousElementSibling.dataset.translate;
	return showAnswer;
}

// FUNCTION SHOW TOOL TIPS
function showTooltTips(nodeList) {
	let arr = [...nodeList];
	let span = document.createElement('span');
	span.classList.add('tool-tip');

	for (let i = 0; i < arr.length; i++) {
		arr[i].addEventListener('mouseenter', function () {
			arr[i].previousElementSibling.previousElementSibling.style.cssText = `
			opacity: 1;
			right: -16px;
			`;
		});

		arr[i].addEventListener('mouseleave', function () {
			arr[i].previousElementSibling.previousElementSibling.style.cssText = `
			opacity: 0;
			right: -36px;
			`;
		});
	}
}

// FUNCTION SHOW CORRECT ANSWERS
function showCorrectAnswers(arr) {
	arr.forEach((item) => {
		item.parentElement.appendChild(createTagForCorrectAnswers(item));
	});
}

// FUNCTION MANIPULATE WITH PARENT ELEM
function manipulateParentElem(self, icon, translate) {
	self.parentElement.classList.add('is-empty');
	self.parentElement.appendChild(icon);
	self.parentElement.prepend(translate);
}

// ======================================================================================
/**
 * TODO : CHECK FOR AN EXISTING WORD BEFORE ADD TO ARR. +
 * TODO : CHECK FOR AN EMPTY STRING. +
 * TODO : SAVE TO LOCAL STORAGE.
 * ? MAKE REPLACE INSTEAD 2 OR MORE SPACES TO 1 SPACE.
 */
// SELECTORS
let btnMore = document.querySelector('#js-btnMore');
let btnStart = document.querySelector('#js-btnStart');
let btnRemove = document.querySelector('#js-btnRemoveLast');
let newOrigin = document.querySelector('#js-newOrigin');
let newTranslate = document.querySelector('#js-newTranslate');
let newWordCount = document.querySelector('#js-wordCound');
let removedWord = document.querySelector('#js-removedWord');
let modal = document.querySelector('#js-modal');

// VALUES
let originValue = newOrigin.value;
let translateValue = newTranslate.value;

// ARR & OBJ
let newWords = [];
let filteredWords = [];
let translateArr = [];
let translateValueArr = [];

// BUTTON ADD MORE NEW WORDS & TRANSLATES
btnMore.addEventListener('click', addNewWord);

// BUTTON LETS START
btnStart.addEventListener('click', letStart);

// BUTTON REMOVE LAST WORD
btnRemove.addEventListener('click', removeLast);

// FUNCTION REMOVE LAST WORD FROM LIST
function removeLast() {
	let lastWord = newWords.splice([newWords.length - 1], 1);

	removedWord.textContent = lastWord[0].origin;
	removedWord.classList.add('is-animate');

	removedWord.addEventListener('animationend', () => {
		removedWord.classList.remove('is-animate');
	});

	showCountNewWords(newWords);

	if (!newWords.length) {
		btnStart.disabled = true;
		btnRemove.disabled = true;
	}

	console.log('lastWord', lastWord[0].origin);
	console.log(newWords);
}

// FUNCTION ADD NEW WORDS WITH TRANSLATES TO ARR
function addNewWord() {
	originValue = newOrigin.value.trim();
	translateValue = newTranslate.value.trim();
	translateArr = translateValue.split(',');

	translateValueArr = translateArr.map((item) => {
		return item.trim().toLowerCase();
	});

	// CHECK FOR AN EXISTING BEFORE ADD
	let word = newWords.find((item) => {
		return originValue == item.origin;
	});

	if (!word && originValue != '' && translateValue != '') {
		newWords.push({
			origin: originValue,
			translate: translateValueArr,
		});

		newOrigin.parentElement.classList.add('is-added');
		newTranslate.parentElement.classList.add('is-added');

		setTimeout(() => {
			newOrigin.parentElement.classList.remove('is-added');
			newTranslate.parentElement.classList.remove('is-added');
		}, 500);

		newOrigin.value = '';
		newTranslate.value = '';

		newOrigin.parentElement.classList.remove('is-error');
		newTranslate.parentElement.classList.remove('is-error');
	} else {
		newOrigin.parentElement.classList.add('is-error');
		newTranslate.parentElement.classList.add('is-error');
	}

	console.log('New Arr: ', newWords);

	if (newWords.length) {
		btnStart.disabled = false;
		btnRemove.disabled = false;
	}

	showCountNewWords(newWords);
}

// FUNCTION CLOSE MODAL & START TEST
function letStart() {
	newWords.forEach((item) => {
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

	modal.classList.add('go-up');
	modal.addEventListener('animationend', () => {
		modal.classList.add('is-hidden');
	});
}

// FUNCTION SHOW COUNT OF NEW WORDS
function showCountNewWords(arr) {
	return (newWordCount.textContent = arr.length);
}

// ======================================================================================
/**
 * 19/24/21
 */

function checkNewUsers() {
	document.addEventListener('DOMContentLoaded', () => {
		let newUser = localStorage.getItem('newUser');

		if (newUser) {
			modal.classList.add('is-hidden');
		} else {
			localStorage.setItem('newUser', true);
		}
	});
}
checkNewUsers();
