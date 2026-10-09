(() => {
  'use strict';

  const config = window.INVITATION_CONFIG || {};
  const root = document.documentElement;
  const screen = document.getElementById('envelope-screen');
  const main = document.getElementById('convite');
  const envelope = document.getElementById('open-envelope');
  const openText = document.getElementById('open-invitation');
  const status = document.getElementById('invitation-status');
  const confetti = document.getElementById('confetti');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const objectiveButtons = [...document.querySelectorAll('[data-objective]')];
  const objectiveProgress = document.getElementById('objective-progress');
  const storageKey = 'convite-formatura-maite-objetivos-v1';

  let phase = 'closed';
  let openingTimer = null;
  let fadeTimer = null;
  let confettiTimer = null;
  let revealObserver = null;

  const cleanText = value => typeof value === 'string' ? value.trim() : '';
  const graduateName = cleanText(config.graduateName) || 'Maitê';

  function validDate(value) {
    if (!cleanText(value)) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function applyEventDetails() {
    document.querySelectorAll('[data-graduate-name]').forEach(element => {
      element.textContent = graduateName;
    });
    document.title = `${graduateName} · Convite de formatura`;
    document.querySelector('meta[property="og:title"]').content = `${graduateName} · Convite de formatura em Pedagogia`;
    document.querySelector('meta[name="description"]').content = `Você foi cuidadosamente selecionado para a melhor aula do semestre: a festa de formatura em Pedagogia de ${graduateName}.`;

    const start = validDate(config.startsAt);
    const dateLabel = cleanText(config.dateLabel) || (start ? start.toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo', day: 'numeric', month: 'long', year: 'numeric',
    }) : '');
    const timeLabel = cleanText(config.timeLabel) || (start ? `Às ${start.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit',
    })}` : '');
    const locationName = cleanText(config.locationName);
    const address = cleanText(config.address);
    document.getElementById('event-date').textContent = dateLabel || 'A confirmar';
    document.getElementById('event-time').textContent = timeLabel || 'A confirmar';
    document.getElementById('event-location').textContent = locationName || address || 'A confirmar';
    if (Number.isFinite(config.ticketPrice) && config.ticketPrice >= 0) {
      document.getElementById('ticket-value').textContent = config.ticketPrice.toLocaleString('pt-BR', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
      });
    }
    if (cleanText(config.paymentTerms)) {
      document.getElementById('ticket-payments').textContent = cleanText(config.paymentTerms);
    }

    const addressElement = document.getElementById('event-address');
    if (address && locationName) {
      addressElement.textContent = address;
      addressElement.hidden = false;
    }

    const pending = document.getElementById('event-pending');
    const allDetailsReady = Boolean(dateLabel && timeLabel && (locationName || address));
    pending.hidden = allDetailsReady;
    if (dateLabel && (locationName || address) && !timeLabel) {
      pending.textContent = 'O horário desta aula especial será informado em breve.';
    } else if (!allDetailsReady && (dateLabel || timeLabel || locationName || address)) {
      pending.textContent = 'Os demais detalhes desta aula especial serão informados em breve.';
    }

    const actions = document.getElementById('event-actions');
    const rsvp = document.getElementById('rsvp-link');
    const map = document.getElementById('map-link');
    const calendar = document.getElementById('calendar-button');
    let hasActions = false;
    rsvp.hidden = true;

    let whatsappUrl = '';
    try {
      const url = new URL(cleanText(config.whatsappUrl));
      if (url.protocol === 'https:') whatsappUrl = url.href;
    } catch { /* Sem link válido, o número configurado continua disponível como alternativa. */ }
    const phone = cleanText(config.whatsapp).replace(/\D/g, '');
    if (whatsappUrl) {
      rsvp.href = whatsappUrl;
      rsvp.hidden = false;
      hasActions = true;
    } else if (/^\d{10,15}$/.test(phone)) {
      const message = `Olá, ${graduateName}! Quero confirmar minha presença na sua festa de formatura em Pedagogia. ♡`;
      rsvp.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      rsvp.hidden = false;
      hasActions = true;
    }
    if (address || locationName) {
      const url = new URL('https://www.google.com/maps/search/');
      url.searchParams.set('api', '1');
      url.searchParams.set('query', address || locationName);
      map.href = url.toString();
      map.hidden = false;
      hasActions = true;
    }
    if (start) {
      calendar.hidden = false;
      hasActions = true;
      calendar.addEventListener('click', () => downloadCalendar(start));
    }
    actions.hidden = !hasActions;
  }

  function clearConfetti() {
    window.clearTimeout(confettiTimer);
    confetti.replaceChildren();
  }

  function celebrate() {
    if (reducedMotion.matches) return;
    clearConfetti();
    const colors = ['#cebbd8', '#e1b1fd', '#b98937', '#af93c4', '#f5efec'];
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 32; i += 1) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.setProperty('--x', `${Math.random() * 100}%`);
      piece.style.setProperty('--color', colors[i % colors.length]);
      piece.style.setProperty('--duration', `${2.6 + Math.random() * 1.3}s`);
      piece.style.setProperty('--delay', `${Math.random() * .45}s`);
      piece.style.setProperty('--drift', `${Math.random() * 140 - 70}px`);
      piece.style.setProperty('--rotation', `${Math.random() * 580 - 290}deg`);
      if (i % 4 === 0) piece.style.borderRadius = '50%';
      fragment.appendChild(piece);
    }
    confetti.appendChild(fragment);
    confettiTimer = window.setTimeout(clearConfetti, 4700);
  }

  function enableReveals() {
    const elements = [...document.querySelectorAll('.reveal')];
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      elements.forEach(element => element.classList.add('is-visible'));
      return;
    }
    if (revealObserver) return;
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .03, rootMargin: '0px 0px -20px 0px' });
    elements.forEach(element => revealObserver.observe(element));
  }

  function showInvitation() {
    window.clearTimeout(openingTimer);
    phase = 'open';
    root.classList.add('invitation-open');
    document.body.classList.remove('envelope-active');
    main.inert = false;
    screen.classList.add('is-leaving');
    screen.setAttribute('aria-busy', 'false');
    envelope.setAttribute('aria-expanded', 'true');
    envelope.disabled = false;
    openText.disabled = false;
    window.scrollTo(0, 0);
    enableReveals();
    const title = document.getElementById('invitation-title');
    title.setAttribute('tabindex', '-1');
    title.focus({ preventScroll: true });
    status.textContent = 'Convite aberto. Bem-vindo à festa de formatura em Pedagogia!';
    celebrate();
    fadeTimer = window.setTimeout(() => { screen.hidden = true; }, reducedMotion.matches ? 0 : 650);
  }

  function openInvitation(skipAnimation = false) {
    if (phase !== 'closed') return;
    phase = 'opening';
    envelope.disabled = true;
    openText.disabled = true;
    screen.setAttribute('aria-busy', 'true');
    screen.classList.add('is-opening');
    status.textContent = 'Abrindo o seu convite.';
    if (reducedMotion.matches || skipAnimation) {
      showInvitation();
    } else {
      openingTimer = window.setTimeout(showInvitation, 1900);
    }
  }

  function replayEnvelope() {
    window.clearTimeout(openingTimer);
    window.clearTimeout(fadeTimer);
    clearConfetti();
    phase = 'closed';
    screen.hidden = false;
    screen.classList.remove('is-opening', 'is-leaving');
    screen.setAttribute('aria-busy', 'false');
    envelope.disabled = false;
    openText.disabled = false;
    envelope.setAttribute('aria-expanded', 'false');
    envelope.focus({ preventScroll: true });
    main.inert = true;
    root.classList.remove('invitation-open');
    document.body.classList.add('envelope-active');
    window.scrollTo(0, 0);
    status.textContent = 'Envelope fechado. Toque no lacre para abrir novamente.';
  }

  function updateObjectives(persist = true) {
    const selected = objectiveButtons.filter(button => button.getAttribute('aria-pressed') === 'true');
    if (selected.length === objectiveButtons.length) {
      objectiveProgress.textContent = 'Todos os objetivos marcados. Essa aula vai ser inesquecível! ♡';
    } else if (selected.length) {
      objectiveProgress.textContent = `${selected.length} de ${objectiveButtons.length} objetivos marcados. Essa aula promete!`;
    } else {
      objectiveProgress.textContent = 'Marque os objetivos que você vai cumprir. ♡';
    }
    if (persist) {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(selected.map(button => button.dataset.objective)));
      } catch { /* O convite continua funcionando quando o armazenamento está indisponível. */ }
    }
  }

  function initObjectives() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) || '[]');
      if (Array.isArray(saved)) {
        objectiveButtons.forEach(button => {
          button.setAttribute('aria-pressed', String(saved.includes(button.dataset.objective)));
        });
      }
    } catch { /* Dados antigos ou navegação privada não bloqueiam a página. */ }
    objectiveButtons.forEach(button => {
      button.addEventListener('click', () => {
        button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
        updateObjectives();
      });
    });
    updateObjectives(false);
  }

  function escapeCalendarText(value) {
    return value.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }

  function foldCalendarLine(line) {
    const encoder = new TextEncoder();
    const lines = [];
    let current = '';
    let bytes = 0;
    for (const character of line) {
      const length = encoder.encode(character).length;
      if (bytes + length > 75) {
        lines.push(current);
        current = ' ';
        bytes = 1;
      }
      current += character;
      bytes += length;
    }
    lines.push(current);
    return lines.join('\r\n');
  }

  function downloadCalendar(start) {
    const configuredEnd = validDate(config.endsAt);
    const end = configuredEnd && configuredEnd > start ? configuredEnd : new Date(start.getTime() + 4 * 60 * 60 * 1000);
    const asUTC = date => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
    const lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Convite Pedagogia//Formatura//PT-BR',
      'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
      `UID:formatura-${start.getTime()}@convite-pedagogia`,
      `DTSTAMP:${asUTC(new Date())}`, `DTSTART:${asUTC(start)}`, `DTEND:${asUTC(end)}`,
      `SUMMARY:${escapeCalendarText(`Formatura em Pedagogia · ${graduateName}`)}`,
      `DESCRIPTION:${escapeCalendarText('Aula especial: Festa de formatura! Sua presença vale mais do que qualquer nota.')}`,
      `LOCATION:${escapeCalendarText([cleanText(config.locationName), cleanText(config.address)].filter(Boolean).join(' - '))}`,
      'END:VEVENT', 'END:VCALENDAR',
    ];
    const calendar = `${lines.map(foldCalendarLine).join('\r\n')}\r\n`;
    const blob = new Blob([calendar], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatura-pedagogia.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  applyEventDetails();
  initObjectives();
  envelope.addEventListener('click', () => openInvitation());
  openText.addEventListener('click', () => openInvitation());
  document.querySelectorAll('[data-replay]').forEach(button => button.addEventListener('click', replayEnvelope));
  document.querySelector('.skip-link').addEventListener('click', event => {
    if (phase !== 'open') {
      event.preventDefault();
      if (phase === 'closed') openInvitation(true);
      else showInvitation();
    }
  });
  if (reducedMotion.addEventListener) {
    reducedMotion.addEventListener('change', event => {
      if (event.matches) {
        if (phase === 'opening') showInvitation();
        clearConfetti();
        document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
      }
    });
  }

  root.classList.add('js');
  document.body.classList.add('envelope-active');
  screen.hidden = false;
  main.inert = true;
  envelope.setAttribute('aria-expanded', 'false');
  envelope.setAttribute('aria-controls', 'convite');
  window.__invitationReady = true;
})();
