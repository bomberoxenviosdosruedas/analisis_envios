(function () {
  'use strict';
  const WHATSAPP_NUMBER = '542236602699';

  function buildWhatsAppUrl(name, business, volume) {
    const cleanName = (name || '').trim();
    const cleanBusiness = (business || '').trim();
    const cleanVolume = (volume || '').trim();
    const message = `Hola, soy ${cleanName} de ${cleanBusiness}. Me interesa cotizar envíos para ${cleanVolume}.`;
    return 'https://api.whatsapp.com/send/?phone=' + WHATSAPP_NUMBER + '&text=' + encodeURIComponent(message);
  }

  function handleSubmission(form) {
    const nameInput = form.querySelector('#input-name, #cta-name, [name="name"]');
    const businessInput = form.querySelector('#input-business, #cta-business, [name="business"]');
    const volumeSelect = form.querySelector('#input-volume, #cta-volume, [name="volume"]');

    const name = nameInput ? nameInput.value.trim() : '';
    const business = businessInput ? businessInput.value.trim() : '';
    const volume = volumeSelect ? volumeSelect.value : '';

    if (!name || !business || !volume) return;

    const url = buildWhatsAppUrl(name, business, volume);

    const btnText = form.querySelector('#btn-submit-text, button[type="submit"] span');
    if (btnText) btnText.textContent = 'Mensaje listo en WhatsApp';

    const feedback = document.getElementById('cta-feedback') || document.getElementById('cta-confirmation');
    const manualLink = document.getElementById('cta-manual-link') || document.getElementById('cta-whatsapp-link');

    if (manualLink) manualLink.setAttribute('href', url);
    if (feedback) {
      feedback.classList.add('active');
      feedback.style.display = 'block';
    }

    const newWin = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWin) newWin.opener = null;
  }

  // Global fallback for inline onsubmit
  window.submitWhatsAppCotizacion = function () {
    const form = document.querySelector('#whatsapp-cotizar-form, #cta-whatsapp-form, #home-cta-form');
    if (form) handleSubmission(form);
  };

  // Event listener attachment
  document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('#whatsapp-cotizar-form, #cta-whatsapp-form, #home-cta-form');
    forms.forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        handleSubmission(form);
      });
    });
  });
})();
