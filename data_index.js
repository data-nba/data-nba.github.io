function fetchData()
{
    fetch('/data.txt').then(res=>res.json()).then((result)=>{console.log(result);
    showSeasonLeaders(result)}, (error)=>{console.log(error)})
}