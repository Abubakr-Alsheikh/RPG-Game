let xp = 1;
let health = 100;
let gold = 50;
let currentWapon = 0;
let fighting;
let monster;
let monsterHealth;
let monsterLevel;
let inventory = [`stick`];

// content Game
const btnStart = document.querySelector(".startGame");
const menuGame = document.querySelector(".menu");
const wholeGame = document.querySelector(".wholeGame");
const xpText = document.querySelector("#xp");
const healthText = document.querySelector("#health");
const goldText = document.querySelector("#gold");
const btnLeft = document.querySelector("#btnLeft");
const btnCenter = document.querySelector("#btnCenter");
const btnRight = document.querySelector("#btnRight");
const monsterName = document.querySelector("#MonsterName");
const monsterHealthText = document.querySelector("#MonsterHealth");
const monsterLevelText = document.querySelector("#MonsterLevel");
const monsterArea = document.querySelector(".Monster");
const textArea = document.querySelector("#TextArea");

//////Wapons//////
    const Wapons=[
        {
            name:"stick",
            power:5
        },
        {
            name:"dragger",
            power:30
        },
        {
            name:"axe",
            power:60
        },
        {
            name:"sword",
            power:100
        }
    ];
//////Wapons//////

/////Monsters/////
    const Monsters=[
        {
            name:"Slime",
            level:2,
            health:50
        },
        {
            name:"Goblin",
            level:10,
            health:120
        },
        {
            name:"Dragon",
            level:25,
            health:270
        }
    ];
/////Monsters/////


// content Game

///////locations///////
let locations = [
    {
        name:"Square Town",
        "Go to":["Go to store","Go to cave","Fight The Dragon"],
        "button functions":[goStore,goCave,fightDragon],
        text:"You are in the square town. You see sign says \"store\" 🪧"
    },
    {
        name:"Store",
        "Go to":["Buy 10 health For (10 Gold)","Buy Weapon For (30 Gold)","Go to Town"],
        "button functions":[buyHealth,buyWeapon,goTown],
        text:"You enter the store 🛖"
    },
    {
        name:"Cave",
        "Go to":["Fight Slime","Fight Goblin","Go to Town"],
        "button functions":[fightSlime,fightGoblin,goTown],
        text:"You enter the Cave 🪨"
    },
    {
        name:"Fight",
        "Go to":["Attack","Dodge","Go to Town"],
        "button functions":[attack,dodge,goTown],
        text:"You are Fighting ⚔️"
    },
    {
        name:"Kill monster",
        "Go to":["Go to Town","Go to Town","Go to Town"],
        "button functions":[goTown,goTown,easterEgg],
        text:`You killed the monster ☠️`
    },
    {
        name:"lose",
        "Go to":["REPLAY","REPLAY","REPLAY"],
        "button functions":[restart,restart,restart],
        text:"You are died 💀"
    },
    {
        name:"win",
        "Go to":["Go to Town","Go to Town","Go to Town"],
        "button functions":[goTown,goTown,goTown],
        text:"You finally do it, you killed the dragon, finally the people can rast🕊️<br>but there are other dragons in this world, so if you can kill them all."
    },
    {
        name:"easter egg",
        "Go to":["3","7","Go to Town?"],
        "button functions":[pick3,pick7,goTown],
        text:"You find an easter egg. you will win 1o gold if you answer correct, choose one number and if you luck your number will show up."
    }
];

function updateLocation(location){
    textArea.innerHTML=location.text;
    btnLeft.innerHTML = location["Go to"][0];
    btnCenter.innerHTML = location["Go to"][1];
    btnRight.innerHTML = location["Go to"][2];
    btnLeft.onclick= location["button functions"][0];
    btnCenter.onclick=location["button functions"][1];
    btnRight.onclick=location["button functions"][2];
    monsterArea.style.display = "none";
}
///////locations///////

//initialize button
btnStart.onclick = startGame; 
btnLeft.onclick = goStore; 
btnCenter.onclick = goCave;
btnRight.onclick = fightDragon;
//initialize button

////////menu////////
function startGame(){
    menuGame.style.display = "none";
    wholeGame.style.display = "block";
}
////////menu////////

//////////store

function goStore() {
    updateLocation(locations[1]);
}

function goTown(){
    updateLocation(locations[0]);
}

function buyHealth(){
    if(gold >= 10){
        gold -= 10;
        health += 10;
        healthText.innerHTML = health;
        goldText.innerHTML = gold;
    }
    else
        textArea.innerHTML = "You dont have enough gold.";
}

function buyWeapon(){
    if(currentWapon < Wapons.length-1){
        if(gold>=30){
            gold -= 30;
            currentWapon++;
            let wapon = Wapons[currentWapon].name;
            inventory.push(wapon);
            goldText.innerHTML = gold;
            textArea.innerHTML = `You bought a new wapon it is ${wapon}.<br>`;
            textArea.innerHTML += `You have now in your inverntory : ${inventory}.`;

        }
        else
            textArea.innerHTML = "You dont have gold. Come back later ,when you can count.";
    }else{
        textArea.innerHTML = "You have The best wapon.";
        btnCenter.innerHTML = "Sell wapen For 15 gold";
        btnCenter.onclick = sellWapon;
    }
}

function sellWapon(){
    if(inventory.length > 1){
        gold += 15;
        goldText.innerHTML = gold;
        currentWapon--;
        let sell = inventory.shift();
        textArea.innerHTML = `You sell now a ${sell}<br>`;
        textArea.innerHTML += `You now have in your inventory: ${inventory}`;
    }else
        textArea.innerHTML = "Dont sell your only wapon!";
}
//////////store


//////////Cave
function goCave() {
    updateLocation(locations[2]);
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightGoblin() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

//////////Cave


//////////Fight

function goFight(){
    updateLocation(locations[3]);
    monsterArea.style.display = "block";
    let ran = Math.random();
    monster = Monsters[fighting].name;
    monsterHealth = Monsters[fighting].health + Math.round((Monsters[fighting].health* ran)*1.3);
    monsterLevel = Monsters[fighting].level + Math.round((Monsters[fighting].level * ran) * 1.6);
    monsterName.innerHTML = monster;
    monsterHealthText.innerHTML =monsterHealth ;
    monsterLevelText.innerHTML =  monsterLevel ;
}

function attack(){
    textArea.innerHTML = `The Monster ${monster} attacks`;
    health -= monsterLevel;
    if(health >= 1){
        healthText.innerHTML = health;
        textArea.innerHTML += `<br>You attacked with ${Wapons[currentWapon].name}.`;
        let ran = Math.random();
        console.log(ran);

        if(ran > 0.2){
            console.log(Wapons[currentWapon].power + Math.round((Math.random() * xp)) + 1);
            monsterHealth -= (Wapons[currentWapon].power + Math.floor((ran * xp)) + 1);
            
            if(monsterHealth > 0){
                monsterHealthText.innerHTML = monsterHealth;
            }
            else
            {
                if(fighting === 2)
                    win();
                else
                    defietMonster();
            }
        }
        else
            textArea.innerHTML = `OH you missed!`;
        
        if(ran <= 0.1 && inventory.length !== 1){
            textArea.innerHTML = `Oh no... ${inventory.pop()} broke 💔`
            currentWapon--;
        }
    }
    else{
        lose();
    }

    
}

let dodgeXp=0;
let dodgeHealth=0;

function dodge(){
    let ran = Math.random();
    dodgeXp = parseInt((ran * monsterLevel)+4);
    dodgeHealth = parseInt((ran * monsterLevel)+1);
    xp += dodgeXp;
    health -= dodgeHealth;
    if(health >= 1){
        xpText.innerHTML = xp;
        healthText.innerHTML = health;
        textArea.innerHTML = `You dodge the ${Monsters[fighting].name} Attack.<br>And you get ${dodgeXp} Xp, but you lose ${dodgeHealth} Health`;
    }
    else{
        lose();
    }

}

//////////Fight

//////////Easter Egg//////////

function easterEgg(){
    updateLocation(locations[7]);
}

function pick3(){
    pick(3);
}
function pick7(){
    pick(7);
} 
function pick(number){
    let numbers = [];
    while (numbers.length <10) {
        numbers.push(Math.floor(Math.random()*11));
    }
    textArea.innerHTML = `you choose the number ${number}, and there are the numbers:<br>`;
    for (let i = 0; i < numbers.length; i++) {
        textArea.innerHTML += `${numbers[i]} <br>`;
    }
    if(numbers[i].indexOf(number) !== -1){
        textArea.innerHTML += `Correct you win with us '1' Gold 🪙, yeah... i insert (o) by mistick and i am lazy to remove it.`;
        goldText.innerHTML = gold += 1;
    }else{
        textArea.innerHTML += `ummm... I think you have bad luck today.<br> but I have not told you  are going to lose '5' health.`;
        healthText.innerHTML = health -= 5;
        if(health <= 0)
        lose();
    }

} 

//////////Easter Egg////////// 

/////////End Game////////

function defietMonster(){
    gold += monsterLevel + Math.floor(Math.random() * 6.5 * (monsterLevel/2));
    xp += monsterLevel + Math.floor(Math.random() * (xp/3));
    goldText.innerHTML = gold;
    xpText.innerHTML = xp;
    updateLocation(locations[4]);
}

function lose(){
    updateLocation(locations[5]);
}

function restart(){
    xp = 1;
    health = 100;
    gold = 50;
    currentWapon = 0;
    inventory = [`stick`];
    xpText.innerHTML = xp;
    healthText.innerHTML = health;
    goldText.innerHTML = gold;
    goTown();
}

function win(){
    updateLocation(locations[6]);
}

/////////End Game////////
