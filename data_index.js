var data = {}

fetch('/data.txt', { method: 'get' }).then(
    function(respuesta) {
        data = respuesta.json()
        showSeasonLeaders()
}).catch(function(err) { // Error :( })

