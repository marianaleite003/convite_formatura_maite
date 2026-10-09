/** Dados da formatura. Preencha os campos vazios quando os detalhes forem definidos. */
window.INVITATION_CONFIG = Object.freeze({
  graduateName: 'Maitê',
  dateLabel: '06 de março de 2027',
  timeLabel: '',                 // Ex.: 'Às 20h'
  locationName: 'República Eventos, Marília/SP',
  address: '',                   // Endereço completo, para o mapa
  startsAt: '',                  // ISO com fuso: '2026-11-21T20:00:00-03:00'
  endsAt: '',                    // ISO com fuso. Se vazio, usa 4 horas de duração.
  whatsapp: '',                  // Código do país + DDD + número, somente dígitos
  whatsappUrl: 'https://w.app/fbt1xz', // Link de confirmação; tem prioridade sobre o número
  ticketPrice: 380,              // Valor em reais
  paymentTerms: 'Boleto ou cartão em 3 vezes sem juros, ou Pix.',
});
