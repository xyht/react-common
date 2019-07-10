(function(){
  var docEl = document.documentElement;

  function setRemUint() {
    var rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + 'px'
  }
  setRemUint()

  window.addEventListener('resize', setRemUint)
})()

var docEl = document.documentElement;
console.log(docEl.clientWidth / 10)