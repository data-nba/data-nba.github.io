var xhr = new XMLHttpRequest();
xhr.open("GET","fichero.txt", false);
xhr.send(null);
var data = JSON.parse(xhr.responseText)

