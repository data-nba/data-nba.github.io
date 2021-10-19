var xhr = new XMLHttpRequest();
xhr.addEventListener('loadstart', onLoadStart, false);
xhr.addEventListener('progress', onProgress, false);
xhr.addEventListener('load', onLoad, false);
xhr.addEventListener('error', onError, false);
xhr.addEventListener('abort', onAbort, false);
xhr.open('GET', '/data.txt');
function onLoadStart(evt) {
console.log('Iniciando la petición');
}
function onProgress(evt) {
var porcentajeActual = (evt.loaded / evt.total) * 100;
console.log(porcentajeActual);
}
function onLoad(evt) {
console.log(evt);
}
function onError(evt) {
console.error('Error durante la transferenciao');
}
function onAbort(evt) {
console.error('El usuario ha cancelado la petición');
}