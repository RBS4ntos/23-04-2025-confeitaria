function abrirHistoria() {
    var historiaModal = new bootstrap.Modal(document.getElementById('historiaModal'));
    historiaModal.show()
}

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