let holderWords = document.querySelector('#js-holderWords');
let correctAnswers = document.querySelector('#js-correctAnswers');
let totalAnswers = document.querySelector('#js-totalAnswers');
let btnCheck = document.querySelector('#js-btnCheck');
let inputValues; // SELECT ALL ".form-control"
let result; // [] COLLECT ALL CORRECT ANSWERS

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

	result = arrValues.filter(itemVal => {
		return getClosestEl(itemVal) === itemVal.value.trim().toLowerCase();
	})

})


// FUNCTION TAKE CLOSEST ORIGIN WORD & RETURN TRANSLATE
function getClosestEl(el) {
	return el.parentElement.previousElementSibling.dataset.translate;
}
