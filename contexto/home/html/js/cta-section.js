(function () {
      'use strict';
      const form = document.getElementById('cta-whatsapp-form');
      const btnText = document.getElementById('btn-submit-text');
      const feedback = document.getElementById('cta-feedback');
      const manualLink = document.getElementById('cta-manual-link');
      const WHATSAPP_NUMBER = '542236602699';

      function buildWhatsAppUrl(name, business, volume) {
        const cleanName = name.trim();
        const cleanBusiness = business.trim();
        const cleanVolume = volume.trim().toLowerCase();
        const message = 'Hola, soy ' + cleanName + ' de ' + cleanBusiness + '. Me interesa cotizar envíos para ' + cleanVolume + ' paquetes mensuales.';
        return 'https://api.whatsapp.com/send/?phone=' + WHATSAPP_NUMBER + '&text=' + encodeURIComponent(message);
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const nameInput = document.getElementById('cta-name');
        const businessInput = document.getElementById('cta-business');
        const volumeSelect = document.getElementById('cta-volume');

        if (!nameInput.value || !businessInput.value || !volumeSelect.value) {
          return;
        }

        const url = buildWhatsAppUrl(nameInput.value, businessInput.value, volumeSelect.value);
        btnText.textContent = 'Mensaje listo en WhatsApp';
        manualLink.setAttribute('href', url);
        feedback.classList.add('active');

        const newWin = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWin) newWin.opener = null;
      });
    })();