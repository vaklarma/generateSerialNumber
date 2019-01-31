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
    let maximumNumberOfSerial = 9999 - numberSection;
    let generatedSerial = '';
    let fillNullNumber;
    let firstSectionString = '';
    let generatedSerialWithFirstSection;
    console.log(maximumNumberOfSerial);
    if (numberOfSerial < maximumNumberOfSerial) {


        document.getElementById('generatedSerials').innerHTML = '';
        for (let i = 0; i < numberOfSerial; i++) {
            generatedSerial = numberSection + lastAlphabeticCaracter;


            fillNullNumber = serialLength - generatedSerial.length;
            for (let j = 0; j < fillNullNumber; j++) {
                firstSectionString += '0';
            }

            generatedSerialWithFirstSection = firstSectionString + generatedSerial;
            document.getElementById('generatedSerials').innerHTML += generatedSerialWithFirstSection + '\n';

            firstSectionString = '';

            numberSection++;
        }
        document.getElementById('generatedSerials').select();
        document.execCommand("copy");
        document.getElementById("generatedSerials").focus();
    } else
    {
        var element = document.getElementById("numberOfSerial");
        element.classList.add("is-invalid");


        document.getElementById("numberOfSerial").focus();
        document.getElementById('numberOfSerial').select();
        return false;
    }
}