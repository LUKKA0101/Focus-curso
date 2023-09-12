const html = document.querySelector('html')
const btfoco = document.querySelector('.app__card-button--foco')
const btcurto = document.querySelector('.app__card-button--curto')
const btlongo = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const texto = document.querySelector('.app__title')
const botoes = document.querySelectorAll(".app__card-button")
const musicaInput = document.querySelector('#alternar-musica')
const startOuPausebt = document.querySelector('#start-pause')
const iniciarPausar = document.querySelector('#start-pause span')
const startOuPauseImg = document.querySelector('#start-pause img')
const mostrarTempo = document.querySelector('#timer')

const musica = new Audio(`/sons/luna-rise-part-one.mp3`)
const somPlay = new Audio(`/sons/play.wav`)
const somPause = new Audio(`/sons/pause.mp3`)
const somAcabou = new Audio(`/sons/beep.mp3`)

let tempoDecorrido = 1500
let intervalo = null

musica.loop = true

musicaInput.addEventListener(`change`, () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

btfoco.addEventListener('click', ()=> {
    tempoDecorrido = 1500
    alterarAtributo('foco')
    btfoco.classList.add('active')
})

btcurto.addEventListener('click', ()=> {
    tempoDecorrido = 300
    alterarAtributo('descanso-curto')
    btcurto.classList.add('active')

})

btlongo.addEventListener('click', ()=> {
    tempoDecorrido = 900
    alterarAtributo('descanso-longo')
    btlongo.classList.add('active')
})

function alterarAtributo (contexto) {
    tempoNaTela()
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
        botoes.forEach( (contexto) => {
            contexto.classList.remove('active')
        })
    switch (contexto) {
        case "foco":
            texto.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            texto.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            texto.innerHTML = `
            Hora de voltar á superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        break;
        default:
        break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorrido <= 0){
        zerar()
        alert('O tempo acabou!!!')
        //somAcabou.play()
        return
    }

    tempoDecorrido -= 1
    tempoNaTela()
}

startOuPausebt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if (intervalo) {
        zerar()
        somPause.play()
        return
    }
    intervalo = setInterval(contagemRegressiva, 1000)
    iniciarPausar.textContent = 'pausar'
    startOuPauseImg.setAttribute('src', '/imagens/pause.png')
    somPlay.play()
}

function zerar () {
    clearInterval(intervalo)
    iniciarPausar.textContent = 'começar'
    startOuPauseImg.setAttribute('src', '/imagens/play_arrow.png')
    intervalo = null
}

function tempoNaTela () {
    const tempo = new Date(tempoDecorrido * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    mostrarTempo.innerHTML = `${tempoFormatado}`
}

tempoNaTela();