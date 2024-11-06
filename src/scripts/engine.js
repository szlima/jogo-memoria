
const body= document.querySelector('body');
const displayInfo= document.querySelector('#display--info');
const displayMenuOptions= document.querySelectorAll('.menu__option');
const displayBoard= document.querySelector('#display--board');
const buttonRestart= document.querySelector('#button--restart');

const EMOJIS= [
    '🐕', '🦜', '🐎', '🐇',
    '🦒', '🦋', '🐢', '🐬',
    '🐅', '🐜', '🐫', '🐘',
    '🐿️', '🦚', '🕊️', '🐙'
];

let cardArray= [];
let currentCardPair= [];
let gameStartTime;

// ---------- ----------

buttonRestart.onclick= () => location.reload();

const getCurrentTime= () => (new Date()).getTime();

const endGame= () => {
    const gameEndTime= getCurrentTime();
    const diffTime= gameEndTime - gameStartTime;

    const seconds= 1000;
    const minutes= seconds * 60;
    const hours= minutes * 60;

    const gameDuration= Math.round(diffTime/hours) > 0 ?
        `mais de 1 hora` :
        Math.round(diffTime/minutes) > 0 ?
            `${Math.round(diffTime/minutes)} minutos` :
            `${Math.round(diffTime/seconds)} segundos`;

    body.classList.add('gameOver');
    displayInfo.innerText= `Você demorou ${gameDuration}!`;
    buttonRestart.innerText= 'JOGAR NOVAMENTE';
};

const areAllCardsFlipped= () => {
    const displayMatchedCards= document.querySelectorAll('.boxMatch');
    return (displayMatchedCards.length === cardArray.length);
};

const cancelCurrentPair= (cardOne, cardTwo) => {
    cardOne.classList.remove('boxOpen');
    cardTwo.classList.remove('boxOpen');
}

const keepCurrentPair= (cardOne, cardTwo) => {
    cardOne.classList.add('boxMatch');
    cardTwo.classList.add('boxMatch');
}

const checkMatch= () => {
    const [cardOne, cardTwo]= [...currentCardPair];

    if(cardOne.innerHTML === cardTwo.innerHTML)
        keepCurrentPair(cardOne, cardTwo);
    else
        cancelCurrentPair(cardOne, cardTwo);

    currentCardPair= [];

    if(areAllCardsFlipped())
        endGame();
};

const canCheckMatch= () => (currentCardPair.length === 2);

const canFlipCard= () => (currentCardPair.length < 2);

const flipCard= e => {
    const card= e.target;

    if(!gameStartTime){
        gameStartTime= getCurrentTime();
        buttonRestart.style.visibility= 'visible';
    }

    if(card.classList.contains('boxOpen'))
        return;

    if(canFlipCard()){
        card.classList.add('boxOpen');
        currentCardPair.push(card);
    }

    if(canCheckMatch())
        setTimeout(checkMatch, 500);
};

const getEmojis= length => {
    return [...EMOJIS.slice(0, length), ...EMOJIS.slice(0, length)].sort(() =>
        (Math.random() > 0.5 ? 2 : -1)
    );
};

const drawCards= length => {
    cardArray= getEmojis(length);

    cardArray.forEach(emoji => {
        let card= document.createElement('div');
        card.classList.add('item');
        card.innerHTML= emoji;
        card.onclick= flipCard;
        displayBoard.appendChild(card);
    });

    displayBoard.classList.add(`level-${(length-4)/4}`);
};

const startGame= length => {
    body.classList.add('started');
    displayInfo.innerText= '';
    drawCards(length);
};

const init= () => {
    displayMenuOptions.forEach((option, i) => {
        const length= 8 + (i*4);
        option.innerText= `${length} pares`;
        option.onclick= () => startGame(length);
    });
};

// ---------- ----------

init();