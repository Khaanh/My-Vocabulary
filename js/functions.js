export { getTranslates, showCountNewWords };
  
// FUNCTION TAKE CLOSEST ORIGIN WORD & RETURN TRANSLATE
function getTranslates(el) {
	let synonyms = el.parentElement.previousElementSibling.dataset.translate.split(',');
	return synonyms;
}

// FUNCTION SHOW COUNT OF NEW WORDS
function showCountNewWords(arr) {
	return (newWordCount.textContent = arr.length);
}