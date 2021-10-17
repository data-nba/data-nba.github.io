fetch('/data.txt').then(response => response.json()).then(data => showSeasonLeaders(data)).catch(e=>document.querySelector('.loading').innerHTML = "Algo salió mal, intenta refrescar la página");
