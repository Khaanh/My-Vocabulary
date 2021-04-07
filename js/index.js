let listWords = document.querySelector('#js-listWords');
let correctAnswers = document.querySelector('#js-correctAnswers');
let totalAnswers = document.querySelector('#js-totalAnswers');
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
];

totalAnswers.textContent = `/ ${wordsArray.length}`;
correctAnswers.textContent = 0;

wordsArray.forEach((item, index) => {
	createList(item.origin, item.translate);
});

function createList(origin, translate) {
	let li = document.createElement('li');

	li.classList.add('list-items');
	li.innerHTML = `<span class="list-origin" data-translate="${translate}">${origin}</span>
            <div class="form-holder">
              <input type="text" class="form-control">
            </div>`;

	listWords.appendChild(li);
}
