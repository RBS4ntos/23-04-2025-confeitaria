// Gerenciamento do carrinho
class Carrinho {
    constructor() {
        this.itens = JSON.parse(localStorage.getItem('carrinho')) || [];
        this.carregarCarrinho();
        this.atualizarContador();
    }

    carregarCarrinho() {
        const cartItemsList = document.getElementById('cart-items-list');
        const cartEmpty = document.getElementById('cart-empty');
        const cartItems = document.getElementById('cart-items');
        
        if (this.itens.length === 0) {
            cartEmpty.style.display = 'block';
            cartItems.style.display = 'none';
            return;
        }
        
        cartEmpty.style.display = 'none';
        cartItems.style.display = 'block';
        cartItemsList.innerHTML = '';
        
        this.itens.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}" class="cart-item-img">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.nome}</h3>
                    <p class="cart-item-price">R$ ${item.preco.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="number" value="${item.quantidade}" min="1" class="quantity-input" data-id="${item.id}">
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <a href="#" class="remove-item" data-id="${item.id}" onclick="return false;">
                        <i class="fas fa-trash"></i> Remover
                    </a>
                </div>
                <div class="cart-item-total">
                    <strong>R$ ${(item.preco * item.quantidade).toFixed(2)}</strong>
                </div>
            `;
            cartItemsList.appendChild(cartItem);
        });
        
        
        this.atualizarTotal();
        this.adicionarEventos();
    }

    adicionarEventos() {
        // Botões de remover
        document.querySelectorAll('.remove-item').forEach(btn => {
            document.addEventListener('click', (e) => {
                // Para botões de remover
                if (e.target.closest('.remove-item')) {
                    e.preventDefault();
                    const id = e.target.closest('.remove-item').getAttribute('data-id');
                    this.removerItem(id);
                }
            });
        });
        
        // Botões de quantidade
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                this.alterarQuantidade(id, -1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                this.alterarQuantidade(id, 1);
            });
        });
        
        // Inputs de quantidade
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', () => {
                const id = input.getAttribute('data-id');
                const novaQuantidade = parseInt(input.value);
                
                if (novaQuantidade < 1) {
                    input.value = 1;
                    return;
                }
                
                this.alterarQuantidade(id, 0, novaQuantidade);
            });
        });
        
        // Botão limpar carrinho
        document.getElementById('clear-cart-btn').addEventListener('click', () => {
            if (confirm('Tem certeza que deseja limpar seu carrinho?')) {
                this.limparCarrinho();
            }
        });
        
        // Botão finalizar compra
        document.getElementById('checkout-btn').addEventListener('click', () => {
            this.finalizarCompra();
        });
    }

    adicionarItem(produto) {
        const itemExistente = this.itens.find(item => item.id === produto.id);
        
        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            this.itens.push({
                ...produto,
                quantidade: 1
            });
        }
        
        this.salvarCarrinho();
        this.atualizarContador();
    }

    removerItem(id) {
        console.log('Removendo item com ID:', id, 'Tipo:', typeof id);
        console.log('Itens antes:', this.itens);
        
        id = typeof this.itens[0].id === 'number' ? Number(id) : id;
        this.itens = this.itens.filter(item => {
            console.log('Comparando:', item.id, 'com', id, 'Resultado:', item.id !== id);
            return item.id !== id;
        });
        
        console.log('Itens depois:', this.itens);
        this.salvarCarrinho();
    }

    alterarQuantidade(id, alteracao, novaQuantidade = null) {
        const item = this.itens.find(item => item.id === id);
        
        if (item) {
            if (novaQuantidade !== null) {
                item.quantidade = novaQuantidade;
            } else {
                item.quantidade += alteracao;
            }
            
            if (item.quantidade < 1) item.quantidade = 1;
            
            this.salvarCarrinho();
        }
    }

    limparCarrinho() {
        this.itens = [];
        this.salvarCarrinho();
    }

    atualizarTotal() {
        const total = this.itens.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
        document.getElementById('cart-total-price').textContent = `R$ ${total.toFixed(2)}`;
    }

    atualizarContador() {
        // Calcula o total de itens (soma as quantidades)
        const totalItens = this.itens.reduce((total, item) => total + item.quantidade, 0);
        const contador = document.getElementById('cart-count');
        
        if (contador) {
            contador.textContent = totalItens;
            // Mostra apenas se tiver itens
            contador.style.display = totalItens > 0 ? 'flex' : 'none';
            
            // Adiciona animação quando muda
            if (totalItens > 0) {
                contador.classList.add('animate-bounce');
                setTimeout(() => {
                    contador.classList.remove('animate-bounce');
                }, 500);
            }
        }
    }

    salvarCarrinho() {
        localStorage.setItem('carrinho', JSON.stringify(this.itens));
        this.carregarCarrinho();
        this.atualizarContador();
    }

    finalizarCompra() {
        if (this.itens.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        if (localStorage.getItem('logado') !== 'true') {
            alert('Por favor, faça login para finalizar a compra!');
            // Aqui você pode redirecionar para a página de login
            window.location.href = './index.html';
            return;
        }
        
        // Aqui você pode adicionar a lógica para finalizar a compra
        alert('Compra finalizada com sucesso! Obrigado por sua compra.');
        this.limparCarrinho();
    }
}

// Inicializa o carrinho quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const carrinho = new Carrinho();
    
    // Adicione este evento nos botões "Adicionar ao carrinho" nas páginas de produtos
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const produto = {
                id: btn.dataset.id,
                nome: btn.dataset.nome,
                preco: parseFloat(btn.dataset.preco),
                imagem: btn.dataset.imagem
            };
            
            carrinho.adicionarItem(produto);
            alert('Produto adicionado ao carrinho!');
        });
    });
});