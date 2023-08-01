import { LightningElement } from 'lwc';

export default class CurrenyConverterLWCDemo extends LightningElement {

    showOutput= false
    currencyOptions=[]
    enteredFromCurrency=''
    enteredToCurrency=''
    convertedCurrency=''
    enteredAmount =''
    handleChange(event){

        let{name,value} = event.target;
        if(name==='FromCurr') this.enteredFromCurrency = value;
        if(name==='ToCurr') this.enteredToCurrency = value;
        if(name==='Amount') this.enteredAmount = value;

    }

    connectedCallback(){
        this.handleCurrencyOption()
    }

    async handleCurrencyOption(){

        let endpoint = 'https://api.frankfurter.app/currencies';

        let response = await fetch(endpoint)

        if(!response.ok){
            throw new Error ('Not able to fetch the currencies')     
        }

            console.log(response)
            const data = await response.json();
            console.log('Received Response in JSON format:::',data)
            let ops =[]
            // eslint-disable-next-line guard-for-in, no-undef
            for(let symbol in data){
                // eslint-disable-next-line no-undef
                ops =[...ops,{label:symbol,value:symbol}];
            }
            this.currencyOptions = [...ops]

        
    }
    handleClick(){
        console.log('Came inside handleclick')
        this.handlerConversion()
    }

    async handlerConversion(){

let response = await fetch(`https://api.frankfurter.app/latest?amount=${this.enteredAmount}&from=${this.enteredFromCurrency}&to=${this.enteredToCurrency}`)
 
if(!response.ok){
    throw new Error ('Not able to fetch the currencies')     
}

    console.log(response)
    const data = await response.json();
    this.convertedCurrency=data.rates[this.enteredToCurrency]
    this.showOutput =true
    }
}