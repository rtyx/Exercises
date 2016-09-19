var textarea = document.getElementById('textarea');
var message = document.getElementById('message');

window.addEventListener("load", textarea.focus());

function itsJSON() {
    console.log("It's a JSON");
    textarea.classList.remove("red");
    textarea.classList.add("green");
    message.classList.add("okmessage");
    message.classList.remove("errormessage");
    message.innerHTML = "More JSON than my son Jason! <br> Good to go kiddo. </br>";
}

function itsNotJSON(error) {
    console.log(error);
    textarea.classList.remove("green");
    textarea.classList.add("red");
    message.classList.remove("okmessage");
    message.classList.add("errormessage");
    message.innerHTML = "Oops, that doesn't look like a JSON <br>" + error + "</br>";
    console.log("It's not a JSON");
}

document.getElementById('checkbutton').addEventListener("click", function checkJSON() {
    try {
        JSON.parse(textarea.value);
        itsJSON();
    } catch (error) {
        itsNotJSON(error);
    }
});
