/**
* 11/04/21
* TODO : Add button reset; +
* TODO : Modal with new words; +
* TODO : CHECK FOR AN EXISTING WORD BEFORE ADD TO ARR. +
* TODO : CHECK FOR AN EMPTY STRING. +
* TODO : SAVE TO LOCAL STORAGE. +
* ? MAKE REPLACE INSTEAD 2 OR MORE SPACES TO 1 SPACE.
*
* 18/04/21
* TODO : CHECK NEW USERS; +
* TODO : SAVE TO LOCAL STORAGE; +
* TODO : UI/UX ALL BUTTONS; +
* TODO : SPLIT TO MODULES; +
* TODO : REMOVE RED BORDER AFTER FOCUS; +
* TODO : SAVE == "ENTER";
* TODO : REMOVE == "DELETE";
* TODO : LETS START == "DOUBLE ENTER" || "SHIFT ENTER";
* TODO : TOOLTIPS TO BUTTONS;
* TODO : BUTTON CREATE NEW LIST;
* TODO : TOPIC LIST;
* TODO : RANDOM SORT;
* TODO : SAVE SCORES AND COMPARE WITH PREVIOUS;
* ? : PERSONAL WELCOME;
*/

export {inputValues}
import { modal, btnAdd, btnCheck, btnReset, holderWords, totalAnswers, btnStart, btnRemove, newOrigin, newTranslate, newWordCount, removedWord,} from './variables.js';
import { hideScore, displayScore } from './hideShowScores.js';
import { removeErrorBorder } from './modal.js';
import showTooltTips from './showToolTips.js';
import { resetValuesAndStates, addMarks, showCorrectAnswers } from './buttonsFunction.js';
import {getTranslates, showCountNewWords} from './functions.js';


let inputValues; // SELECT ALL ".form-control"
let iconForHelp;

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

// VALUES
let originValue = newOrigin.value;
let translateValue = newTranslate.value;

// ARR & OBJ
let newWords = [];
let translateArr = [];
let translateValueArr = [];

// BUTTON ADD MORE NEW WORDS & TRANSLATES
btnAdd.addEventListener('click', addNewWord);

// BUTTON LETS START
btnStart.addEventListener('click', letsStart);

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
function letsStart() {
	
	// SET WORDS LIST TO LOCAL STORAGE
	localStorage.setItem('saves', JSON.stringify(newWords));
	// SET FLAG FOR FIRST VISIT
	localStorage.setItem('newUser', false)
	
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
