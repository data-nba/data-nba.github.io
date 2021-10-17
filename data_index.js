function good(callback, data)
{
    console.log("data")
    document.querySelector('.loading').style.display = 'none'
    var data = JSON.parse(xhr.responseText);
    callback(data)
}

function notGood()
{
console.log("not good")
}

function data(callback)
{
    console.log("ok")
    var xhr = new XMLHttpRequest();
    xhr.open("GET","data.txt", true);
    xhr.onreadystatechange = function()
    {  if (xhr.readyState === 4) {
        var status = xhr.status;
        if ((status >= 200 && status < 300) || (status === 304))
        {
            window.onload = good.bind(this, callback, data)
        }
        else
        {
            window.onload = notGood
        }

    }
 };

 xhr.send(null)
}
