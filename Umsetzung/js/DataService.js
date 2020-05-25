export let dataState = {
  online: false,
  rankMap: new Map()
};

export function getRank(displayRankFn, updateView) {
  fetch('https://us-central1-schere-stein-papier-eu.cloudfunctions.net/widgets/ranking')
    .then(response => response.json())
    .then(data => {
      displayRankFn(updateView, new Map(Object.entries(data)));
    });

}

export function getServerSelection(playerSelection, playerName, displayFn, updateView) {
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
