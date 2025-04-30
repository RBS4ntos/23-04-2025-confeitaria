function trocarImagemBolo() {
    const imagem = document.getElementById("imgCardapio");
    imagem.src = `./CardapioDeBolos.png`;
}

function trocarImagemDoces() {
    const imagem = document.getElementById("imgCardapio");
    imagem.src = `./CardapioDeDoces.png`;
}

function trocarImagemPascoa() {
    const imagem = document.getElementById("imgCardapio");
    imagem.src = `./CardapioDePascoa.png`;
}

function trocarImagemPrincipal() {
    const imagem = document.getElementById("imgCardapio");
    imagem.src = `./CardapioPrincipal.png`;
}

function abrirMenu() {
    document.getElementById("sidebar").style.width = "250px";
  }

  function fecharMenu() {
    document.getElementById("sidebar").style.width = "0";
  }