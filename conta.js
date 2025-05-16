    // Função para carregar dados do usuário
    async function carregarDadosUsuario() {
        const usuarioLogado = localStorage.getItem('logado') === 'true';
        const usuarioData = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')) : null;

        console.log('Dados do usuário:', usuarioData);


        // Elementos da sidebar
        const nomeUsuario = document.getElementById('nomeUsuario');
        const emailUsuario = document.getElementById('emailUsuario');
        const avatarPadrao = document.getElementById('avatarPadrao');
        const logoutItem = document.getElementById('logoutItem');
        const loginItem = document.getElementById('loginItem');

        // Elementos da área de conteúdo
        const nomeCompleto = document.getElementById('nomeCompleto');
        const loginEmail = document.getElementById('loginEmail');
        const dataCadastro = document.getElementById('dataCadastro');

        if (usuarioLogado && usuarioData) {
            // Usuário logado - mostrar dados
            nomeUsuario.textContent = usuarioData.nome || 'Nome não definido';
            emailUsuario.textContent = usuarioData.login || 'Login não definido';
            nomeCompleto.textContent = usuarioData.nome || 'Nome não definido';
            loginEmail.textContent = usuarioData.login || 'Login não definido';
            dataCadastro.textContent = new Date().toLocaleDateString(); // Adapte para pegar do banco se necessário

            // Mostrar botão Sair
            logoutItem.style.display = 'block';
            loginItem.style.display = 'none';
        } else {
            // Usuário não logado
            nomeUsuario.textContent = 'Visitante';
            emailUsuario.textContent = 'Não logado';
            nomeCompleto.textContent = 'Faça login para ver seus dados';
            loginEmail.textContent = 'Faça login para ver seus dados';
            dataCadastro.textContent = 'Faça login para ver seus dados';

            // Mostrar ícone padrão
            avatarPadrao.style.display = 'block';

            // Mostrar botão Logar
            logoutItem.style.display = 'none';
            loginItem.style.display = 'block';
        }
    }

    // Função para deslogar
    function sairConta() {
        if (confirm('Tem certeza que deseja sair da sua conta?')) {
            localStorage.setItem('logado', 'false');
            localStorage.removeItem('usuario');
            carregarDadosUsuario();
            alert('Você foi deslogado com sucesso!');
        }
    }

    // Carregar dados quando a página for carregada
    window.onload = function() {
        carregarDadosUsuario();
    };

    document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
            if (localStorage.getItem('logado') === 'true') {
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
        } else {
            alert('Você está deslogado!');
        }
    });
});

    document.addEventListener('DOMContentLoaded', function() {
        const carrinho = document.getElementById('carrinho');
        if(localStorage.getItem('logado') === 'true') {
            const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
            const contador = document.getElementById('cart-count');
            
            if (contador) {
                contador.textContent = totalItens;
                contador.style.display = totalItens > 0 ? 'flex' : 'none';
            }
        } else {
            carrinho.style.display = 'none';
        }
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Impede a propagação do evento
        mobileMenu.classList.toggle('active');
        
        const icon = menuToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fecha o menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && e.target !== menuToggle) {
            mobileMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fecha o menu ao clicar nos links (mantém o mesmo)
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });
});

function abrirHistoria() {
    var historiaModal = new bootstrap.Modal(document.getElementById('historiaModal'));
    historiaModal.show();
  }