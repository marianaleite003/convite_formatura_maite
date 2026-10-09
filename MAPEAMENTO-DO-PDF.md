# Correspondência entre o PDF e a landing page

As páginas 3 e 4 a 7 repetem ou ampliam o mesmo plano de aula. Cada informação aparece na landing page uma vez, evitando repetir o convite inteiro. Os símbolos repetidos de estrelas, corações e clipes reaparecem como detalhes do caderno.

| Elemento do PDF | Equivalente na landing page |
| --- | --- |
| Envelope lilás com fundo preto, página 1 | `.envelope`, quatro abas HTML independentes, com cores e abertura em CSS |
| Lacre dourado, página 1 | Imagem original `assets/lacre-dourado.png`; área clicável e animação de soltura |
| Foto da formanda, página 2 | `<figure class="graduate-photo">`, com a imagem original e legenda HTML |
| Papel pautado, margem e furos, páginas 3 e 4 | `.ruled-paper` e `.punch-holes`, desenhados em CSS |
| Fita xadrez lilás, página 3 | Imagem original `assets/fita-xadrez.png` e fita sobre a fotografia |
| Chapéu de formatura | Imagem original `assets/chapeu-formatura.png`, no envelope, no título e no encerramento |
| “Convite oficial da” e “Pedagogia” | `<h1 id="invitation-title">`, com texto selecionável e fonte original de “Pedagogia” |
| “Aula especial: Festa de formatura!” | `.special-class`, com pincelada lilás e títulos em HTML |
| Planejamentos, relatórios, estágios, cafés e noites sem dormir | Parágrafo `.hero-paragraph` |
| A melhor aula do semestre | `.hero-promise`, com sublinhado dourado em CSS |
| Recado do convidado cuidadosamente selecionado | `.selected-note`, caixa tracejada lilás com texto, coração e estrela |
| Conteúdo da aula e suas quatro disciplinas | Seção `.curriculum`, lista HTML e quatro ícones SVG: livro, comida, música e câmera |
| Papel creme e clipe do conteúdo | Imagem original `assets/conteudo-papel.png` e fita lilás em CSS |
| Recursos didáticos e os quatro itens | Seção `.resources`, lista HTML com taça, bandeja, música e coração em SVG |
| Folha lilás de canto dobrado | Imagem original `assets/recursos-papel.png` |
| Reprovação, recado e rosto triste | `.absence-note`, texto HTML sobre a moldura original `assets/reprovacao-moldura.png` |
| Porta-lápis, lápis, coração dourado e flores | Recorte original `assets/flores-e-lapis.png`, ao lado dos recados |
| Objetivos de aprendizagem e introdução | Título e parágrafo na página direita do caderno |
| Cinco objetivos da página 3 | Lista `.objectives-list`, com botões de marcação e indicadores acessíveis |
| Sexto objetivo incompleto, página 6 | “Tirar fotos antes da festa acabar”, completando a frase truncada da referência |
| Ícones de verificação dos objetivos | Círculos lilases e marcas SVG; mudam de estado ao serem tocados |
| Observação da professora e texto completo | `.teacher-note`, texto HTML sobre a folha original `assets/nota-papel.png` |
| Corações dourados desenhados | Imagem original `assets/coracoes-dourados.png` e divisor com coração em SVG |
| Lápis lilás, página 6 | Imagem original `assets/lapis-lilas.png` |
| Informações da aula, página 7 | Seção `#informacoes`, título HTML sobre a pincelada original |
| Data, horário e local | `<dl class="event-details">`, três campos HTML, preenchidos pelo arquivo de configuração |
| Calendário, relógio e localização | Ícones SVG associados a cada campo |
| Linhas pontilhadas e caixa lilás arredondada | Bordas e fundo de `.event-details` em CSS |
| “Sua presença”, “Vale mais do que qualquer nota” e mensagem final | Elementos HTML de `.closing-brush` sobre a pincelada original |
| “Nos vemos lá!” | Texto HTML com a fonte original do PDF, ao lado do chapéu |
| Paleta do envelope | Lilás `#e1b1fd`, grafite `#202020` e o lacre dourado original |
| Paleta do plano de aula | Lavanda `#cebbd8`, creme `#f5efec`, roxo suave, texto escuro e traços dourados |

Data, horário e local não constam preenchidos no arquivo de referência. A data de 06 de março de 2026 e o local República Eventos, Marília/SP, foram informados posteriormente pelo usuário e incorporados à página. O horário segue a confirmar. O quadro de valor e pagamento também foi acrescentado conforme os dados recebidos: R$ 380,00, boleto ou cartão em três vezes sem juros, ou Pix. O botão “Confirmar presença” usa o link de WhatsApp fornecido posteriormente: `https://w.app/fbt1xz`.
