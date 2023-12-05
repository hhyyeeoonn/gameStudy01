const $frame = document.querySelector("#frame");

let cardType = [];
let shuffledCard = [];
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

function autoFlipCard(shuffledCard) {
  //resolve, reject는 비동기 처리 과정에서 성공과 실패를 구분하는 방법
  /*
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
 */
  const $container = document.querySelectorAll(".container");
  let x = 1;
  let checkNum = [];
  let shuffledNum = [];

  for (let i = 0; i < 36; ++i) {
    //console.log("shuffledCard[i]: " + shuffledCard[i]);
    if (shuffledCard[i]) {
      //console.log("i1: " + i);
      /*
      let flippedIndex = i;
      ((x) => {
        setTimeout(
          () => {
            //console.log("i2: " + i);
            $container[flippedIndex].classList.toggle("flipped");
            shuffledCard[flippedIndex] = false;
          },
          1000 * x,
          flippedIndex
        );
      })(i);
      */
      checkNum.push(i);
    }
  }
  console.log("checkNum: " + checkNum);
  //console.log("checkNum.length: " + checkNum.length);

  for (let j = 0; j < 18; ++j) {
    console.log("checkNum.length: " + checkNum.length);
    const randomNum = Math.floor(Math.random() * checkNum.length);
    console.log(randomNum);
    const spliceArrayIndex = checkNum.splice(randomNum, 1);
    console.log("spliceArrayIndex: " + spliceArrayIndex);
    shuffledNum.push(spliceArrayIndex[0]);
  }
  console.log("shuffledNum: " + shuffledNum);
  console.log("shuffledNum.length: " + shuffledNum.length);

  //여기 따로 빼는 게 좋을 듯
  for (let k = 0; k < shuffledNum.length; ++k) {
    ((x) => {
      setTimeout(
        () => {
          //console.log("i2: " + i);
          $container[shuffledNum[k]].classList.toggle("flipped");
          shuffledCard[shuffledNum[k]] = false;
        },
        1000 * x,
        k
      );
    })(k);
  }

  //console.log("shuffledCard[i]: " + shuffledCard[i]);
  /*
  //for문은 반복 횟수가 명확할 때,  while문은 반복 횟수가 불명확할 때 주로 사용
  while (i < 36) {
    if (shuffledCard[i]) {
      //$container[i].classList.toggle(".flipped");
      //shuffledCard[i] = false;


    } else break;
  }
  */
}

function startGame() {
  makeCard();
  shuffle();

  for (let i = 0; i < 36; ++i) {
    const playCardGame = createCard(i);
    playCardGame.addEventListener("click", onclickCard);
    $frame.append(playCardGame);
  }
  autoFlipCard(shuffledCard);
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
