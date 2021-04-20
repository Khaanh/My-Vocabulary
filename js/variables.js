export {
  holderWords, correctAnswers, totalAnswers, btnCheck, btnReset, totalScore, titleH2, iconForHelp, wordsArray, btnMore, btnStart, btnRemove, newOrigin, newTranslate, newWordCount, removedWord, modal, modalControl, originValue, translateValue, newWords, filteredWords, translateArr, translateValueArr };
  
// SELECTORS
let holderWords = document.querySelector('#js-holderWords');
let correctAnswers = document.querySelector('#js-correctAnswers');
let totalAnswers = document.querySelector('#js-totalAnswers');
let btnCheck = document.querySelector('#js-btnCheck');
let btnReset = document.querySelector('#js-btnReset');
let totalScore = document.querySelector('.total-score');
let titleH2 = document.querySelector('.title-h2');
let btnMore = document.querySelector('#js-btnMore');
let btnStart = document.querySelector('#js-btnStart');
let btnRemove = document.querySelector('#js-btnRemoveLast');
let newOrigin = document.querySelector('#js-newOrigin');
let newTranslate = document.querySelector('#js-newTranslate');
let newWordCount = document.querySelector('#js-wordCound');
let removedWord = document.querySelector('#js-removedWord');
let modal = document.querySelector('#js-modal');
let modalControl = document.querySelectorAll('.modal-control');
// let inputValues; // SELECT ALL ".form-control"
// let inputValues = document.querySelectorAll('.form-control');
let iconForHelp;

// VALUES
let originValue = newOrigin.value;
let translateValue = newTranslate.value;

// ARR & OBJ
let wordsArray = [];
let newWords = [];
let filteredWords = [];
let translateArr = [];
let translateValueArr = [];