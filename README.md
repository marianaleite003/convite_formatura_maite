# Convite de formatura em Pedagogia · Maitê

Landing page estática em HTML, CSS e JavaScript, baseada no PDF fornecido. O envelope abre ao tocar no lacre dourado: o lacre se solta, as abas se desdobram e a carta sobe. Depois, o visitante encontra o convite em forma de plano de aula.

As imagens são extraídas do arquivo original. Os textos, listas, ícones, campos e abas são elementos HTML, CSS ou SVG; as páginas do PDF não são usadas como uma imagem de fundo do convite.

## Abrir e editar

Abra `dist/index.html` em um navegador. Todos os recursos visuais são locais. Para servir por HTTP, use `python3 -m http.server 8080 --directory dist` a partir desta pasta.

Edite `dist/event-config.js` para alterar o nome da formanda, a data, o horário, o local, o valor e as formas de pagamento. Os dados fornecidos após o PDF foram incorporados: 06 de março de 2026, República Eventos em Marília/SP, convite de R$ 380,00, boleto ou cartão em três vezes sem juros, ou Pix. O horário segue como “A confirmar”. O nome Maitê foi adotado a partir do contexto do projeto “convite maite”.

O quadro de pagamento informa as condições fornecidas. A página não emite boletos, processa cartões ou gera cobranças Pix. Para mudanças que também devam aparecer sem JavaScript, atualize os textos correspondentes em `dist/index.html`.

O botão “Confirmar presença” abre o link fornecido pelo usuário: `https://w.app/fbt1xz`. Para alterar o destino, edite `whatsappUrl` em `dist/event-config.js`. Esse link tem prioridade sobre o telefone opcional, que inclui país, DDD e número; quando apenas o telefone é preenchido, o botão abre uma mensagem pronta no WhatsApp para o convidado enviar. Nenhuma mensagem é enviada automaticamente, e nenhuma presença é gravada no servidor.

Ao preencher um local ou endereço, aparece o botão de mapa. Ao preencher `startsAt` com uma data ISO com fuso, aparece a opção de baixar o evento em `.ics`. Se `endsAt` estiver vazio, a agenda usa duração de quatro horas; preencha esse campo para definir a duração real.

## Organização

`dist/index.html`: conteúdo e estrutura semântica. `dist/styles.css`: paleta, composição do caderno, responsividade e animações. `dist/invitation.js`: abertura e repetição do envelope, checklist, campos e ações opcionais. `dist/event-config.js`: dados do evento. `dist/assets/`: foto, ilustrações e fontes do modelo.

`MAPEAMENTO-DO-PDF.md` relaciona os elementos do arquivo de referência aos seus equivalentes na página.

## Acessibilidade e funcionamento

Os botões funcionam por teclado, a abertura move o foco para o convite, e o conteúdo fechado fica fora da navegação. A preferência de movimento reduzido elimina a sequência animada e os confetes. Sem JavaScript, o convite aparece aberto com seus textos e informações.

Os objetivos marcados são salvos somente no navegador do visitante. Bloqueios de armazenamento não impedem a leitura ou a abertura do convite. Não há dependências, rastreadores, fontes remotas ou serviços necessários para exibir a página.

## Ajustes editoriais no texto

A expressão “Vale mais dó que qualquer nota” foi corrigida para “Vale mais do que qualquer nota”. A frase incompleta “Tirar fotos antes da”, da página 6, foi completada como “Tirar fotos antes da festa acabar”. Os demais textos substantivos do plano foram preservados.

## Verificação

A sintaxe JavaScript, os recursos locais, a estrutura HTML/CSS e os fluxos de abertura, repetição, movimento reduzido e checklist foram verificados. A revisão visual em navegador não foi executada nesta sessão por indisponibilidade da infraestrutura autorizada de prévia.
