function fetchData()
{
    fetch('/data.txt').then(res=>res.json()).then((result)=>{console.log("hey")}, (error)=>{console.log(error)})
}