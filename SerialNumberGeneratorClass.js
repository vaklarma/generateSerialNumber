class SerialNumberGeneratorClass {


    constructor() {
        this.firstSerialInputField = document.getElementById("firstSerialNumber");
        this.numberOfSerials = document.getElementById("numberOfSerial");

    }

    getFirstSerialNumberValue() {
        return this.firstSerialInputField.value;
    }

    getNumberOfSerialValue() {
        return this.numberOfSerials.value;
    }

    getNumberSection() {
        this.numberSection = Number(this.getFirstSerialNumberValue().slice(0, (this.getFirstSerialNumberValue().length - 1)));
        console.log(this.numberSection);
        return this.numberSection;
    }

    getNumberSectionLengthAsNumber() {
        return Number(String(this.getNumberSection()).length);
    }

    //This function return with possible maximum number of serial independently the first serial number.
    getMaximumNumberOfSerial() {
        return (Math.pow(10, (this.getFirstSerialNumberValue().length - 1)) - 1);
    }

    getMaxSnCalculateWithFirstSerial() {
        // console.log('getMaximumNumberOfSerial: ',this.getMaximumNumberOfSerial());
        // console.log('getNumberSection: ',this.getNumberSection());
        return (this.getMaximumNumberOfSerial() - this.getNumberSection()) + 1;
    }

    hasTooManySerialNumbers() {

        console.log('getMaxSnCalculateWithFirstSerial: ', this.getMaxSnCalculateWithFirstSerial());

        if (this.getNumberOfSerialValue() > this.getMaxSnCalculateWithFirstSerial()) {
            return true;
        } else {
            return false;
        }
    }

    generatingSerialNumbers(numberOfSerial) {
        let generatedSerial = '';
        let fillNullNumber;
        let lineNumber;
        let generatedSerialWithFirstSection;
        let firstSectionString = '';
        let serialLength = this.getFirstSerialNumberValue().length;
        let lastAlphabeticCaracter = (this.getFirstSerialNumberValue().slice((this.getFirstSerialNumberValue().length - 1), this.getFirstSerialNumberValue().length)).toUpperCase();
        let numberSection = this.getNumberSection();

        ///generating loop
        for (let i = 0; i < numberOfSerial; i++) {
            generatedSerial = numberSection + lastAlphabeticCaracter;
            fillNullNumber = serialLength - generatedSerial.length;

            for (let j = 0; j < fillNullNumber; j++) {
                firstSectionString += '0';
            }

            lineNumber = i + 1;
            generatedSerialWithFirstSection = firstSectionString + generatedSerial;
            document.getElementById('generatedSerials').innerHTML += generatedSerialWithFirstSection + '\n';
            firstSectionString = '';
            numberSection++;
        }
    }

    addError(formControl, errorClass, errorMsg, errorCode) {
        formControl.classList.add(`${errorClass}`);
        formControl.focus();
        formControl.select();
        document.getElementsByClassName("invalid-feedback")[errorCode].innerHTML += errorMsg;
    }
    addSucces(formControl,successClass) {
        formControl.classList.remove('is-invalid');
        formControl.classList.add(`${successClass}`);
    }
}

let serialGenerator = new SerialNumberGeneratorClass();
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





function startGenerating() {
    document.getElementById('generatedSerials').innerHTML = '';
    if (serialGenerator.hasTooManySerialNumbers()) {
        serialGenerator.addError(serialGenerator.numberOfSerials, 'is-invalid', 'Nem lehetséges ennyi szériaszám felvitele !', 1);

    } else {
        serialGenerator.addSucces(serialGenerator.numberOfSerials, 'is-valid');

        serialGenerator.generatingSerialNumbers(serialGenerator.getNumberOfSerialValue());
    }

}


// TODO Handling diffrent type of serial number; example: 0012323444E12500001QXC