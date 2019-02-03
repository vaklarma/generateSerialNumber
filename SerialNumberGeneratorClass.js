class SerialNumberGeneratorClass {


    constructor() {
        this.firstSerialInputField = document.getElementById("firstSerialNumber");
        this.numberOfSerialsInputField = document.getElementById("numberOfSerial");
        this.generatedSerialNumbersField = document.getElementById("generatedSerials");
        this.resultInfoBox = document.getElementById('resultInfo');
        this.serialRegexPattern = new RegExp(/^\d{5}[A-Z]{1}$/);

    }

    clearGeneratedSerialNumbersField() {
        this.generatedSerialNumbersField.innerHTML = '';
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
            this.generatedSerialNumbersField.innerHTML += generatedSerialWithFirstSection + '\n';
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
        this.clearGeneratedSerialNumbersField();
        serialGenerator.resultInfoBox.style.display = 'none';
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
            serialGenerator.numberOfSerialsInputField.focus();
        }

    }
});


serialGenerator.numberOfSerialsInputField.addEventListener("keyup", function (event) {
    event.preventDefault();


    if (event.keyCode === 13) {

        let valueFromInputField = Number(document.getElementById("numberOfSerial").value);
        if ((!Number.isNaN(Number(valueFromInputField)) && (valueFromInputField > 0))) {
            if (Number.isInteger(valueFromInputField)) {
                startGenerating();
            } else {
                serialGenerator.addError(serialGenerator.numberOfSerialsInputField, 'is-invalid',
                    'Egész számot kérek !<br> légyszi ...', 1);
            }
        } else {
            serialGenerator.addError(serialGenerator.numberOfSerialsInputField, 'is-invalid',
                'Számot írj be kérlek !<br> légyszi ... ', 1);

        }
    }
});


function startGenerating() {

    serialGenerator.clearGeneratedSerialNumbersField();
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
        serialGenerator.generatedSerialNumbersField.select();
        serialGenerator.generatedSerialNumbersField.focus();
        document.execCommand('copy');
        serialGenerator.resultInfoBox.style.display = 'block';
        serialGenerator.resultInfoBox.innerHTML =

            '<strong>' + serialGenerator.resultSerialNumber + '</strong> szériaszám generálva <br> Az utolsó szériaszám: <strong>' +
            serialGenerator.lastSerialNumber + '</strong>';
        ;
    }

}


// TODO Handling diffrent type of serial number; example: 0012323444E12500001QXC