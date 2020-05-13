const choices = ['Schere', 'Stein', 'Papier', 'Brunnen', 'Streichholz'];

export function getTrickResult(playerHand) {
  // TODO Dummy Impl ersetzen, falls erwünscht
  const choice = choices[Math.floor(Math.random() * choices.length)];
  return {choice, win: Math.round(Math.random()) === 0};
}