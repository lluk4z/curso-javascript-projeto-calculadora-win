class Controller {

	constructor(){
		
		this._lastOperator = '';
		this._lastNumber = '';

		this._operation = [];
		this._displayCalcEl = document.querySelector("#display");

		this._displayHistorico = document.querySelector("#historico");

		this.initButonsEvents();

	}

	addEventListenerAll(element, events, fn){

		//Separo minha string events com espaço em um array
		//Eu percorro cada um dos eventos do array
		//Para cada evento percorrido eu adiciono ele ao elemento
		events.split(' ').forEach(event => {

			element.addEventListener(event, fn, false);

		});

	}

	clearAll(){

		this._operation = [];
		this.displayCalc = 0;

	}

	clearEntry(){

		this._operation.pop();

		this.setLastNumberToDisplay();
	}

	getLastOperation(){

		return this._operation[this._operation.length - 1];

	}

	setLastOperation(value){

		this._operation[this._operation.length - 1] = value;

	}

	isOperator(value){

		//O indexOf busca o valor de value no array e traz o índex do elemento
		//Se não encontrar ele traz -1
		if(['+', '-', '*', '%', '/'].indexOf(value) > -1){
			return true;
		} else{
			return false;
		}

	}

	pushOperation(value){

		this._operation.push(value);

		//O array com 3 posições já está apto para resolver alguma conta
		if(this._operation.length > 3){

			//Tiro o último ítem do array e guardo na variável last
			//let last = this._operation.pop();

			//Método para realizar um cálculo
			this.calc();

			//console.log(this._operation);

		}

	}

	getResult(){

		console.log('getResult', this._operation);

		return eval(this._operation.join(""));

	}

	calc(){

		let last = '';

		this._lastOperator = this.getLastItem();

		//Se o tamanho do array for menos que tres
		if(this._operation.length < 3){

			//Primeiro item do array
			let firstItem = this._operation[0];
			//Vamos continuar tendo tres itens na nossa operação ao apertar o igual
			this._operation = [firstItem, this._lastOperator, this._lastNumber];

		}

		if(this._operation.length > 3){
			//Tiro o último ítem do array e guardo na variável last
			last = this._operation.pop();

			//Realizar o calculo
			this._lastOperator = this.getLastItem();
			this._lastNumber = this.getResult();
		} else if(this._operation.length == 	3){

			this._lastOperator = this.getLastItem();
			this._lastNumber = this.getLastItem(false);
			
		}

		console.log('_lastOperator', this._lastOperator);
		console.log('_lastNumber', this._lastNumber);

		//Validar o calculo com os elementos do array
		let result = eval(this._operation.join(""));

		if(last == '%'){

			result = result / 100;

			//Só com o result, pois o last já usou na operação
			this._operation = [result];

		}else{

		//Agora meu array terá duas posições
		//A primeira com o valor do resultado calculado
		//e a última com o novo valor q o usuario vai apertar na calculadora
		this._operation = [result];

		//Se last for diferente de vazio adicionamos ele ao array
		//Como ele passa na condição de o array ser maior que 3 o last recebe o ultimo elemento do array
		if(last){

			this._operation.push(last);

		}

		}

		//Para poder mostrar no display o resultado da conta
		this.setLastNumberToDisplay();

	}

	//Como true eu estou a busca do ultimo operador
	//Como false estou a busca do ultimo numero
	getLastItem(isOperator = true){

		let lastItem;

		for(let i = this._operation.length-1; i >= 0; i--){

			if(isOperator){

			//Se for um operador
				if(this.isOperator(this._operation[i])){
					//Já achei o número que queria
					lastItem = this._operation[i];
					break;
				}

			} else{

				if(!this.isOperator(this._operation[i])){
					//Já achei o número que queria
					lastItem = this._operation[i];
					break;
				}

		}

	}

		//Se não encontrou o lastItem, continua com o ultimo que estava na memória
		//Para corrigir o erro do operator undefined
		if(!lastItem){

				//Se isso for verdade  //Executa isso       //senão executa isso
			lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

			//Se o lastItem for um operador, chama o ultimo operador na memoria
			//Se não, chama o último numero na memoria

		}
		return lastItem;

	}

	setLastNumberToDisplay(){

		//Percorrer o array do final para o começo procurando o próximo número
		let lastNumber;

		for(let i = this._operation.length-1; i >= 0; i--){

			//Se não for um operador, ou seja, se eu achar um número
			if(!this.isOperator(this._operation[i])){
				//Já achei o número que queria
				lastNumber = this._operation[i];
				break;
			}

		}
		//Seto o display da calculadora para mostar o último número do array
		this.displayCalc = lastNumber;

	}

	operacao(){

		return this._operation;
	}

	quadrado(value){

		return Math.pow(value, 2);

		console.log(Math.pow(value, 2));

		this.setLastNumberToDisplay();

	}

	setHistoricoToDisplay(){

		//console.log('A',value, isNaN(this.getLastOperation()));
		let lastNumber;
		let array;

		for(let i = this._operation.length-1; i >= 0; i--){

			//Se não for um operador, ou seja, se eu achar um número
			if(!this.isOperator(this._operation[i])){
				//Já achei o número que queria
				lastNumber = this._operation[i];
				break;
			}

		}

		//console.log('getResult', this._operation);

		//array = [lastNumber ,this.getLastItem()];

		this.displayHistorico = this.operacao().join('');

	}

	addOperation(value){

		console.log('A',value, isNaN(this.getLastOperation()));

		//Preciso verificar se o último elemento do array é um número
		if(isNaN(this.getLastOperation())){
			//String

			if(this.isOperator(value)){
				//Trocar o operador
				//Se a ultima operação do array for um operador e se
				//o valor digitado for um operador, eu troco a ultima
				//posição do array pelo novo valor informado
				this.setLastOperation(value);

			}else{

				//Se chegar ai significa q é um numero e é a primeira vez
				//que estou digitando um valor para armazenar no array

				//this._operation.push(value);

				this.pushOperation(value);

				//Como o primeiro elemento do array é undefined
				//Precisamos setá-lo assim q cair no primeiro numero
				this.setLastNumberToDisplay();
				this.setHistoricoToDisplay();

			}

		}else{

			if(this.isOperator(value)){

				//Se o valor a ser inserido é um operador e o
				//último elemento do array é um número
				//Coloco o valor em uma posição do array
				//this._operation.push(value);
				this.pushOperation(value);
			}else{

							//Número
				//Transformo o último elemento do array em String, sabendo que ele é um número
				//Então eu concateno com o valor que está sendo inserino transformando-o em string
				let newValue = this.getLastOperation().toString() + value.toString();

				//Recebe o valor em questão que está sendo informado no momento
				
				//this._operation.push(newValue);

				//Não posso fazer um push no array com o novo valor
				//tenho que trocar a ultima posição do array pelo novo valor
				this.setLastOperation((newValue));


				//ATUALIZAR DISPLAY
				this.setLastNumberToDisplay();
				this.setHistoricoToDisplay();

			}

	

		}

		

		console.log(this._operation);

	}

	setError(){
		this.displayCalc = "ERROR";
	}

	addDot(){

		let lastOperation = this.getLastOperation();

		//Verificar se a operação existe e se ela possui um ponto
		if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1){
			return;
		}

		//Se a ultima operação for um operador ou se ele não existir
		if(this.isOperator(lastOperation) || !lastOperation){

			this.pushOperation('0.');

		} else {
			this.setLastOperation(lastOperation.toString() + '.');
		}

		this.setLastNumberToDisplay();

	}

	execBtn(value){

		switch(value){

			case 'c':
				this.clearAll();
				break;
			case 'ce':
				this.clearEntry();
				break;
			case 'soma':
				this.addOperation('+');
				break;
			case 'subtracao':
				this.addOperation('-');
				break;
			case 'divisao':
				this.addOperation('/');
				break;
			case 'multiplicacao':
				this.addOperation('*');
				break;
			case 'porcento':
				this.addOperation('%');
				break;
			case 'quadrado':
				this.quadrado(value);
				break;
			case 'igual':
				this.calc();
				break;
			
			case 'ponto':
				this.addDot();
				break;
			
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				this.addOperation(parseInt(value));
				break;

			default:
				this.setError();
				break;
			


		}

	}

	initButonsEvents(){

		//Pegar todas as div que são filhas de container
		let buttons = document.querySelectorAll(".row > button");

		//addEventListener é um metodo pra UM elemento, não uma lista
		//querySelectorAll seleciona uma lista de elementos
		//Temos que percorrer cada item da lista buttons

		buttons.forEach((btn, index)=>{

			this.addEventListenerAll(btn ,'click drag', e=>{
				
				//Variável que obtem o texto do nome do botão
				//Esse btn é p botão da vez o qual é clicado
				let textBtn = btn.id.replace("btn-", "");

				//Executar a ação do botão
				//Temos que passar o valor que é o texto do botão
				//Quando clica no botão ele executa essa função que é oq o botão vai fazer
				this.execBtn(textBtn);

				//console.log(textBtn);

			});

		});
		


	}

	get displayCalc() {

		return this._displayCalcEl.innerHTML;

	}

	set displayCalc(value){

		//Posso converter value para string
		//value.toString().length > 11
		if(value.length > 11){
			this.setError();
			return false;
		}

		this._displayCalcEl.innerHTML = value;

	}

	get displayHistorico(){

		return this._displayHistorico.innerHTML;

	}

	set displayHistorico(value){

		//console.log('A',value, isNaN(this.getLastOperation()));

		this._displayHistorico.innerHTML = value;

	}

}