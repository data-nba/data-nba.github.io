function fetchData()
{
    var interval = setInterval(loadingAnimation, 300);
    fetch('/data.txt').then(res=>res.json()).then((result)=>{
    clearInterval(interval)
    showSeasonLeaders(result)}, (error)=>{
        clearInterval(interval)
        document.querySelector(".loading").innerHTML = 
    "Ocurrió un herror, intenta recargar la página";}).catch(()=>
    {
        clearInterval(interval)
        document.querySelector(".loading").innerHTML = 
    "Ocurrió un herror, intenta recargar la página";
    }
    );
}