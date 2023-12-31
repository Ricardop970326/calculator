class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElemen) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElemen = currentOperandTextElemen;
    this.clear();
    }

    clear(){
     this.currentOperand = ''
     this.previousOperand = ''
     this.operation = ''
    }

    delete() {
       this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        this.currentOperand = this.currentOperand.toString() + number.toString(number);
    }

    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '' ;
    }
    
    compute(){
     let computation
     const prev = parseFloat(this.previousOperand);
     const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
     switch(this.operation){
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case '*':
            computation = prev * current 
            break
        case '%':
            computation = prev % current
            break
        case 'EXP':
            computation = (prev ** current)

            break
        case '/':
            if (current === 0) this.error = "Can not divide by zero so this is null";
        else computation = prev / current;
            break  
        default:
           return
     }

    
     
     this.currentOperand = computation;
     this.operation = undefined;
     this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0 });
        }
        if (decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
    } else {
       return integerDisplay}
    }

    updateDisplay(){
        if (this.error) {
            this.currentOperandTextElemen.innerText = this.error;
            return;
          }
     this.currentOperandTextElemen.innerText = this.getDisplayNumber(this.currentOperand);
     if(this.operation != null){
        this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}  ${this.currentOperand}`;
     } else if(this.operation = null) {
        this.previousOperandTextElement.innerText = ''
     }
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const screenDisplayTextElement = document.querySelector('[data-displary]');

const deleteButton = document.querySelector('[data-deleted]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElemen = document.querySelector('[data-current-operand]');




const calculator = new Calculator(previousOperandTextElement, currentOperandTextElemen);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay(); 
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', _button => {
    calculator.compute()
    calculator.updateDisplay('previousOperandTextElement');
})

allClearButton.addEventListener('click', _button =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', _button =>{
    calculator.delete();
    calculator.updateDisplay();
})

