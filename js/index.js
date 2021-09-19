const url = "http://localhost:3000/posts";
let btnTest = document.querySelector("#btn-test");
let btnGet = document.querySelector("#btn-get");

btnTest.addEventListener("click", (e) => {
  console.log("adasd");
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(newWords),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((value) => {
      console.log("value: ", value);
    });
});

btnGet.addEventListener("click", async (e) => {
  let request = await fetch(url);
  let resp = await request.json();

  console.log("resp: ", resp);
});

/**
 * 11/04/21
 * TODO : Add button reset; +
 * TODO : Modal with new words; +
 *
 * 18/04/21
 * TODO : CHECK NEW USERS; +
 * TODO : SAVE TO LOCAL STORAGE; +
 * TODO : UI/UX ALL BUTTONS; +
 * TODO : SPLIT TO MODULES;
 * TODO : REMOVE RED BORDER AFTER FOCUS; +
 * TODO : SAVE == "ENTER"; +
 * TODO : REMOVE == "DELETE"; +
 * TODO : LETS START == "DOUBLE ENTER" || "SHIFT ENTER"; +
 * TODO : TOOLTIPS TO BUTTONS; +
 * TODO : BUTTON CREATE NEW LIST;
 * TODO : TOPIC LIST;
 * TODO : RANDOM SORT;
 * TODO : SAVE SCORES AND COMPARE WITH PREVIOUS;
 * ? : PERSONAL WELCOME;
 */

/**
 * 24/04/21
 * TODO : SPLIT TO MODULES;
 * TODO : BUTTON CREATE NEW LIST;
 * TODO : TOPIC LIST
 * 				- MORE/INFO/DETAILS (DATE, DEADLINE, DESCR, STATISTIC);
 *        - ADD MORE WORDS / REMOVE WORDS;
 * 				- DIFFERENT BORDER-COLOR TO CARDS;
 * TODO : RANDOM SORT;
 * TODO : SAVE SCORES AND COMPARE WITH PREVIOUS;
 * TODO : FOCUS ON FIRST INPUT AFTER ADDED; +
 * TODO : RESET ALL BUTTON;
 * TODO : MORE INFO (DATA);
 */

let holderWords = document.querySelector("#js-holderWords");
let correctAnswers = document.querySelector("#js-correctAnswers");
let totalAnswers = document.querySelector("#js-totalAnswers");
let btnCheck = document.querySelector("#js-btnCheck");
let btnStartOver = document.querySelector("#js-btnStartOver");
let totalScore = document.querySelector(".total-score");
let titleH2 = document.querySelector(".title-h2");
let titleTheme = document.querySelector(".title-theme");
let inputValues; // SELECT ALL ".form-control"
let iconForHelp;
let wordsArray = [];

// document.addEventListener("DOMContentLoaded", () => {
//   // CHECK NEW USER
//   if (localStorage.getItem("newUser") === null) {
//     titleH2.textContent = "Good luck!";
//   } else {
//     titleH2.textContent = "Welcome back!";
//     // titleTheme.textContent = localStorage.getItem('theme');

//     modal.classList.add("is-hidden");
//     wordsArray = JSON.parse(localStorage.saves);

//     //CHECK AVAILABILITY ARRAY WORD BEFORE START
//     totalAnswers.textContent =
//       wordsArray.length > 0 ? `/${wordsArray.length}` : "/ 0";
//     correctAnswers.textContent = 0;www

//     // CREATE A LIST FOR EACH OF WORD
//     wordsArray.forEach((item) => {
//       createList(item.origin, item.translate);
//     });
//   }

//   // SHOW/HIDE ALL LIST BUTTON
//   if (localStorage.getItem("count") >= 1) {
//     btnAllTopic.disabled = false;
//   }
// });

// FUNCTION TO CREATE LIST WITH TWO PARAMS
function createList(origin, translate) {
  let li = document.createElement("label");

  li.classList.add("list-items");
  li.innerHTML = `<span class="list-origin" data-translate="${translate}">${origin}</span>
	<div class="form-holder">
	<input type="text" class="form-control">
	</div>`;

  holderWords.appendChild(li);

  // AFTER CREATED ALL LIST, SELECT IT TO GET VALUES
  inputValues = document.querySelectorAll(".form-control");
}

// BUTTON TO CHECK VALUES
btnCheck.addEventListener("click", function () {
  let arrValues = [...inputValues];
  let isCorrectAnswer = [];
  let isWrongAnswer = [];
  let isEmptyAnswer = [];

  for (let i = 0; i < arrValues.length; i++) {
    let currentItem = arrValues[i].value.trim().toLowerCase();

    if (
      getTranslates(arrValues[i]) === currentItem ||
      getTranslates(arrValues[i]).includes(currentItem)
    ) {
      isCorrectAnswer.push(arrValues[i]);
    } else if (
      arrValues[i].value.trim() == "" ||
      arrValues[i].value == "[no answer]"
    ) {
      isEmptyAnswer.push(arrValues[i]);
    } else {
      isWrongAnswer.push(arrValues[i]);
    }
  }

  this.disabled = true;
  btnStartOver.disabled = false;
  displayScore(isCorrectAnswer);
  addMarks(isCorrectAnswer, isWrongAnswer, isEmptyAnswer);
  iconForHelp = document.querySelectorAll(".icon-empty");
  showTooltTips(iconForHelp);
  showCorrectAnswers(isWrongAnswer);

  totalAnswers.textContent =
    inputValues.length > 0 ? `/${inputValues.length}` : "/ 0";
});

// BUTTON RESET ALL
btnStartOver.addEventListener("click", function () {
  this.disabled = true;
  btnCheck.disabled = false;
  resetValuesAndStates();
  hideScore();
});

// FUNCTION RESET ALL INPUT VALUES AND STATES
function resetValuesAndStates() {
  let arrForReset = inputValues;

  for (let i = 0; i < arrForReset.length; i++) {
    if (arrForReset[i].parentElement.classList.contains("is-correct")) {
      arrForReset[i].parentElement.classList.remove("is-correct");
    }

    if (arrForReset[i].parentElement.classList.contains("is-wrong")) {
      arrForReset[i].parentElement.classList.remove("is-wrong");
      arrForReset[i].nextElementSibling.remove();
    }

    if (arrForReset[i].parentElement.classList.contains("is-empty")) {
      arrForReset[i].parentElement.classList.remove("is-empty");
      arrForReset[i].nextElementSibling.remove();
      arrForReset[i].previousElementSibling.remove();
    }

    arrForReset[i].value = "";
    arrForReset[i].disabled = false;
  }
}

// FUNCTION TAKE CLOSEST ORIGIN WORD & RETURN TRANSLATE
function getTranslates(el) {
  let synonyms =
    el.parentElement.previousElementSibling.dataset.translate.split(",");
  return synonyms;
}

// FUNCTION ADD MARKS RELEVANT ANSWERS
function addMarks(correct, wrong, empty) {
  correct.forEach((item) => {
    item.disabled = true;
    item.parentElement.classList.add("is-correct");
  });

  wrong.forEach((item) => {
    item.disabled = true;
    item.parentElement.classList.add("is-wrong");
  });

  empty.forEach((item) => {
    let iconEmpty = createIconEmpty();
    let translates = createTagTranslate.call(item);

    item.value = "[no answer]";
    item.disabled = true;
    manipulateParentElem(item, iconEmpty, translates);
  });
}

// FUNCTION HIDE USER'S SCORES
function hideScore() {
  totalScore.classList.add("is-hidden");
  titleH2.classList.remove("is-hidden");
}

// FUNCTION DISPLAY USER'S SCORES
function displayScore(scores) {
  correctAnswers.textContent = scores.length;
  totalScore.classList.remove("is-hidden");
  titleH2.classList.add("is-hidden");
}

// FUNCTION CREATE TAG "<i>" FOR APPEND ICON
function createIconEmpty() {
  let emptyElem = document.createElement("i");
  emptyElem.classList.add("icon-empty");
  return emptyElem;
}

// FUNCTION CREATE TAG "<span>" FOR INNERTEXT TRANSLATES TO TOOLTIPS
function createTagTranslate() {
  let tagTranslate = document.createElement("span");
  tagTranslate.classList.add("tool-tip");
  tagTranslate.innerHTML =
    this.parentElement.previousElementSibling.dataset.translate;
  return tagTranslate;
}

// FUNCTION CREATE TAG "<span>" FOR CORRECT ANSWERS
function createTagForCorrectAnswers(value) {
  let showAnswer = document.createElement("span");
  showAnswer.classList.add("show-answer");

  showAnswer.textContent =
    value.parentElement.previousElementSibling.dataset.translate;
  return showAnswer;
}

// FUNCTION SHOW TOOL TIPS
function showTooltTips(nodeList) {
  let arr = [...nodeList];
  let span = document.createElement("span");
  span.classList.add("tool-tip");

  for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener("mouseenter", function () {
      arr[i].previousElementSibling.previousElementSibling.style.cssText = `
			opacity: 1;
			right: -16px;
			`;
    });

    arr[i].addEventListener("mouseleave", function () {
      arr[i].previousElementSibling.previousElementSibling.style.cssText = `
			opacity: 0;
			right: -36px;
			`;
    });
  }
}

// FUNCTION SHOW CORRECT ANSWERS
function showCorrectAnswers(arr) {
  arr.forEach((item) => {
    item.parentElement.appendChild(createTagForCorrectAnswers(item));
  });
}

// FUNCTION MANIPULATE WITH PARENT ELEM
function manipulateParentElem(self, icon, translate) {
  self.parentElement.classList.add("is-empty");
  self.parentElement.appendChild(icon);
  self.parentElement.prepend(translate);
}

// ======================================================================================
/**
 * TODO : CHECK FOR AN EXISTING WORD BEFORE ADD TO ARR. +
 * TODO : CHECK FOR AN EMPTY STRING. +
 * TODO : SAVE TO LOCAL STORAGE. +
 * ? MAKE REPLACE INSTEAD 2 OR MORE SPACES TO 1 SPACE.
 */
// SELECTORS
let btnMore = document.querySelector("#js-btnMore");
let btnStart = document.querySelector("#js-btnStart");
let btnRemove = document.querySelector("#js-btnRemoveLast");
let newOrigin = document.querySelector("#js-newOrigin");
let newTranslate = document.querySelector("#js-newTranslate");
let newWordCount = document.querySelector("#js-wordCound");
let removedWord = document.querySelector("#js-removedWord");
let modal = document.querySelector("#js-modal");
let theme = document.querySelector("#js-theme");

// VALUES
let originValue = newOrigin.value;
let translateValue = newTranslate.value;

// ARR & OBJ
let newWords = [];
let filteredWords = [];
let translateArr = [];
let translateValueArr = [];

// BUTTON ADD MORE NEW WORDS & TRANSLATES
btnMore.addEventListener("click", (e) => {
  e.preventDefault();
  addNewWord;
});

// BUTTON LETS START
btnStart.addEventListener("click", letsStart);

// BUTTON REMOVE LAST WORD
btnRemove.addEventListener("click", removeLast);

// FUNCTION REMOVE LAST WORD FROM LIST
function removeLast() {
  let lastWord = newWords.splice([newWords.length - 1], 1);

  removedWord.textContent = lastWord[0].origin;
  removedWord.classList.add("is-animate");

  removedWord.addEventListener("animationend", () => {
    removedWord.classList.remove("is-animate");
  });

  showCountNewWords(newWords);

  if (!newWords.length) {
    btnStart.disabled = true;
    btnRemove.disabled = true;
  }

  console.log("lastWord", lastWord[0].origin);
  console.log(newWords);
}

// FUNCTION ADD NEW WORDS WITH TRANSLATES TO ARR
async function addNewWord() {
  originValue = newOrigin.value.trim();
  translateValue = newTranslate.value.trim();
  translateArr = translateValue.split(",");

  translateValueArr = translateArr.map((item) => {
    return item.trim().toLowerCase();
  });

  // CHECK FOR AN EXISTING BEFORE ADD
  let word = newWords.find((item) => {
    return originValue == item.origin;
  });

  if (!word && originValue != "" && translateValue != "") {
    newWords.push({
      origin: originValue,
      translate: translateValueArr,
    });

    newOrigin.parentElement.classList.add("is-added");
    newTranslate.parentElement.classList.add("is-added");

    setTimeout(() => {
      newOrigin.parentElement.classList.remove("is-added");
      newTranslate.parentElement.classList.remove("is-added");
    }, 500);

    newOrigin.value = "";
    newTranslate.value = "";

    newOrigin.parentElement.classList.remove("is-error");
    newTranslate.parentElement.classList.remove("is-error");
    focusInput(newOrigin);
  } else {
    newOrigin.parentElement.classList.add("is-error");
    newTranslate.parentElement.classList.add("is-error");
  }

  console.log("New Arr: ", newWords);

  if (newWords.length) {
    btnStart.disabled = false;
    btnRemove.disabled = false;
  }

  showCountNewWords(newWords);
}

// FUNCTION CLOSE MODAL & START TEST
function letsStart() {
  let themeValue = theme.value;

  // SET WORDS LIST TO LOCAL STORAGE
  localStorage.setItem("saves", JSON.stringify(newWords));
  // SET FLAG FOR FIRST VISIT
  localStorage.setItem("newUser", false);

  if (themeValue) {
    let firstLaterUpperCase =
      themeValue[0].toUpperCase() + themeValue.slice(1, themeValue.length);
    // SET THEME
    localStorage.setItem("theme", firstLaterUpperCase);
    titleTheme.textContent = firstLaterUpperCase;
    addTopics(themeValue, newWords);
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(newWords),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((value) => {
      console.log("value: ", value);
    });

  newWords.forEach((item) => {
    createList(item.origin, item.translate);
  });

  // FUNCTION TO CREATE LIST WITH TWO PARAMS
  function createList(origin, translate) {
    let li = document.createElement("label");

    li.classList.add("list-items");
    li.innerHTML = `<span class="list-origin" data-translate="${translate}">${origin}</span>
		<div class="form-holder">
		<input type="text" class="form-control">
		</div>`;

    holderWords.appendChild(li);

    // AFTER CREATED ALL LIST, SELECT IT TO GET VALUES
    inputValues = document.querySelectorAll(".form-control");
  }

  modal.classList.add("go-up");
  modal.addEventListener("animationend", () => {
    modal.classList.add("is-hidden");
  });
}

// FUNCTION SHOW COUNT OF NEW WORDS
function showCountNewWords(arr) {
  return (newWordCount.textContent = arr.length);
}

// ======================================================================================
/**
 * 19/04/21;
 */

let modalControl = document.querySelectorAll(".modal-control");

// FUNCTION REMOVE ERROR-BORDER AFTER FOCUS
function removeErrorBorder() {
  for (let i = 0; i < modalControl.length; i++) {
    modalControl[i].onfocus = function () {
      if (modalControl[i].parentElement.classList.contains("is-error")) {
        modalControl[i].parentElement.classList.remove("is-error");
      }
    };
  }
}
removeErrorBorder();

// ========================================
// FUNCTIONS ADD, REMOVE, START BY KEYBOARD
document.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    addNewWord();
  }

  if (e.code === "Enter" && e.shiftKey) {
    letsStart();
  }

  if (e.code === "Delete") {
    removeLast();
  }
});

// ========================================
// FUNCTION SHOW TOOLTIPS BUTTONS AFTER LOADED
let allBtns = document.querySelectorAll(".modal-buttons button");
function buttonsTooltip() {
  allBtns.forEach((button) => {
    let fragment = document.createDocumentFragment();
    let span = document.createElement("span");
    span.classList.add("info-box");
    span.textContent = button.dataset.info;
    fragment.appendChild(span);
    button.appendChild(fragment);
  });
  setTimeout(() => {
    allBtns[0].parentElement.classList.add("is-show");
  }, 800);

  setTimeout(() => {
    allBtns[0].parentElement.classList.remove("is-show");
  }, 4500);
}
buttonsTooltip();

// ========================================
// FUNCTON FOCUS ON INPUT
function focusInput(input) {
  input.focus();
}

// ========================================
// FUNCTION RESET ALL BUTTON
let btnCreateTopic = document.querySelector("#js-createTopic");

btnCreateTopic.addEventListener("click", () => {
  localStorage.removeItem("newUser");
  document.location.reload();
});

// ========================================
// FUNCTION ADD TOPICS TO OBJ
function addTopics(title, arr) {
  let topics = {};

  topics.theme = title;
  topics.saves = arr;

  if (localStorage.getItem("count") === null) {
    var countTopic = 0;
  }

  let currentCount = +localStorage.getItem("count");
  countTopic = currentCount + 1;
  localStorage.setItem("count", countTopic);
  localStorage.setItem(`topics${countTopic}`, JSON.stringify(topics));

  if (localStorage.getItem("count") >= 1) {
    btnAllTopic.disabled = false;
  }
}

// ========================================
// FUNCTION SHOW ALL LIST
let btnAllTopic = document.querySelector("#js-seeAllTopic");

function goToAllTopics() {
  btnAllTopic.addEventListener("click", () => {
    let origin = document.location.origin;
    let pathname = `/topicslist.html`;
    let ghPathname = `/My-Vocabulary${pathname}`;

    if (origin == "https://khaanh.github.io") {
      document.location.href = `${origin}${ghPathname}`;
      return;
    }

    document.location.href = `${origin}${pathname}`;
  });
}
goToAllTopics();

// ========================================
// FUNCTION GET TOPIC LIST FROM LOCAL STORAGE

function getTopicList(cb) {
  let topicArr = [];
  let keys = [];

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);

    if (key.includes("topics", 0)) {
      topicArr.push(JSON.parse(localStorage.getItem(key)));
      keys.push(key);
    }
  }

  cb(topicArr, keys);
}
getTopicList(createThemeItems);

// ========================================
// FUNCTION CREATE THEME ITEMS
function createThemeItems(arr, keys) {
  let template = document.querySelector("#js-template");
  let themeList = document.querySelector("#js-themeList");
  let themeHeader = template.content.querySelector(".theme-header h2");
  let themeItems = template.content.querySelector(".theme-items");
  let themeCaption = template.content.querySelectorAll(".theme-caption");

  for (let i = 0; i < arr.length; i++) {
    let subject = arr[i];
    let firstCouple = arr[i];
    let secondCouple = arr[i];
    console.log("keys[i]", keys[i]);
    console.log("arr[i]", arr[i]);

    // CHECK LENGTH OF WORDS
    if (
      firstCouple.saves[0].origin.length > 5 ||
      secondCouple.saves[0].origin.length > 5
    ) {
      let origin = `${firstCouple.saves[0].origin.slice(
        0,
        5
      )}... — ${firstCouple.saves[0].translate[0].slice(0, 3)}...`;

      themeCaption[1].textContent = `Origin — Translate`;

      // ALERT DEFAULT TEXT IF ARR.LENGTH < 1
      if (firstCouple.saves.length > 1) {
        let origin2 = `${secondCouple.saves[1].origin.slice(
          0,
          5
        )}... — ${secondCouple.saves[1].translate[0].slice(0, 3)}...`;

        themeCaption[1].textContent = origin2;
      }
      themeCaption[0].textContent = origin;
    }

    // CHECK LENGTH OF WORDS
    if (
      firstCouple.saves[0].origin.length < 5 ||
      secondCouple.saves[0].origin.length < 5
    ) {
      let origin = `${
        firstCouple.saves[0].origin
      } — ${firstCouple.saves[0].translate[0].slice(0, 3)}...`;

      themeCaption[1].textContent = `Origin — Translate`;

      // ALERT DEFAULT TEXT IF ARR.LENGTH < 1
      if (firstCouple.saves.length > 1) {
        let origin2 = `${
          secondCouple.saves[1].origin
        } — ${secondCouple.saves[1].translate[0].slice(0, 3)}...`;
        themeCaption[1].textContent = origin2;
      }
      themeCaption[0].textContent = origin;
    }

    themeHeader.textContent = `${subject.theme}`;
    themeItems.dataset.key = `${keys[i]}`;

    let clone = document.importNode(template.content, true);
    console.log("clone", clone);
    themeList.appendChild(clone);
  }
}

/**
 *19/05/21
 */

// ========================================
// FUNCTION

function chooseTopic() {
  let items = document.querySelectorAll(".theme-items");

  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", () => {
      items[i].dataset;
      console.log(`items[i].dataset:`, items[i].dataset);
      let key = localStorage.getItem(items[i].dataset);
      console.log(key);
    });
  }
}
chooseTopic();

// let url = "http://localhost:3000/words";
// let btnTest = document.querySelector("#btn-test");

// btnTest.addEventListener("click", (e) => {
//   console.log("adasd");
//   fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//     },
//     body: JSON.stringify(newWords),
//   })
//     .then((resp) => {
//       return resp.json();
//     })
//     .then((value) => {
//       console.log("value: ", value);
//     });
// });

function resetFunc() {
  let resetBtn = document.querySelector("#js-reset");
  resetBtn.addEventListener("click", () => {
    let pathName = document.location.pathname;
    let origin = document.location.origin;

    if (pathName == "/index.html") {
      localStorage.clear();
      return;
    }

    document.location.href = `${origin}${pathName}`;
    localStorage.clear();
    return;
  });
}
resetFunc();
