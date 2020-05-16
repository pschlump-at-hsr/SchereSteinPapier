let player = new Map();
let activePlayer;
const gameMatrix = [
  [0,1,-1,-1,1],
  [-1,0,1,-1,1],
  [1,-1,0,1,-1],
  [1,1,-1,0,-1],
  [-1,-1,1,1,0]
]

function init() {
  if (localStorage.length > 0){
    for(let i = 0;i < localStorage.length ; i++){
      console.log("Spieler "+localStorage.key(i)+" mit "+localStorage.getItem(localStorage.key(i))+" Punkten hinzugefügt");
      player.set(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
    }
  }
  displayRanking();
  document.getElementById('startGame').addEventListener('click', function () {

    let playerTextBox = document.getElementById('name');
    let errmsg  = document.getElementById('errmsg');
    if (playerTextBox.value < 3) {
      errmsg.innerHTML="Mindestens 3 Zeichen eingeben!";
    } else {
      errmsg.innerHTML="";
      if (typeof player.get(playerTextBox.value) == 'undefined') {
        player.set(playerTextBox.value, 0);
        localStorage.setItem(playerTextBox.value, '0');
        console.log(playerTextBox.value + " wurde dem Storage hinzugefügt.");
        displayRanking();
      }
      startGame(playerTextBox.value);
    }
  });

  for(let button of document.getElementsByClassName("selector")) {

    button.addEventListener('click', () => {
      let playerSelection = button.id;
      let comSelection = Math.floor(Math.random() * 5);
      let result = gameMatrix[playerSelection][comSelection];
      let outcome;
      console.log("player:" + playerSelection + " COM: " + comSelection + " Result:"+ result);
      document.getElementById("comResult").value = getComResult(comSelection);
      switch (result) {
        case -1: outcome = "Computer hat gewonnen!"; break;
        case 0: outcome = "Unendschieden"; break;
        case 1: outcome = activePlayer+" hat gewonnen!";
        player.set(activePlayer, Number(player.get(activePlayer)) + 1);
        break;
      }
      document.getElementById("outcome").innerText = outcome;
      displayRanking();
    });
  }
}

function getComResult(rng) {
  let result;
  switch (rng) {
    case 0: result = "Schere"; break;
    case 1: result = "Stein"; break;
    case 2: result = "Papier"; break;
    case 3: result = "Brunnen"; break;
    case 4: result = "Streichholz"; break;
  }
  return result;
}

function startGame(player) {
  activePlayer = player;
  document.getElementById("gamer").innerText = player;
  document.getElementById("gamble").style.display = "block";
}

function displayRanking() {
  let ranking = "";
  let rank = 1;
  player[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a,b) => b[1]-a[1]);
  }
  for (let [key, value] of player) {
    if (rank >= 6) {
      break;
    } else {
      console.log("Spieler " + key + " mit " + value + " Siegen");
      ranking += "<li><h2>" + rank + ". Rang mit " + value + " Siegen</h2><p>" + key + "</p></li>";
      rank++;
    }
  }
  document.getElementById('entries').innerHTML = ranking;
}
window.addEventListener('load', init);
