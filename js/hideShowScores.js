import { titleH2, totalScore, correctAnswers } from './variables.js';
export { hideScore, displayScore };

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
