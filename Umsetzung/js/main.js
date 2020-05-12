(
  function(){
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }

  let openRequest = indexedDB.open("3SPB",1);

openRequest.onupgradeneeded = function () {
  let db = openRequest.result;
  switch (db.version) {
    case 0:
      db.createObjectStore("player",{keyPath: 'name'});
    case 1:
      return;
  }
  }

openRequest.onerror = function () {
  console.error("Error", openRequest.error);
}

openRequest.onsuccess = function () {
  let db = openRequest.result;
}
}()

)
function start_game(player) {
  if(player == 0){
    window.alert("Bitte einen Namen eingeben!");
  }

}
