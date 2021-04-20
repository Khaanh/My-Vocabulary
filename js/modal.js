import { modalControl } from './variables.js';
export { removeErrorBorder };
  
// FUNCTION REMOVE ERROR-BORDER AFTER FOCUS
function removeErrorBorder() {

	for (let i = 0; i < modalControl.length; i++) {

		modalControl[i].onfocus = function () {
			if (modalControl[i].parentElement.classList.contains('is-error')) {
				modalControl[i].parentElement.classList.remove('is-error');
			}
		}
	}
} removeErrorBorder();
