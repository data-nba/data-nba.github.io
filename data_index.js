function data()
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET","data.txt", true);
    xhr.onreadystatechange = function()
    {  if (xhr.readyState === 4) {
        console.log(xhr.responseText)
        var data = JSON.parse(xhr.responseText);
        showSeasonLeaders(data)
    }
 }; 
 
 xhr.send(null)
}

window.onload = data;