const $frame = document.querySelector("#frame");

let cardType = [];
let shuffledCard = [];
let clickedCardIndex = 0;
let setTimeoutId = "";

// 카드 배열 만들기
function makeCard() {
  cardType = Array(36).fill(true);

  for (let i = 0; i < 18; ++i) {
    cardType[i] = false;
  }
}

// 카드 섞기(피셔예이츠 셔플)
function shuffle() {
  for (let i = 0; i < 36; ++i) {
    //console.log("cardType.length: " + cardType.length);
    const random = Math.floor(Math.random() * cardType.length);
    //console.log(random);
    const spliceArray = cardType.splice(random, 1);
    shuffledCard.push(spliceArray[0]);
    // 다중배열 만드려면 push([i, j])
  }
  //console.table("shuffledCard: " + shuffledCard[1][1]);
}

// 카드 태그 및 색깔 만들기
function createCard(i) {
  const container = document.createElement("div");
  container.className = "container";
  //container.dataset.indexNumber = i + 1;

  //중요 데이터는 수정가능성이 있으니 태그에 넣지 말기
  const card = document.createElement("div");
  card.className = "card";
  const cardFront = document.createElement("div");
  cardFront.className = "card__front";
  const cardBack = document.createElement("div");
  cardBack.className = "card__back";

  card.append(cardFront);
  card.append(cardBack);
  container.append(card);

  //string.indexOf() 찾을 수 있는 가장 첫 번째 요소의 index 반환, 찾을 수 없을 경우 -1 반환

  //카드 색깔 나누기
  if (shuffledCard[i]) {
    //document.write(shuffledCard[i]);
    cardBack.style.transform = "rotateY(180deg)";
  } else {
    cardFront.style.transform = "rotateY(180deg)";
  }

  return container;
}

// 카드 클릭 이벤트 만들기
function onclickCard(e) {
  //target 은 이벤트가 시작된 위치(태그), currentTarget 은 이벤트 핸들러와 연결된 위치(태그)
  //e.target은 card__front/card__back을 가리키고 e.currentTarget은 container를 가리킨다
  //str.dataset.strValue div의 data value값 넣기

  //클릭한 요소의 index 구하기 -> https://gurtn.tistory.com/134
  const $container = document.querySelectorAll(".container");
  console.log("$container1: " + $container[0]);

  // (...) 스프레드(전개) 문법 : 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서 개별적인 값들의 목록으로 만듦
  let nodes = [...e.currentTarget.parentElement.children]; //클릭한 요소
  let clickedCardIndex = nodes.indexOf(e.currentTarget); //클릭한 요소의 index값
  console.log("clickedCardIndex: " + clickedCardIndex);

  if (!shuffledCard[clickedCardIndex]) {
    /*
    console.log(
      "shuffledCard[clickedCardIndex]_before: " + shuffledCard[clickedCardIndex]
    );
    */
    e.currentTarget.classList.toggle("flipped"); //카드 뒤집기
    shuffledCard[clickedCardIndex] = true;
    /*
    console.log(
      "shuffledCard[clickedCardIndex]_after: " + shuffledCard[clickedCardIndex]
    );
    */
  }
}

let shuffledNum = [];

function getCardIndex(shuffledCard) {
  const $container = document.querySelectorAll(".container");
  console.log("$container2: " + $container[0]);

  let checkNum = [];
  let indexLength = 0;
  //let isAutoFlipDone = false;

  //무작위로 카드를 뒤집기 위해 인덱스 배열을 만드는 코드
  for (let i = 0; i < 36; ++i) {
    if (shuffledCard[i]) {
      checkNum.push(i);
    }

    if (i === 35) {
      indexLength = checkNum.length;
    }
  }

  for (let j = 0; j < indexLength; ++j) {
    const randomNum = Math.floor(Math.random() * checkNum.length);
    const spliceArrayIndex = checkNum.splice(randomNum, 1);
    shuffledNum.push(spliceArrayIndex[0]);
  }

  return shuffledNum;
}

function autoFlipCard(shuffledCard) {
  getCardIndex(shuffledCard);
  const $container = document.querySelectorAll(".container");
  console.log("$container3: " + $container[0]);

  let indexLength = shuffledNum.length;
  console.log("indexLength: " + indexLength);

  //만들어진 인덱스 배열을 이용하여 자동으로 카드를 뒤집는 코드
  for (let k = 0; k < shuffledNum.length; ++k) {
    console.log("k: " + k);
    setTimeoutId = ((x) => {
      setTimeout(
        () => {
          $container[shuffledNum[k]].classList.toggle("flipped");
          shuffledCard[shuffledNum[k]] = false;
        },
        1000 * x,
        k
      );
    })(k);
    /*
    if (k === 17) {
      isAutoFlipDone = true;
    }
    console.log("isAutoFlipDone: " + isAutoFlipDone);
    */
  }
}

/*
function reloadAutoFlipCard() {
  setInterval(() => autoFlipCard(shuffledCard), 1000 * 15);
}
*/
function startGame() {
  makeCard();
  shuffle();

  for (let i = 0; i < 36; ++i) {
    const playCardGame = createCard(i);
    playCardGame.addEventListener("click", onclickCard);
    $frame.append(playCardGame);
  }
  autoFlipCard(shuffledCard);
  //reloadAutoFlipCard(shuffledCard);
}

// 게임 초기화
function restartGame() {
  $frame.innerHTML = "";
  cardType = [];
  shuffledCard = [];
  clickedCardIndex = 0;
  shuffledNum = [];
  $container = [];
  startGame();
}

//게임 다시 시작하기
function restartBtnClick() {
  document.querySelector(".restartBtn").onclick = () => restartGame();
  clearTimeout(setTimeoutId);
}

//페이지 로드 시 자동 실행
window.onload = function () {
  startGame();
};
