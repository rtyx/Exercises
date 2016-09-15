var textarea = document.getElementById('textarea');
var errormessage = document.getElementById('errormessage');

window.addEventListener("load", textarea.focus());

document.getElementById('checkbutton').addEventListener("click", function checkJSON() {
    try {
        JSON.parse(textarea.value);
        console.log("It's a JSON");
        textarea.classList.add("green");
    } catch (error) {
        console.log(error);
        textarea.classList.add("red");
        errormessage.innerHTML = error;
        console.log("It's not a JSON");
    }
});
