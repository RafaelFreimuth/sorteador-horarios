function init(params) {
    const promptRequire = require('prompt-sync');
    const prompt = promptRequire();

    console.clear();

    let quantidadeHorarios = Number(0);
    let quantidadeRepeticoes = Number(0);

    quantidadeHorarios = Number(prompt("Olá, informe a quantidade de horários desejados? "));

    quantidadeRepeticoes = Number(prompt("Quantas vezes deseja que o sorteio seja feito? "));

    let conteudoArquivo = lerArquivo();
    let controleRepeticoes = Number(1);

    while (controleRepeticoes <= quantidadeRepeticoes) {
        let horariosSorteados = sortearHorarios(conteudoArquivo, quantidadeHorarios);

        console.log(controleRepeticoes + 'º ' + montarMensagem(horariosSorteados));

        controleRepeticoes++;
    }

    prompt();
}

function lerArquivo() {
    let fs = require('fs');
    let conteudo = fs.readFileSync('./horarios.txt', 'utf-8');
    
    return conteudo.split(';')
}

function sortearHorarios(dadosArquivo, qtdHorarios) {
    let controleQtd = Number(1);
    let horariosSorteados = [];

    while (controleQtd <= qtdHorarios) {
        
        let horarioRamdom = dadosArquivo[Math.floor(dadosArquivo.length * Math.random())]

        if (!horariosSorteados.includes(horarioRamdom) && !isHoraJahInserida(horariosSorteados, horarioRamdom)) {
            
            horariosSorteados.push(horarioRamdom);
            
            controleQtd++;
            
        }
    }

    return ordenarHorarios(horariosSorteados);
}

function isHoraJahInserida(horariosSorteados, horario) {
    let doisCaracteresList = [];
    
    horariosSorteados.forEach(horarioSorteado => {
        doisCaracteresList.push(horarioSorteado.substr(0, 2));
    });

    return doisCaracteresList.includes(horario.substr(0, 2));
}

function ordenarHorarios(horarios) {
    return horarios.sort(function(a, b) { 
        if (Number(a.replace(':', '')) > Number(b.replace(':', ''))) {
            return 1;
        }
        
        else {
            return -1;
        }
    });
}

function montarMensagem(horarios) {
    let mensagem = '';

    horarios.forEach(horario => {
        mensagem += ' ' + horario;
    });

    return mensagem;
}

init();