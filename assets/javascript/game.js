let wins=0;

const animalChoices = ['caracal', 'narwal','ocelot','capybara','gazelle','hyena','koala','platypus','baboon','chimpanzee','cheetah','wolf','badger','camel','mongoose','lemur','cobra','civet','leopard'];
let selectedWord = "";
let lettersInWord=[];
let numBlanks=0;
let blanksAndSuccesses=[];
let wrongGuesses=[];
    
let letterGuessed="";
let guessesRemaining=8;

function PlayGame(){
    
    guessesRemaining=8;
    blanksAndSuccesses=[];
    wrongGuesses=[];

    selectedWord = animalChoices[Math.floor(Math.random()*animalChoices.length)];

    //Now breaking word into individual letters
    lettersInWord = selectedWord.split("");

    numBlanks=lettersInWord.length;
    console.log(selectedWord);

    for (let i=0;i<numBlanks; i++){
        if (lettersInWord.toString() === blanksAndSuccesses.toString().replace("*", " ")) {
            blanksAndSuccesses.push("*");
        } else {
            blanksAndSuccesses.push("_");
        }
    }

    console.log(blanksAndSuccesses)

    //Need to get guesses lef
    document.getElementById("guessesRemaining").innerHTML = "Number of Guesses Remaining: " + guessesRemaining;

    //print blanks
    document.getElementById("correctGuesses").innerHTML = blanksAndSuccesses.join(" ");

    //resets number of wrong guesses
    document.getElementById("wrongGuesses").innerHTML = "Wrong Guesses: " + wrongGuesses.join(" ");
}

//now check letters
function checkLetters(letter){
    let letterInWord = false;
    for (var i=0; i< numBlanks; i++){
        if (selectedWord[i]===letter){
            letterInWord=true;
        }
    }
    //now figure out where the letter goes
    if(letterInWord){
        for(let i=0; i<numBlanks; i++){
            if(selectedWord[i] === letter){
                blanksAndSuccesses[i] = letter; //set space to equal correct letter when a match
            }
        }
        console.log(blanksAndSuccesses);
    }
    else{
        wrongGuesses.push(letter);
        guessesRemaining--;
    }
}

function roundComplete() {
    console.log("win count: " + wins + "  Guesses Remaining: " + guessesRemaining);

    //output to html
    document.getElementById("guessesRemaining").innerHTML = "Number of Guesses Remaining: " + guessesRemaining;
    document.getElementById("correctGuesses").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = "Wrong Guesses: " + wrongGuesses.join(" ");

    if(lettersInWord.toString()===blanksAndSuccesses.toString()){
        wins++;
        alert("You guessed the animal!");
        document.getElementById("wins").innerHTML = "Wins: " + wins;
        PlayGame();
    }

    else if (guessesRemaining ===0){
        alert("You are out of guesses.  You lose!");
        wins=0;
        document.getElementById("wins").innerHTML = "Wins: " +wins;
        PlayGame();
    }
}


PlayGame();
//now need to capture keys clicking, but have to make it so can't repeat per the demo
document.onkeyup = function(event){
    let letterGuessed;
    if(event.keyCode >=65 && event.keyCode <=90){
        letterGuessed = event.key;

        if(wrongGuesses.indexOf(letterGuessed) !==-1){
            alert("You already guessed that letter.");
            return;
        }

        //check for correct guesses
        checkLetters(letterGuessed);

        roundComplete();
    }
}
