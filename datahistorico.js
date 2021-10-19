function fetchData()
{
    var interval = setInterval(loadingAnimation, 200);
    fetch('/data.txt').then(res=>res.json()).then((result)=>{
    clearInterval(interval)
    showHistoricStats(result)}, (error)=>{
        clearInterval(interval)
        document.querySelector(".loading").innerHTML = 
    "Ocurrió un error, intenta recargar la página";}).catch(()=>
    {
        clearInterval(interval)
        document.querySelector(".loading").innerHTML = 
    "Ocurrió un error, intenta recargar la página";
    }
    );
}

fetch('/data.txt').then(response => response.json()).then(data => showHistoricStats(data)).catch(e=>document.querySelector('.loading').innerHTML = "Algo salió mal, intenta refrescar la página");