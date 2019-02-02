class SerialNumberGeneratorClass {


    constructor() {
        this.firstSerialInputField = document.getElementById("firstSerialNumber");
        this.numberOfSerialsInputField = document.getElementById("numberOfSerial");
        this.serialRegexPattern = new RegExp(/^\d{5}[A-Z]{1}$/);

    }

    getFirstSerialNumberValue() {
        return this.firstSerialInputField.value;
    }

    getNumberOfSerialValue() {
        return this.numberOfSerialsInputField.value;
    }

    getNumberSection() {
        this.numberSection = Number(this.getFirstSerialNumberValue().slice(0, (this.getFirstSerialNumberValue().length - 1)));

        return this.numberSection;
    }

    //This function return with possible maximum number of serial independently the first serial number.
    getMaximumNumberOfSerial() {
        return (Math.pow(10, (this.getFirstSerialNumberValue().length - 1)) - 1);
    }

    getMaxSnCalculateWithFirstSerial() {
        return (this.getMaximumNumberOfSerial() - this.getNumberSection()) + 1;
    }

    isInvalidSerialFormat() {

        if (this.serialRegexPattern.test(this.firstSerialInputField.value.toUpperCase())) {
            return false;
        } else {
            return true;
        }


    }

    hasTooManySerialNumbers() {

        this.maximumNumber = this.getMaxSnCalculateWithFirstSerial();

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
        this.lastSerialNumber = generatedSerialWithFirstSection;
        this.resultSerialNumber = lineNumber;
    }

    addError(formControl, errorClass, errorMsg, errorCode) {
        formControl.classList.add(`${errorClass}`);
        formControl.focus();
        formControl.select();
        document.getElementsByClassName("invalid-feedback")[errorCode].innerHTML = errorMsg;
        this.errorFlag = true;

    }

    addSucces(formControl, successClass) {
        formControl.classList.remove('is-invalid');
        formControl.classList.add(`${successClass}`);
    }
}

let serialGenerator = new SerialNumberGeneratorClass();
serialGenerator.firstSerialInputField.focus();
serialGenerator.numberOfSerialsInputField.disabled = true;

serialGenerator.firstSerialInputField.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        if (serialGenerator.isInvalidSerialFormat()) {
            serialGenerator.addError(serialGenerator.firstSerialInputField, 'is-invalid',
                'Hibás szériaszám formátum <br> A helyes formátum: <strong>9999X </strong>', 0);

        } else {
            serialGenerator.firstSerialInputField.disabled = true;
            serialGenerator.addSucces(serialGenerator.firstSerialInputField, 'is-valid');
            serialGenerator.numberOfSerialsInputField.disabled = false;
            document.getElementById("numberOfSerial").focus();
        }

    }
});


serialGenerator.numberOfSerialsInputField.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        startGenerating();
    }
});


function startGenerating() {

    document.getElementById('generatedSerials').innerHTML = '';
    // TODO Check invalid serial number format
    if (serialGenerator.isInvalidSerialFormat()) {
        serialGenerator.addError(serialGenerator.firstSerialInputField, 'is-invalid',
            'Hibás szériaszám formátum !!<br> A helyes formátum: <strong>9999X </strong>', 0);

    }
    // Check to many serial number
    if (serialGenerator.hasTooManySerialNumbers()) {
        serialGenerator.addError(serialGenerator.numberOfSerialsInputField, 'is-invalid',
            'Nem lehetséges ennyi szériaszám felvitele ! <br> Maximum <strong> ' + serialGenerator.maximumNumber + ' db </strong> szériaszámot lehet generálni !', 1);

    } else {
        serialGenerator.errorFlag = false;
        serialGenerator.addSucces(serialGenerator.numberOfSerialsInputField, 'is-valid');

        serialGenerator.generatingSerialNumbers(serialGenerator.getNumberOfSerialValue());
        document.getElementById('generatedSerials').select();
        document.getElementById("generatedSerials").focus();
        document.execCommand('copy');
        document.getElementById('resultInfo').style.display = 'block';
        document.getElementById('resultInfo').innerHTML =

    '<strong>' +   serialGenerator.resultSerialNumber + '</strong> szériaszám generálva <br> Az utolsó szériaszám: <strong>' +
            serialGenerator.lastSerialNumber + '</strong>';
        ;
    }

}


// TODO Handling diffrent type of serial number; example: 0012323444E12500001QXC