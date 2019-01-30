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
    if (event.keyCode === 13) {
        document.getElementById("startButton").click();
    }
});


function generateSerialNumbers(param, numberOfSerial) {
    let firstSerialNumber = param.toUpperCase();
    let serialLength = param.length;
    let lastAlphabeticCaracter = firstSerialNumber.slice(serialLength - 1, serialLength);
    let numberSection = Number(firstSerialNumber.slice(0, serialLength - 1));
    let generatedSerial = '';
    let fillNullNumber;
    let firstSectionString = '';
    let generatedSerialWithFirstSection;
    document.getElementById('generatedSerials').innerHTML = '';
    for (let i = 0; i < numberOfSerial; i++) {
        generatedSerial = numberSection + lastAlphabeticCaracter;


        fillNullNumber = serialLength - generatedSerial.length;
        for (let j = 0; j < fillNullNumber; j++) {
            firstSectionString += '0';
        }
        console.log(firstSectionString);
        generatedSerialWithFirstSection = firstSectionString + generatedSerial;
        document.getElementById('generatedSerials').innerHTML += generatedSerialWithFirstSection + '\n';

        firstSectionString = '';

        numberSection++;
    }
    document.getElementById('generatedSerials').select();
    document.execCommand("copy");
    document.getElementById("generatedSerials").focus();
}