"use strict"

let players = new Map();
let history;
export let activePlayer;
const gameMatrix = [
  [0, 1, -1, -1, 1],
  [-1, 0, 1, -1, 1],
  [1, -1, 0, 1, -1],
  [1, 1, -1, 0, -1],
  [-1, -1, 1, 1, 0]
]
export let viewState = {
  ranking: "",
  errMsg: "",
  outcome: "",
  oldState: "invisible",
  newState: "invisible",
  activePlayer: "",
  comResult: "",
  history: "<tr><th>Resultat</th><th>Spieler</th><th>Gegner</th></tr>",
  online: "Server"
}

export function loadPlayersFromStorage() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      players.set(localStorage.key(i), Number(localStorage.getItem(localStorage.key(i))));
    }
  }
}

function getSortedPlayersMap(unsortedMap) {
  unsortedMap[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => typeof b[1].win === 'undefined' ? b[1] - a[1] : b[1].win - a[1].win);
  }
  return unsortedMap;
}

export function initNewGameSession(updateView) {
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
  updateView(viewState);
}

export function getResultText(rng) {
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

export function displayOutcome(comResult, result, playerSelection, updateView) {
  let resultIcon, outcome;
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
      break;
  }
  history.set(history.size, {
    res: resultIcon,
    playerSelection: playerSelection,
    comSelection: comResult
  });
  setHistoryOutput(viewState);
  viewState.outcome = outcome;
  updateView(viewState);
}

export function getOutcome(playerSelection, updateView) {
  let comSelection = Math.floor(Math.random() * 5);
  let comResult = getResultText(comSelection);
  let result = gameMatrix[playerSelection][comSelection];
  displayOutcome(comResult, result, getResultText(Number(playerSelection)),updateView);
}

export function setRankingOutput(updateView, map = players) {
  viewState.ranking = "";
  let rank = 0;
  let nrOfPlayers = 0;
  let previousValue = 0;
  let correctedValue = 0;
  let sortedMap = getSortedPlayersMap(map);
  for (let [key, value] of sortedMap) {
    if (nrOfPlayers >= 10) {
      break;
    } else {
      if (previousValue !== value) {
        rank++;
      }
      if (typeof value.win === 'undefined') {
        correctedValue = value;
      } else {
        correctedValue = value.win;
      }
      viewState.ranking += "<li><h2>" + rank + ". Rang mit " + correctedValue + " Siegen</h2><p>" + escape(key) + "</p></li>";
      previousValue = value;
      nrOfPlayers++;
    }
  }
  updateView(viewState);
}

function setHistoryOutput() {
  viewState.history = "<tr><th>Resultat</th><th>Spieler</th><th>Gegner</th></tr>";
  //key is not used, but necessary for it to work
  for (let [key, value] of history) {
    viewState.history += "<tr><td>" + value.res + "</td><td>" + value.playerSelection + "</td><td>" + value.comSelection + "</td></tr>";
  }
}
