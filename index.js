window.onload = function () {
    const loginModalEl = document.getElementById('welcomeModal');
    const loginModal = new bootstrap.Modal(loginModalEl);

    const cadastroModalEl = document.getElementById('cadastroModal');
    const cadastroModal = new bootstrap.Modal(cadastroModalEl);
    
    if (localStorage.getItem('logado') !== 'true') {
        loginModal.show();
    }

    document.getElementById('abrirCadastro').addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.hide();
        setTimeout(() => cadastroModal.show(), 500); // Espera para transição ficar suave
    });

    document.getElementById('voltarLogin').addEventListener('click', (e) => {
        e.preventDefault();
        cadastroModal.hide();
        setTimeout(() => loginModal.show(), 500); // Espera para transição ficar suave
    });

    document.getElementById('frmLogin').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const login = document.getElementById('txtLogin').value;
    const senha = document.getElementById('txtSenha').value;
    const notificacao = document.getElementById('notificacao');
    const tipo = 'login';

    try {
        const response = await fetch('/api/mysql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, senha, tipo })
        });

        const result = await response.json();
        console.log(result); // Adicione isso para debug
        
        notificacao.innerText = result.message;

        // Verificação corrigida
        if (result.success) {
            localStorage.setItem('logado', 'true');
            localStorage.setItem('usuario', JSON.stringify({
                nome: result.usuario.nome, // Usando result.usuario em vez de rows
                login: result.usuario.login,
                foto: result.usuario.foto || null // Usando o valor retornado pelo servidor
            }));
            
            // Fecha o modal de login
            if (bootstrap && bootstrap.Modal) {
                const loginModal = bootstrap.Modal.getInstance(loginModalEl);
                if (loginModal) loginModal.hide();
            }
            
            // Recarrega a página ou redireciona
            window.location.reload();
        }

    } catch (error) {
        console.error('Erro ao enviar login:', error);
        notificacao.innerText = 'Erro na conexão com o servidor.';
        notificacao.style.color = 'red';
    }
});

    document.getElementById('frmCadastro').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('cadNome').value;
        const login = document.getElementById('cadLogin').value;
        const senha = document.getElementById('cadSenha').value;
        const confirma = document.getElementById('cadConfirmaSenha').value;
        const fotoInput = document.getElementById('cadFoto');
        const notificacaoCadastro = document.getElementById('notificacaoCadastro');
        const tipo = 'cadastro';

        // Validação de senha
        if (senha !== confirma) {
            notificacaoCadastro.innerText = 'As senhas não coincidem.';
            notificacaoCadastro.style.color = '#dc3545';
            return;
        }

        // Cria FormData para enviar a imagem
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('login', login);
        formData.append('senha', senha);
        formData.append('tipo', tipo);
        
        // Adiciona a imagem se existir
        if (fotoInput.files[0]) {
            formData.append('foto', fotoInput.files[0]);
        }

        try {
            const response = await fetch('/api/mysql', {
                method: 'POST',
                body: formData // Não usar headers Content-Type para FormData!
            });

            const result = await response.json();
            
            if (result.success) {
                notificacaoCadastro.innerText = result.message;
                notificacaoCadastro.style.color = '#28a745';
                
                // Limpa o formulário após 2 segundos
                setTimeout(() => {
                    document.getElementById('frmCadastro').reset();
                    document.getElementById('preview-container').style.display = 'none';
                    notificacaoCadastro.innerText = '';
                }, 2000);
            } else {
                throw new Error(result.error || 'Erro no cadastro');
            }
        } catch (error) {
            notificacaoCadastro.innerText = error.message;
            notificacaoCadastro.style.color = '#dc3545';
            console.error('Erro:', error);
        }
    });


/**
 * function pureFadeIn(e,o){var i=document.getElementById(e);i.style.opacity=0,i.style.display=o||"block",function e(){var o=parseFloat(i.style.opacity);(o+=.02)>1||(i.style.opacity=o,requestAnimationFrame(e))}()}
*/
function pureFadeIn(e,o) {
    var i = document.getElementById(e);
    i.style.opacity = 0,
    i.style.display = o || "block",
    
    function e() {
        var o = parseFloat(i.style.opacity);
        (o += .02) > 1 || (
            i.style.opacity = o,
            requestAnimationFrame(e)
        );
    }();
};

/**
 * function pureFadeOut(e){var o=document.getElementById(e);o.style.opacity=1,function e(){(o.style.opacity-=.02)<0?o.style.display="none":requestAnimationFrame(e)}()}
*/
function pureFadeOut(e) {
    var o = document.getElementById(e);
    o.style.opacity = 1,
    function e() {
        (o.style.opacity -= .02) < 0 ? o.style.display="none" : requestAnimationFrame(e)
    }();
};

/**
 * function setCookie(e,o,i){var t="";if(i){var n=new Date;n.setTime(n.getTime()+24*i*60*60*1e3),t="; expires="+n.toUTCString()}document.cookie=e+"="+(o||"")+t+"; path=/"}
*/
function setCookie(e,o,i) {
    var t = "";
    if (i) {
        var n = new Date;
        n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3),
        t = "; expires=" + n.toUTCString()
    }
    document.cookie = e + "=" + (o || "") + t + "; path=/";
};

/**
 * function getCookie(e){for(var o=e+"=",i=document.cookie.split(";"),t=0;t<i.length;t++){for(var n=i[t];" "==n.charAt(0);)n=n.substring(1,n.length);if(0==n.indexOf(o))return n.substring(o.length,n.length)}return null}
*/
function getCookie(e) {
    for (var o = e + "=", i = document.cookie.split(";"), t = 0; t < i.length; t++) {
        for (var n = i[t]; " " == n.charAt(0);) n = n.substring(1,n.length);
        if (0 == n.indexOf(o)) return n.substring(o.length,n.length);
    }
    return null;
};

/**
 * function eraseCookie(e){document.cookie=e+"=; Max-Age=-99999999;"}
*/
function eraseCookie(e) {
    document.cookie = e + "=; Max-Age=-99999999;";
};

/**
 * function cookieConsent(){getCookie("purecookieDismiss")||(document.body.innerHTML+='<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><a>'+purecookieTitle+'</a></div><div class="cookieDesc"><p>'+purecookieDesc+" "+purecookieLink+'</p></div><div class="cookieButton"><a onClick="purecookieDismiss();">'+purecookieButton+"</a></div></div>",pureFadeIn("cookieConsentContainer"))}
*/
function cookieConsent() {
    getCookie("purecookieDismiss") || (
        document.getElementById('cookieConsentContainer').style.display = "block",
        pureFadeIn("cookieConsentContainer")
    );
};

/**
 * function purecookieDismiss(){setCookie("purecookieDismiss","1",7),pureFadeOut("cookieConsentContainer")}
*/
function purecookieDismiss() {
    setCookie("purecookieDismiss", "1", 7),
    pureFadeOut("cookieConsentContainer");
    document.getElementById('politica').classList.remove('show');
};

/**
 * window.onload=function(){cookieConsent()};
*/
cookieConsent();

};

function abrirHistoria() {
    var historiaModal = new bootstrap.Modal(document.getElementById('historiaModal'));
    historiaModal.show();
  }

  function previewImage(input) {
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            previewContainer.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const produto = {
            id: btn.dataset.id,
            nome: btn.dataset.nome,
            preco: parseFloat(btn.dataset.preco),
            imagem: btn.dataset.imagem
        };
        
        // Verifica se o carrinho já está carregado
        if (window.Carrinho) {
            window.Carrinho.adicionarItem(produto);
        } else {
            // Se não estiver, salva no localStorage e redireciona
            const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            carrinho.push({...produto, quantidade: 1});
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
        }
        
        alert('Produto adicionado ao carrinho!');
    });
});