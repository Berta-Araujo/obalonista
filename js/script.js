document.addEventListener("DOMContentLoaded", () => {
    // Página Principal (Formulário de Contato)
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const nome = document.getElementById("name-field").value;
            const tel = document.getElementById("tel-field").value;
            const assunto = document.getElementById("subject-field").value;
            const mensagem = document.getElementById("message-field").value;

            const texto = `Olá, Gabriel!

Meu nome é ${nome}
Telefone: ${tel}
Data da Comemoração: ${assunto}
Mensagem:
${mensagem}`;

            const numero = "5518991924483";
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

            window.open(url, "_blank");
        });
    }

    // Página de Simulador
    
    const largura = document.getElementById('largura');
    const altura = document.getElementById('altura');
    const colunas = document.getElementById('colunas');
    const tipoBalao = document.getElementById('tipoBalao');
    const btCalcular = document.getElementById('btCalcular');
    const resultado = document.getElementById('resultado');
    const valorResultado = document.getElementById('valorResultado');
    const btWhatsapp = document.getElementById('btWhatsapp');
    const ultimaSimulacao = document.getElementById('ultimaSimulacao');
    const historicoResultado = document.getElementById('historicoResultado');
    const btApagar = document.getElementById('btApagar');

    if (btCalcular) {
        let valorEstimado = 0;
        let metrosBalao = 0;
        let descricaoColunas = '';
        let descricaoBalao = '';
        let larguraPainel = 0;
        let alturaPainel = 0;
        let simulacaoValida = false;

        btCalcular.addEventListener('click', () => {
            larguraPainel = parseFloat(largura.value);
            alturaPainel = parseFloat(altura.value);
            const quantidadeColunas = parseInt(colunas.value);
            const precoMetro = parseFloat(tipoBalao.value);

            resultado.style.display = 'none';
            simulacaoValida = false;

            if (!Number.isFinite(larguraPainel) || !Number.isFinite(alturaPainel) || larguraPainel <= 0 || alturaPainel <= 0) {
                alert('Informe medidas válidas para o painel!');
                return;
            }

            if (colunas.value === '') {
                alert('Selecione a disposição dos balões!');
                return;
            }

            if (quantidadeColunas === 0) {
                alert('Projetos personalizados precisam de avaliação individual. Entre em contato para solicitar seu orçamento!');
                return;
            }

            if (tipoBalao.value === '') {
                alert('Selecione o tipo de balão!');
                return;
            }

            descricaoColunas = (quantidadeColunas === 1) ? 'Uma coluna lateral' : 'Duas colunas laterais';
            descricaoBalao = (precoMetro === 140) ? 'Cores tradicionais' : 'Cores especiais ou metalizadas';

            // Correção dos operadores de multiplicação (*)
            metrosBalao = alturaPainel * quantidadeColunas;
            valorEstimado = metrosBalao * precoMetro;

            document.getElementById('medidasResultado').textContent = `Painel: ${larguraPainel}m de largura x ${alturaPainel}m de altura`;
            document.getElementById('colunasResultado').textContent = `Decoração: ${descricaoColunas}`;
            document.getElementById('tipoResultado').textContent = `Balões: ${descricaoBalao}`;
            document.getElementById('metrosResultado').textContent = `Quantidade estimada: ${metrosBalao} metros lineares`;
            
            valorResultado.textContent = valorEstimado.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            resultado.style.display = 'block';
            simulacaoValida = true;

            localStorage.setItem('largura', larguraPainel);
            localStorage.setItem('altura', alturaPainel);
            localStorage.setItem('colunas', quantidadeColunas);
            localStorage.setItem('tipoBalao', precoMetro);
            localStorage.setItem('valorEstimado', valorEstimado);
            localStorage.setItem('dataSimulacao', new Date().toLocaleDateString('pt-BR'));

            mostrarHistorico();
        });

        function mostrarHistorico() {
            const valorSalvo = localStorage.getItem('valorEstimado');
            const dataSalva = localStorage.getItem('dataSimulacao');

            if (valorSalvo !== null) {
                const valorFormatado = Number(valorSalvo).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                historicoResultado.textContent = `Última estimativa: ${valorFormatado} (${dataSalva || 'Data não informada'})`;
                ultimaSimulacao.style.display = 'block';
            } else {
                ultimaSimulacao.style.display = 'none';
            }
        }

        if (btApagar) {
            btApagar.addEventListener('click', () => {
                localStorage.clear();
                ultimaSimulacao.style.display = 'none';
                alert('Histórico apagado com sucesso!');
            });
        }

        if (btWhatsapp) {
            btWhatsapp.addEventListener('click', () => {
                if (!simulacaoValida) return;

                const texto = `Olá, Gabriel!

Fiz uma simulação pelo site O Balonista e gostaria de solicitar um orçamento.

Medidas do painel: ${larguraPainel}m de largura x ${alturaPainel}m de altura.
Decoração: ${descricaoColunas}
Tipo de balão: ${descricaoBalao}
Quantidade estimada: ${metrosBalao} metros lineares.
Investimento estimado: ${valorEstimado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

Gostaria de receber um orçamento personalizado!`;

                const numero = '5518991924483';
                const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
                window.open(url, '_blank');
            });
        }

        mostrarHistorico();
    }
});