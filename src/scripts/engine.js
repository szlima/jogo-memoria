const data= [
    "🐕", "🦜", "🐎", "🐇",
    "🦒", "🦋", "🐢", "🐬",
    "🐅", "🐜", "🐫", "🐘",
    "🐿️", "🦚", "🕊️", "🐙"
];

let emojis= [];
let openCards= [];
let startGame;

function handleClick(){
    if(!startGame)
        startGame= (new Date()).getTime();

    if(this.classList.contains("boxOpen"))
        return;

    if(openCards.length < 2){
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if(openCards.length == 2)
        setTimeout(checkMatch, 500);
}

function gameOver(){
    const endGame= (new Date()).getTime();
    const diff= endGame - startGame;

    const seconds= 1000;
    const minutes= seconds * 60;
    const hours= minutes * 60;

    const duration= Math.round(diff/hours) > 0 ?
                        `mais de 1 hora` :
                        Math.round(diff/minutes) > 0 ?
                            `${Math.round(diff/minutes)} minutos` :
                            `${Math.round(diff/seconds)} segundos`;

    alert(`Você venceu! Você demorou ${duration}!`);
}

function checkMatch(){
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    }else{
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards= [];

    if(document.querySelectorAll(".boxMatch").length == emojis.length)
        gameOver();
}

function drawCards(length){
    emojis= [...data.slice(0, length), ...data.slice(0, length)].sort(() =>
        (Math.random() > 0.5 ? 2 : -1)
    );

    for(let i=0; i<emojis.length; i++){
        let box= document.createElement("div");
        box.classList.add("item");
        box.innerHTML= emojis[i];
        box.onclick= handleClick;
        document.querySelector(".game").appendChild(box);
    }
}

function init(){

    for(let i=0; i<3; i++){
        const length= 8 + (i*4);
        const option= document.createElement("div");
        option.classList.add("optionStartGame");
        option.innerText= `${length} pares`;
        option.onclick= () => {
            document.querySelector(".container").classList.remove("invisible");
            document.querySelectorAll(".optionStartGame").forEach(optionDiv =>
                optionDiv.classList.add("invisible")
            );
            drawCards(length);
        };
        document.querySelector("body").appendChild(option);
    }
}

init();