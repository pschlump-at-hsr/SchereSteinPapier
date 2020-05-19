"use strict"
let players = new Map();
let history;
let activePlayer;
const gameMatrix = [
  [0, 1, -1, -1, 1],
  [-1, 0, 1, -1, 1],
  [1, -1, 0, 1, -1],
  [1, 1, -1, 0, -1],
  [-1, -1, 1, 1, 0]
]

export function loadPlayersFromStorage() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      console.log("Spieler " + localStorage.key(i) + " mit " + localStorage.getItem(localStorage.key(i)) + " Punkten hinzugefügt");
      players.set(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
    }
  }
}

function getSortedPlayersMap() {
  players[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
  }
  return players;
}

export function initNewGameSession(updateView, viewState) {
  let playerName = document.getElementById('name').value;
  history = new Map();
  let errMsg = "";
  if (playerName < 3) {
    errMsg = "Mindestens 3 Zeichen eingeben!";
  } else {
    if (typeof players.get(playerName) === 'undefined') {
      players.set(playerName, 0);
      localStorage.setItem(playerName, '0');
      setRankingOutput(viewState);
    }
    viewState.activePlayer = playerName;
    activePlayer = playerName;
    viewState.newState = "enabled";
  }
  viewState.errMsg = errMsg;
  updateView();
}

function getResultText(rng) {
  let result;
  switch (rng) {
    case 0:
      result = "Schere";
      break;
    case 1:
      result = "Stein";
      break;
    case 2:
      result = "Papier";
      break;
    case 3:
      result = "Brunnen";
      break;
    case 4:
      result = "Streichholz";
      break;
  }
  return result;
}

export function getOutcome(playerSelection, viewState) {
  let comSelection = Math.floor(Math.random() * 5);
  let comResult = getResultText(comSelection);
  let result = gameMatrix[playerSelection][comSelection];
  let resultIcon;
  let outcome;
  viewState.comResult = comResult;
  switch (result) {
    case -1:
      outcome = "Computer hat gewonnen!";
      resultIcon = "&#10062";
      break;
    case 0:
      outcome = "Unentschieden";
      resultIcon = "&#9868";
      break;
    case 1:
      outcome = activePlayer + " hat gewonnen!";
      resultIcon = "&#9989;";
      players.set(activePlayer, String(Number(players.get(activePlayer)) + 1));
      localStorage.setItem(activePlayer, players.get(activePlayer));
      setRankingOutput(viewState);
      break;
  }
  history.set(history.size,{res:resultIcon, playerSelection:getResultText(Number(playerSelection)), comSelection:comResult});
  setHistoryOutput(viewState);
  viewState.outcome = outcome;
}

export function setRankingOutput(viewState) {
  viewState.ranking = "";
  let rank = 0;
  let nrOfPlayers = 0;
  let previousValue = 0;
  const players = getSortedPlayersMap();
  for (let [key, value] of players) {
    if (nrOfPlayers >= 10) {
      break;
    } else {
      if (previousValue !== value) {
        rank++;
      }
      viewState.ranking += "<li><h2>" + rank + ". Rang mit " + value + " Siegen</h2><p>" + key + "</p></li>";
      previousValue = value;
      nrOfPlayers++;
    }
  }
}

function setHistoryOutput(viewState) {
  viewState.history = "<tr><th>Resultat</th><th>Spieler</th><th>Gegner</th></tr>";
  for(let [key,value] of history){
    viewState.history += "<tr><td>"+value.res+"</td><td>"+value.playerSelection+"</td><td>"+value.comSelection+"</td></tr>";
  }
}
