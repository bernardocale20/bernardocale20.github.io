var timerId = null; //variável que armazena a chamada da função timeout

function iniciaJogo(){

	var url = window.location.search; //Esse atributo pega a url inteira
	
	var nivel_jogo = url.replace("?", "");  //Aqui eu removo o ponto de interrogação que fica na url, esses dois atributos, esse e o de cima modificam a string da url

	var tempo_segundos = 0; //Aqui eu configuro os niveis de dificuldade que alteram o tempo do jogo de acordo com o nivel de dificuldade escolhido, 
	//aqui eu crio uma variavel que se interligara com a variavel nivel_jogo que eu criei anteriormente e retornara o valor dela de acordo com oq eu programar aqui.

	if(nivel_jogo == 1) { //1 fácil -> 120segundos
		tempo_segundos = 120;
	}

	if(nivel_jogo == 2) { //2 normal -> 60segundos
		tempo_segundos = 60;
	}
	
	if(nivel_jogo == 3) { //3 difícil -> 30segundos
		tempo_segundos = 30;
	}

	//inserindo segundos no span, aqui eu retorno a id do cronometro, recupero pelo documentgetelement..., e usando o inner html q eh o comando que puxa oq ta dentro do html
	//Com isso eu modifico o tempo_segundos, acrescentando ou mudando o valor, etc.
	document.getElementById('cronometro').innerHTML = tempo_segundos;

	// quantidade de balões
	var qtde_baloes = 104;
	
	//Chamando a função que sera referenciada em baixo, aqui eu dou um nome e chamo a quantiade de baloes pra ela por parametro
	cria_baloes(qtde_baloes);

	//imprimir qtde baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	//Chamando a variavel de contagem de tempo, coloquei mais um pq na função embaixo ele decrementa um valor apos o inicio imediatamente entao pra deixar
	//o tempo do cronometro certo quando o jogo começar eu tive quer por esse +1
	contagem_tempo(tempo_segundos + 1)
	
}

//Essa função com nome escrito de verde recebe os segundos que era ira manipular
function contagem_tempo(segundos){

	segundos = segundos - 1; //A cada um segundo a função contagem tempo eh chamada e ai o temporizador que eu pus no cronometro o tempo vai diminuindo, isso tambem levando
	//em conta o tempo_segundos inicial que eu botei nos ifs de acordo com o nivel de dificuldade

	if(segundos == -1){
		clearTimeout(timerId); //para a execução da função do settimeout, assim que chegar a 0 chama a função game over
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);  //1000 no js quer dizer milisegundos,entao 1000 quer dizer 1segundo aqui, a função settimeout tem dois parametros
	//um parametro é uma função e o outro eh o tempo em milisegundos entao com o passar do tempo a função é sempre chamada no caso a cada 1segundo ali em cima
	//aqui eu chamo o id contagem_tempo incremento um valor nele com os segundos, eu recupero o elemento e atualizo seu valor.
}

function game_over(){ //Da um alerta quando o tempo chegar a 0
	alert('Fim de jogo, você não conseguiu destruir todos os asteroides a tempo.');
}

//Essa função com nome escrito de verde recebe a quantidade de baloes que era ira manipular
function cria_baloes(qtde_baloes){

	for(var i = 1; i <= qtde_baloes; i++){

		var balao = document.createElement("img"); //Aqui eu crio um DOM, no qual eu posso manipular elementos htmls dentro do proprio js, no caso um elemento img numa variavel balao//
		balao.src = 'imagens/meteor.png'; //Aqui eu atribuo uma foto a esse elemento e embaixo eu dou uma imagem//
		balao.style.margin = '12px 0px 10px 10px';
		balao.id = 'b'+i; //O B é o id que eu dou para o balao e como o id eh uma referncia unica eu concateno a cada loop do laço for, ou seja cada balao tera ids diferentes., ex: b1.
		balao.onclick = function(){ estourar(this); };  //No clique chama a função estourar que troca a imagem de balao para balao estourado,
		//ai eu passo o parametro this que referencia o elemento em si

		document.getElementById('cenario').appendChild(balao); //Os elemento encapsulados criam uma relação de parentesco, a função appendchild coloca
		//essas "tags" no caso img ali em cima dentro do elemento div do id cenario, la eu adiciono tb o elemento balao, com isso eu faço que as fotos dos balões
		//fiquem inseridas no sobre o fundo que eu coloquei do cenario.
		//O this passa a função seu proprio elemento.
	}
}

function estourar(e){ //Função de estourar os balões recebida com o parametro dps do evento click aqui e e assim explorando os elementos dessa função

	var id_balao = e.id;  //Aqui eu armazedo os ids de cada balão, cada um tendo um id especifico, se eu desse um alert q clicasse em um me avisari que um eh b1 outro b2, etc.

	document.getElementById(id_balao).setAttribute("onclick", "") //Isso aqui evita um bug no qual eu passo um parametro fazendo com que um atributo nao se repita, fique vazio
	//tipo eu corrijo o bug no qual eu possa clicar continuamente num balao e continuar marcando ponto.

	document.getElementById(id_balao).src = 'imagens/meteorboom.png'; //Troca a imagem de balão normal para estourado

	pontuacao(-1);  //Reduz um balão do total dos não estourado e poe abaixo no estourados segundo a função pontuação escrita abaixo

}

function pontuacao(acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;  //Recupera as informações e os elemento dos baloes inteiros
	var baloes_estourados  = document.getElementById('baloes_estourados').innerHTML; //Recupera as informações e os elemento dos baloes estourados

	baloes_inteiros = parseInt(baloes_inteiros);   //Conversão pra ter certeza que os valores sao numericos
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;  //Balao inteiros é tipo balao -1 jaque a pontuaçao é -1, ou seja a cada clique eu tiro um e vai pro baloes estourados
	baloes_estourados = baloes_estourados - acao;  //Menos ação, pois a pontuaçao pelo parametro ação é -1 entao -1 com -1 vira mais, ou seja +1.

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);


}

function situacao_jogo(baloes_inteiros){ //Aqui eu passo por parametro os baloes_inteiros caso chegue a 0 eu faço a verificação e dou um alert dizendo que o jogo foi vencido
	if(baloes_inteiros == 0){
		alert('Parabéns, você conseguiu destruir todos os asteroides a tempo.');
		parar_jogo(); //Essa função para o tempo, dar uma limpa no timeout caso vc complete antes do tempo chegar a 0
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}