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
    if(!startGame){
        startGame= (new Date()).getTime();
        document.querySelector("#button--restart").style.visibility= "visible";
    }

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

    document.querySelector(".container").classList.add("gameOver");
    document.querySelector("#display--info").innerText= `Você demorou ${duration}!`;
    document.querySelector("#button--restart").innerText= "JOGAR NOVAMENTE";
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
        document.querySelector("#display--board").appendChild(box);
    }
    document.querySelector("#display--board").classList.add(`level-${(length-4)/4}`);
}

function init(){

    document.querySelectorAll(".menu__option").forEach((option, i) => {
        const length= 8 + (i*4);
        option.innerText= `${length} pares`;
        option.onclick= () => {
            document.querySelector(".container").classList.add("started");
            document.querySelector("#display--info").innerText= "";
            drawCards(length);
        };
    });
}

init();