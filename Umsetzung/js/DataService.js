export let dataState = {
  online: false,
  rankMap: new Map()
};
const gameMatrix = [
  [0, 1, -1, -1, 1],
  [-1, 0, 1, -1, 1],
  [1, -1, 0, 1, -1],
  [1, 1, -1, 0, -1],
  [-1, -1, 1, 1, 0]
]
export function getRank(displayRankFn, updateView) {
  if (dataState.online) {
    fetch('https://us-central1-schere-stein-papier-eu.cloudfunctions.net/widgets/ranking')
      .then(response => response.json())
      .then(data => {
        displayRankFn(updateView, new Map(Object.entries(data)));
      });
  } else {
    displayRankFn(updateView);
  }

}

export function getOutcome(playerSelection, playerName, displayFn, updateView) {
  let playerSelectionText = getResultText(playerSelection);
  if (dataState.online) {
    getServerSelection(playerSelectionText, playerName, displayFn, updateView);
  } else {
    getComSelection(playerSelection, displayFn, updateView);
  }
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

function getComSelection(playerSelection, displayFn, updateView) {
  let comSelection = Math.floor(Math.random() * 5);
  let comResult = getResultText(comSelection);
  let result = gameMatrix[playerSelection][comSelection];
  displayFn(comResult, result, getResultText(Number(playerSelection)),updateView);
}

function getServerSelection(playerSelection, playerName, displayFn, updateView) {
  let url = 'https://us-central1-schere-stein-papier-eu.cloudfunctions.net/widgets/play?playerName=' + playerName + '&playerHand=' + playerSelection;
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  })
    .then(response => response.json())
    .then(data => {
      let result;
      switch (data.win) {
        case true:
          result = 1;
          break;
        case false:
          result = -1;
          break;

        default:
          result = 0;
      }
      displayFn(data.choice, result, playerSelection, updateView)
    });
}
