//Embaixo eu controlo as rodadas dos jogadores, aonde cada um botara uma posição que tera o icone x ou bola, atravez de um array aonde eu defino pelas posições das coordenadas.

var rodada = 1;
var matriz_jogo = Array(3);

//Cada chave do array recebera uma posição de acordo com as coordenadas, o a vai ter 3, assim como o b e o c, é 3x3., 
//que receberão inicialmente 0 e serão alteradas pela função ali embaixo da rodada.
matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

//Lembrando que o $ é um comando JQuery
$(document).ready( function(){ //Aqui é a função de verificar quando o documento for carregado, eu poderia dar um alert dizendo qnd a pagina finalmente carregou toda

	$('#btn_iniciar_jogo').click( function(){ //Quando um click for dado sobre esse elemento chama a função anonima que passamos por parametro o método click que vai iniciar o jogo.

		//valida a digitação dos apelidos dos jogadores, exemplo se eu nao digitar nada e botar para jogar eu serei notificado que eu tenho que
		//dar um nick a um dos jogadores e se retornar nulo ela vai me avisar isso e so vai possibilitar que eu jogue apos botar um nick nele, ele faz essa verificação pelo if/else.
		if($('#entrada_apelido_jogador_1').val() == ''){
			alert('Apelido do jogador 1 não foi preenchido');
			return false;  //return false nao permite que eu passe para a proxima etapa, no caso a checagem, como visto nao precisie de else, so if pq so fiz uma checagem.
		}

		if($('#entrada_apelido_jogador_2').val() == ''){
			alert('Apelido do jogador 2 não foi preenchido');
			return false;
		}

		//exibir os apelidos, essa função nativa do jquery é como o inner html mas eu uso so o html mas porque nao usar o inner ?
		//Então, o val é uma caracteristica do input type text, um valor, que no caso o span la do nome_jogador_1 possui um conteudo interno
		//Ou seja dentro do span colocamos elementos html ou textuais, ele possui um conteudo interno html, ai foi feito uma inserção
		//colocamos tipo um inner html dentro do span, um id ali dentro que eu posso apenas colocar o comando html aki e referenciar esse id com o #.
		//Utilizamos o val para recuperar o value e o .html para recuperar o conteudo inserido dentro de uma tag.
		$('#nome_jogador_1').html($('#entrada_apelido_jogador_1').val());
		$('#nome_jogador_2').html($('#entrada_apelido_jogador_2').val());

		//contrala visualização das divs, no caso ao clicar em jogar a exibição do palco do jogo como foi falado la no index.
		//Isso da uma ideia que eu fui pra outra pagina mas na verdade eu oculto um div e exibo outro, assim deixando td mais otimizado.
		$('#pagina_inicial').hide();
		$('#palco_jogo').show();

	});



	//
	$('.jogada').click( function(){ //Função de click as coordenadas de cada div, cada quadrado do jogo da velha, chamando a classe 'jogada'

		var id_campo_clicado = this.id;  //Esse this faz referencia ao elemento do contexto click, ou seja se eu por um alert aonde eu clicar me mandaria uma msg de alerta 
		//com base no contexto do this ou seja a referencia a propria função click chamando ela mesma num evento click.
		//Com o this eu falo que essa variavel clicada ali encima do id_campo_clicado é na verdade o this, ou seja a função do click ligada ao id que foi declarado em cada div 
		//ou seja, em cada um daqueles quadradinhos do jogo da velha, ai se eu clicar no primeiro daria um alert escriti tipo a1 e em outro c3 e ai vai, é tudo em base
		//no elemento, na posição do contexto, no local que eu clico, no this.

		$('#'+id_campo_clicado).off(); 
		//Esse fix acima faz com que eu nao sobrescreva uma marcação de ícone com outra, buscando pelo # e o id do campo clicado e desligando com off a marcaçao.

		jogada(id_campo_clicado);  //Aqui eu passo como parametro oq foi recuperado ali em cima na variavel e sera reutilizada ali embaixo em uma nova função
		//Ou seja a jogada recebe o id_campo_clicado como parametro
		//alert(id_campo_clicado); aqui eu poderia dar um alert que mostraria a msg dependendo de aonde eu clico, ele ler que jogada tem como parametro o id_campo_clicado, veja abaixo.

	});

	function jogada(id){ //Aqui nessa função jogada recebe id que fara a marcação dependendo da posição clicada, tipo com x ou uma bola, 
		//tipico do jogo da velha de acordo com as coordenadas.
		var icone = ''; //Aqui eu tenho nenhum icone e um ponto sem valor, praq isso ??? 
		//pra controlar a rodada qnd um clica tipo jogador 1 da um x num ponto e jogador 2 da uma bola na sua vez e ai vai
		var ponto = 0;

		if((rodada % 2) == 1){ //A cada clique que faz uma jogada eu tenho a verificação de rodada ali embaixo, com o % se der resto -1 eu defino que o jogador 1
			//joga nas rodadas ímpares e quand oo resto for 1 é outra marcação, o jogador 2 estara jogando nas rodadas pares, essa questao de par ou impar
			//me ajuda a verificar e controlar as rodadas dos jogadores, ou seja se for 1 -1 = 0 par, se for diferente, vai retonar 1 q eh impar e vai incrementar, ali é o resto
			icone = 'url("imagens/marcacao_1.png")'; //Ícone de marcação X ou Bola, serão colocados aqui como imagem.
			ponto = -1;
		} else {
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;
		}
		
		rodada++; //A rodada aqui é incrementada ate acabar

		$('#'+id).css('background-image', icone);  //Com o parametro ID sendo chamado pela função jogada, aqui eu passo pelo seletor jquery um id,
		//concatenado com o #, e dps com a função .css eu passo por parametro 2 valores que ele vai procurar dentro do css, o tipo de elemento
		//que é um background-image e dps oq ela é o icone.

		var linha_coluna = id.split('-'); //Essa variavel reebe o id da coluna e corta o - isso é so uma função estetica se eu botasse um alert para me dizer qual posição é
		//em vez de ser b-1 vai ser b1, isso divide o id do valor q ele tem por posição, isso tem ligação com o array que recebera todos os elementos do array aqui embaixo.

		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;
	
		verifica_combinacao(); //chamando essa função no final da função rodada para ser reusada ali embaixo

	}

	function verifica_combinacao(){ //Aqui sera verificado a posição dos array e matrizes.

		//verifica na horizontal a vitoria do jogador tipo se tiver 3 iguais ai vai dando um ponto.
		var pontos = 0;
		for(var i = 1; i <= 3; i++){ //Lembrando que kd matriz vai ate 3
			pontos = pontos + matriz_jogo['a'][i];  //Aqui eu consigo vereficar sobre como a posição das tabelas estao percorrendo os arrays, no caso a linha a e o i 
			//sera dado a partir do for comçando em 1 e terminando em 3, ai vai alterando os pontos, fiz um para cada, a, b e c.
		}
		ganhador(pontos);

		pontos = 0;
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['b'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['c'][i];
		}
		ganhador(pontos);

		//verifica na vertical
		for(var l = 1; l <= 3; l++){ //Lembrando que se a soma for 3, quer dizer que foram 3 combinações de marcações, oq da a vitoria no jogo da velha.
			pontos = 0;  //Como é uma verificação eu tenho que deixar zerado para ela nao ficar passando o limite ou bugando através do uso do for.
			pontos += matriz_jogo['a'][l];
			pontos += matriz_jogo['b'][l];
			pontos += matriz_jogo['c'][l];

			ganhador(pontos);
		}

		//verificar na diagonal
		pontos = 0; //Kd coluna, kd checagem eu tenho que zerar pois eu tenho que ver qtas combinações, seja na vertical, horizontal, etc, tem sem bugar.
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
		ganhador(pontos);

		pontos = 0;
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
		ganhador(pontos);

	}

	function ganhador(pontos){ //Aqui controla quem é o vendedor, quem fez mais pontos.
		if(pontos == -3){
			var jogada_1 = $('#entrada_apelido_jogador_1').val();
			alert(jogada_1 + ' é o vencedor');
			$('.jogada').off();
		
		} else if(pontos == 3){
			var jogada_2 = $('#entrada_apelido_jogador_2').val();
			alert(jogada_2 + ' é o vencedor');
			$('.jogada').off(); //A Função Off desliga a função jogada de ficar clicando ou seja se nao fosse essa função, 
			//apos o termino do jogo e com a vitoria anunciada, eu poderia continuar marcando no jogo da velha os icones, oq em si é um bug que eu resolvo com isso
		}
	}


});