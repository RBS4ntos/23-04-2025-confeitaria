function abrirHistoria() {
    var historiaModal = new bootstrap.Modal(document.getElementById('historiaModal'));
    historiaModal.show()}

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