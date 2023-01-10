let wordsArr = ["show", "trade", "calculator", "toes", "kneel", "dogs", "ashamed", "shaggy", "wondeful", "tearful", "womanly", "satisfy", "nippy", "sofa", "gullible", "wretched", "soda", "ugly", "nine", "yellow", "prefer", "tame", "wound", "decorous", "measly", "raise", "hill", "scent", "base", "zephyr", "use", "lively", "organic", "coordinated", "wool", "applaud", "want", "neat", "polish", "attraction", "system", "imported", "back", "dispensable", "legs", "divide", "volatile", "pushy", "quiet", "ajar", "chance", "dam", "queue", "terrify", "ready", "sheep", "tacit", "melted", "grab", "tip", "unsuitable", "choke", "stale", "tow", "shake", "pathetic", "note", "birth", "loving", "lonely", "tan", "invincible", "bite", "scream", "ruddy", "fuzzy", "old-fashioned", "hapless", "sick", "veil", "mother", "soft", "destruction", "tent", "industrious", "helpful", "verdant", "gorgeous", "voracious", "thoughtless", "color", "voiceless", "obnoxious", "improve", "houses", "black", "fix", "ordinary", "lake"],
start = document.querySelector(".start"),
input = document.querySelector(".input"),
h = 0,
wpm = 0,
timer = 30,
index = 0,
generatedWords = [],
typedWords = [],
validWords = [],
invalidWords = [];

function time() {
    let hours = new Date().getHours(),
    minutes = new Date().getMinutes();
    if(hours <= 10)
        hours = `0${hours}`;
    if(minutes <= 10)
        minutes = `0${minutes}`;
    document.querySelector(".time").innerText = `${hours}:${minutes}`;
}

function reset() {
    document.querySelector(".reset").onclick = window.location.reload();
}

function generate(arr) {
    let field = document.querySelector(".generatedWords");
    for(let i=0; i<70; i++)
    {
        let randomIndex = Math.floor(Math.random()*99);
        arr.push(wordsArr[randomIndex]);
        field.innerHTML += arr[i] + " ";
    }
}

input.onchange = (e) => {
    e.preventDefault();
    document.querySelector(".disclaimer").focus();
    input.value = '';
    input.focus();
    input.addEventListener('keypress', event => {
        if(event.code === 'Space') {
            typedWords.push(input.value);
            input.value = '';
            typedWords[h].replace(/ /g, '');
            h++;
        }
    });
}

start.onclick = () => {
    input.removeAttribute("disabled");
    input.value = '';
    input.focus();
    document.querySelector(".timer").innerText = `00:${timer}`;
    start.disabled = true;
    let a = setInterval(() => {
        if(timer >= 10) 
            document.querySelector(".timer").innerText = `00:${timer}`;

        else if(timer < 10)
            document.querySelector(".timer").innerText = `00:0${timer}`;
        
        timer--;

        if(timer <= -1)
            clearInterval(a);
    }, 1000);
    setTimeout(() => {
        let a=0;
        for(let i=1; i<typedWords.length; i++) {
            typedWords[i] = typedWords[i].replace(/ /g, '');
            if(typedWords[a] === generatedWords[i]) {
                validWords.push(typedWords[a]);
            }

            else {
                invalidWords.push(typedWords[a]);
            }

            a++;
        }

        if(validWords.length > 3)
            wpm = (validWords.length * 3) + 3;

        else
            wpm = validWords.length * 2;

        document.querySelector(".velocity").innerText = `${wpm} WPM`;
        console.log(validWords);
        console.log(invalidWords);
        console.log(generatedWords);
    }, 30000);
}

generate(generatedWords);
time();
setInterval(time(), 60000);