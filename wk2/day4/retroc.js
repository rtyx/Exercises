/*function getClasses() {
    var startingPoint = document.body;
    var desiredElements = [];

    function letsDothis(something) {
        var childrenOf = something.children;
        for (var i=0; i <= childrenOf.length; i++) {
            desiredElements.push(childrenOf[i]);
        }
        letsDothis(childrenOf[i]);
    }

    letsDothis(startingPoint, desiredElements);
    console.log(desiredElements);
    return desiredElements;
}

getClasses("boxes");*/

/*
var alldescendants = [];

var t = document.body.childNodes;
    for(i = 0; i < t.length; i++)
        if (t[i].nodeType == 1)
            recurseAndAdd(t[i], alldescendants);

function recurseAndAdd(el, descendants) {
  descendants.push(el.id);
  var children = el.childNodes;
  for(i=0; i < children.length; i++) {
     if (children[i].nodeType == 1) {
         recurseAndAdd(children[i]);
     }
  }
}
*/

/*
fucntion getElementByClassName(className) {
  var a = arguments[2] || [];
  var elem = arguments[1] || document.documentElement;

  if (hasClass(elem)) {
    a.push(elem;)
  }
  var i = 0;
  var children = elem.children;

  while (children[i]) {
    getElementByClassName(className, children[i], a);
    i++;
  }
  function hasClass(elem) {
    return elem.classList.contains(className);
  }
  return a;
};
*/

function hasClassName ()
