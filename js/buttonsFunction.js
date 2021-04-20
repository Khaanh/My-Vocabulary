import { inputValues } from './index.js';
export { resetValuesAndStates, addMarks, showCorrectAnswers };
  
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

// FUNCTION MANIPULATE WITH PARENT ELEM
function manipulateParentElem(self, icon, translate) {
	self.parentElement.classList.add('is-empty');
	self.parentElement.appendChild(icon);
	self.parentElement.prepend(translate);
}

// FUNCTION SHOW CORRECT ANSWERS
function showCorrectAnswers(arr) {
	arr.forEach((item) => {
		item.parentElement.appendChild(createTagForCorrectAnswers(item));
	});
}

// FUNCTION CREATE TAG "<span>" FOR CORRECT ANSWERS
function createTagForCorrectAnswers(value) {
	let showAnswer = document.createElement('span');
	showAnswer.classList.add('show-answer');
	
	showAnswer.textContent = value.parentElement.previousElementSibling.dataset.translate;
	return showAnswer;
}