// Cotizador Interactivo - Envíos DosRuedas Mar del Plata
document.addEventListener('DOMContentLoaded', () => {
  // Mobile drawer controls
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const overlay = document.getElementById('mobile-overlay');

  if (toggleBtn && overlay) {
    toggleBtn.addEventListener('click', () => {
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      toggleBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }

  // Pricing Matrix
  const TIERS = [
    { id: 1, minKm: 0, maxKm: 3, express: 3500, lowcost: 3000, label: '0 a 3 km (Microcentro)' },
    { id: 2, minKm: 3, maxKm: 6, express: 4200, lowcost: 4000, label: '3 a 6 km (Interbarrial)' },
    { id: 3, minKm: 6, maxKm: 10, express: 5000, lowcost: 5300, label: '6 a 10 km (Trayecto medio)' },
    { id: 4, minKm: 10, maxKm: 15, express: 6200, lowcost: 7000, label: '10 a 15 km (Perímetro urbano)' }
  ];

  // State
  let currentTierIndex = 0;
  let hasRain = false;
  let hasExtraStop = false;
  let isBulk = false;

  const origenInput = document.getElementById('input-origen');
  const destinoInput = document.getElementById('input-destino');
  const rainCheck = document.getElementById('check-rain');
  const extraStopCheck = document.getElementById('check-extra-stop');
  const bulkCheck = document.getElementById('check-bulk');
  const distButtons = document.querySelectorAll('.distance-btn');

  const expressPriceEl = document.getElementById('price-express');
  const lowcostPriceEl = document.getElementById('price-lowcost');
  const btnExpressWa = document.getElementById('btn-whatsapp-express');
  const btnLowcostWa = document.getElementById('btn-whatsapp-lowcost');

  function calculatePrices() {
    const tier = TIERS[currentTierIndex];
    let exp = tier.express;
    let low = tier.lowcost;

    // Modifiers
    if (hasRain) {
      exp = Math.round(exp * 1.20);
      low = Math.round(low * 1.20);
    }
    if (hasExtraStop) {
      exp = Math.round(exp * 1.30);
      low = Math.round(low * 1.30);
    }
    if (isBulk) {
      exp += 1000;
      low += 1000;
    }

    if (expressPriceEl) expressPriceEl.textContent = '$' + exp.toLocaleString('es-AR');
    if (lowcostPriceEl) lowcostPriceEl.textContent = '$' + low.toLocaleString('es-AR');

    updateWhatsAppLinks(exp, low, tier);
  }

  function updateWhatsAppLinks(expPrice, lowPrice, tier) {
    const orig = origenInput?.value.trim() || 'No especificado';
    const dest = destinoInput?.value.trim() || 'No especificado';
    const rainText = hasRain ? ' (Con lluvia/piso mojado +20%)' : '';
    const stopText = hasExtraStop ? ' (Con parada intermedia +30%)' : '';
    const bulkText = isBulk ? ' (Bulto especial >5kg)' : '';

    const expMsg = encodeURIComponent(
      `Hola Envíos DosRuedas! Quiero pedir un Envío EXPRESS en moto:\n\n` +
      `📍 Retiro: ${orig}\n` +
      `🎯 Entrega: ${dest}\n` +
      `📏 Tramo: ${tier.label}\n` +
      `💰 Tarifa estimada: $${expPrice.toLocaleString('es-AR')}${rainText}${stopText}${bulkText}\n\n` +
      `¿Tienen disponibilidad de franja horaria ahora?`
    );

    const lowMsg = encodeURIComponent(
      `Hola Envíos DosRuedas! Quiero pedir un Envío LOWCOST en el día:\n\n` +
      `📍 Retiro: ${orig}\n` +
      `🎯 Entrega: ${dest}\n` +
      `📏 Tramo: ${tier.label}\n` +
      `💰 Tarifa estimada: $${lowPrice.toLocaleString('es-AR')}${rainText}${stopText}${bulkText}\n\n` +
      `Confirmo para entrega hoy antes de las 19 hs.`
    );

    if (btnExpressWa) btnExpressWa.href = `https://wa.me/5492236602699?text=${expMsg}`;
    if (btnLowcostWa) btnLowcostWa.href = `https://wa.me/5492236602699?text=${lowMsg}`;
  }

  // Distance buttons click
  distButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      distButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentTierIndex = index;
      calculatePrices();
    });
  });

  // Checkboxes
  if (rainCheck) {
    rainCheck.addEventListener('change', (e) => {
      hasRain = e.target.checked;
      calculatePrices();
    });
  }
  if (extraStopCheck) {
    extraStopCheck.addEventListener('change', (e) => {
      hasExtraStop = e.target.checked;
      calculatePrices();
    });
  }
  if (bulkCheck) {
    bulkCheck.addEventListener('change', (e) => {
      isBulk = e.target.checked;
      calculatePrices();
    });
  }

  // Inputs
  if (origenInput) origenInput.addEventListener('input', calculatePrices);
  if (destinoInput) destinoInput.addEventListener('input', calculatePrices);

  // Quick Chips
  document.querySelectorAll('.chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      const targetInputId = chip.getAttribute('data-target');
      const val = chip.getAttribute('data-val');
      const input = document.getElementById(targetInputId);
      if (input) {
        input.value = val;
        calculatePrices();
      }
    });
  });

  // Initial calculation
  calculatePrices();
});
