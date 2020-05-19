"use strict"

let players = new Map();
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

function getComResult(rng) {
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
  let result = gameMatrix[playerSelection][comSelection];
  let outcome;
  viewState.comResult = getComResult(comSelection);
  switch (result) {
    case -1:
      outcome = "Computer hat gewonnen!";
      break;
    case 0:
      outcome = "Unentschieden";
      break;
    case 1:
      outcome = activePlayer + " hat gewonnen!";
      players.set(activePlayer, String(Number(players.get(activePlayer)) + 1));
      localStorage.setItem(activePlayer, players.get(activePlayer));
      setRankingOutput(viewState);
      break;
  }
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
