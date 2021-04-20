import { holderWords } from './variables.js';
import { inputValues } from './index.js';

export default

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
