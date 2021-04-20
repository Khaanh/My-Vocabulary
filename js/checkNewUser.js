import { titleH2, modal, totalAnswers, correctAnswers } from './variables.js';
import createList from './createList.js';

export default
  
  function check() {
  let wordsArray = [];
    document.addEventListener('DOMContentLoaded', () => {
      
      if (localStorage.getItem('newUser') === null) {
        titleH2.textContent = 'Good luck!';
      } else {
        titleH2.textContent = 'Welcome back!';
        
        modal.classList.add('is-hidden');
        wordsArray = JSON.parse(localStorage.saves);
        
        //CHECK AVAILABILITY ARRAY WORD BEFORE START
        totalAnswers.textContent = wordsArray.length > 0 ? `/${wordsArray.length}` : '/ 0';
        correctAnswers.textContent = 0;
        
        // CREATE A LIST FOR EACH OF WORD
        wordsArray.forEach((item) => {
          createList(item.origin, item.translate);
        });
      }
    });
}
check();