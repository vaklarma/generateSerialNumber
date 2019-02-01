document.getElementById("firstSerialNumber").focus();

let inputfirstSerialNumberEnterKeyListen = document.getElementById("firstSerialNumber");
inputfirstSerialNumberEnterKeyListen.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("numberOfSerial").focus();
    }
});



let inputnumberOfSerialEnterKeyListen = document.getElementById("numberOfSerial");
inputnumberOfSerialEnterKeyListen.addEventListener("keyup", function (event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === 13) {
        document.getElementById("startButton").click();
    }
});


