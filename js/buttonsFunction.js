// import { inputValues } from './variables.js';
// export { resetValuesAndStates };
  
// // FUNCTION RESET ALL INPUT VALUES AND STATES
// function resetValuesAndStates() {
// 	let arrForReset = inputValues;
// 	console.log('arrForReset', arrForReset);
// 	console.log('inputValues', inputValues);
// 	for (let i = 0; i < arrForReset.length; i++) {
// 		if (arrForReset[i].parentElement.classList.contains('is-correct')) {
// 			arrForReset[i].parentElement.classList.remove('is-correct');
// 		}
		
// 		if (arrForReset[i].parentElement.classList.contains('is-wrong')) {
// 			arrForReset[i].parentElement.classList.remove('is-wrong');
// 			arrForReset[i].nextElementSibling.remove();
// 		}
		
// 		if (arrForReset[i].parentElement.classList.contains('is-empty')) {
// 			arrForReset[i].parentElement.classList.remove('is-empty');
// 			arrForReset[i].nextElementSibling.remove();
// 			arrForReset[i].previousElementSibling.remove();
// 		}
		
// 		arrForReset[i].value = '';
// 		arrForReset[i].disabled = false;
// 	}
// }