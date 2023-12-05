const $frame = document.querySelector("#frame");

let cardType = [];
let shuffledCard = [];
let cardIndex = [];
let clickedCardIndex = 0;

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
  //div의 data-card-value값이 true면 앞면
  //container.dataset.cardValue = shuffledCard[i];
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

  //document.write(shuffledCard);
  return container;
}

// 카드 클릭 이벤트 만들기
function onclickCard(e) {
  //target 은 이벤트가 시작된 위치(태그), currentTarget 은 이벤트 핸들러와 연결된 위치(태그)
  //console.log(e.currentTarget.value);
  /*
  if (e.target.className === "card__back") {
    e.currentTarget.classList.toggle("flipped");
    e.currentTarget.dataset.cardValue = true;
  }
  */
  //클릭한 요소의 index 구하기 -> https://gurtn.tistory.com/134
  const $container = document.querySelectorAll(".container");

  // ...
  let nodes = [...e.currentTarget.parentElement.children];
  let containerIndex = nodes.indexOf(e.currentTarget);
  console.log("containerIndex: " + containerIndex);

  /*
  $container.forEach((element, index) => {
    element.onclick = () => {
      clickedCardIndex = index;
      //console.log("index: " + index);
      console.log("clickedCardIndex1: " + clickedCardIndex);
      return false;
    };
    return clickedCardIndex;
  });

  let flippedCard = await new Promise((resolve) => {
    if (!shuffledCard[clickedCardIndex]) {
      console.log(
        "shuffledCard[clickedCardIndex]_before: " +
          shuffledCard[clickedCardIndex]
      );
      e.currentTarget.classList.toggle("flipped");
      shuffledCard[clickedCardIndex] = true;
      console.log(
        "shuffledCard[clickedCardIndex]_after: " +
          shuffledCard[clickedCardIndex]
      );
    }
  });
  console.log("clickedCardIndex2: " + clickedCardIndex);
  */
}

/*
async function autoFlipCard() {
  //resolve, reject는 비동기 처리 과정에서 성공과 실패를 구분하는 방법
  
 
  let cardData = document.querySelectorAll(".container");
  let autoFlipPromise = new Promise((resolve, reject) => {
    let autoFlipCard = setInterval(() => {
      for (let i = 0; i < 36; ++i) {
        if (cardData[i].dataset.cardValue) {
          cardData[i].dataset.cardValue = false;
          cardData[i].classList.toggle("flipped");
        } else {
          clearInterval(autoFlipCard);
        }
      }
    }, 2000);
  });
 
  
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
  //autoFlipCard();
}

// 게임 초기화
function init() {
  $frame.innerHTML = "";
  cardType = [];
  shuffledCard = [];
  startGame();
}

//게임 다시 시작하기
function restartBtnClick() {
  document.querySelector(".restartBtn").onclick = () => init();
}

//페이지 로드 시 자동 실행
window.onload = function () {
  startGame();
};
