fetch('/data.txt')
.then(function(response)
{

    console.log(response);
    return response.json();

}).
then(data => showSeasonLeaders(data)).catch(e=>document.querySelector('.loading').innerHTML = "Algo salió mal, intenta refrescar la página");
