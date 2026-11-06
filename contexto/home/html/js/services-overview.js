(function () {
      'use strict';

      /* ─── DATOS COMPLETOS DE SERVICIOS (Fiel a ServicesOverview.tsx) ─── */
      const SERVICES_DATA = [
        {
          id: 'express',
          title: 'Envíos Express',
          meta: '+7 Años de Trayectoria · Todo Mar del Plata',
          summary: 'Servicio de mensajería urbana con horario a elección, ideal para trámites urgentes, despacho de encomiendas y entrega de documentación. Coordinás la franja horaria que te conviene y se asigna un repartidor exclusivo para tu envío.',
          features: [
            'Tarifa base de $3.500 hasta 5 km.',
            'Entrega en franja de 3 hs a elección, pedido con anticipación mínima.',
            'Notificación automática de entrega por WhatsApp.'
          ],
          stats: { time: '3 horas', price: '$3.500 Base', weight: 'Hasta 5 kg' },
          ctaText: 'COTIZÁ TU EXPRESS',
          ctaHref: '/cotizar',
          iconSvg: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="none" stroke="currentColor" stroke-width="2.5"></polygon>'
        },
        {
          id: 'lowcost',
          title: 'Envíos LowCost',
          meta: 'Tarifa Fija Especial · Todo Gral. Pueyrredón',
          summary: 'La alternativa ideal para comercios y e-commerce que buscan optimizar costos de envío. Es un reparto económico programado para el día, no un agrupamiento de tus propios envíos: lo pedís antes del corte y se entrega a lo largo de la jornada.',
          features: [
            'Tarifa base de $2.800 hasta 5 km.',
            'Pedí antes de las 13:00 y se entrega antes de las 20:00.',
            'Sin elección de franja horaria: la tarifa más baja de la ciudad.'
          ],
          stats: { time: 'Programado', price: '$2.800 Base', weight: 'Hasta 5 kg' },
          ctaText: 'PROBÁ EL LOWCOST',
          ctaHref: '/cotizar',
          iconSvg: '<path d="m7.5 4.27 9 5.15" fill="none" stroke="currentColor" stroke-width="2.5"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" fill="none" stroke="currentColor" stroke-width="2.5"></path><path d="m3.3 7 8.7 5 8.7-5" fill="none" stroke="currentColor" stroke-width="2.5"></path><path d="M12 22V12" fill="none" stroke="currentColor" stroke-width="2.5"></path>'
        },
        {
          id: 'flex',
          title: 'Envíos Flex',
          meta: 'Corte extendido 14:00 · Mar del Plata urbana',
          summary: 'Habilitá Envíos Flex en tu cuenta de MercadoLibre y despachá todas tus ventas en el mismo día. Mejorá tu reputación y convertite en vendedor destacado con recolección gratuita.',
          features: [
            'Visitas bonificadas según tu volumen diario de entregas.',
            'Reparto coordinado antes de las 21:00 hs con firma digital.',
            'Recolección a domicilio sin cargo extra por nuestro equipo.'
          ],
          stats: { time: 'En el día', price: 'Zonificado', weight: 'Moto / Auto' },
          ctaText: 'CONFIGURÁ FLEX',
          ctaHref: '/servicios/enviosflex',
          iconSvg: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" fill="none" stroke="currentColor" stroke-width="2.5"></path><path d="M15 18H9" fill="none" stroke="currentColor" stroke-width="2.5"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" fill="none" stroke="currentColor" stroke-width="2.5"></path><circle cx="17" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="2.5"></circle><circle cx="7" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="2.5"></circle>'
        },
        {
          id: '3pl',
          title: 'E-Commerce Same Day',
          meta: 'Stock guardado · Depósito Friuli 1972',
          summary: 'Almacená tus productos en nuestro depósito central de Friuli 1972 y olvidate del empaque y los despachos. Nosotros nos encargamos de todo el proceso logístico para que te dediques a vender.',
          features: [
            'E-Commerce Same Day con tarifa fija de $2.900 a toda la ciudad.',
            'E-Commerce 24HS con 15% OFF si traés los envíos listos (DropOFF).',
            'Control de stock digital por sistema QR/barras y picking con embalaje profesional.'
          ],
          stats: { time: 'Same Day', price: '$2.900 Fijo', weight: 'Sin límite' },
          ctaText: 'CONSULTÁ PLANES',
          ctaHref: '/servicios/deposito-fulfillment',
          iconSvg: '<path d="M3 21h18" fill="none" stroke="currentColor" stroke-width="2.5"></path><path d="M5 21V7l8-4v18" fill="none" stroke="currentColor" stroke-width="2.5"></path><path d="M19 21V11l-6-4" fill="none" stroke="currentColor" stroke-width="2.5"></path><path d="M9 9h1" fill="none" stroke="currentColor" stroke-width="2.5"></path><path d="M9 13h1" fill="none" stroke="currentColor" stroke-width="2.5"></path><path d="M9 17h1" fill="none" stroke="currentColor" stroke-width="2.5"></path>'
        }
      ];

      /* ─── ESTADO DEL CARRUSEL ─── */
      let activeIndex = 0;
      const totalServices = SERVICES_DATA.length;
      let isAutoRotate = true;
      let isHovered = false;
      let isModalOpen = false;
      let autoRotateTimer = null;
      let isSmallScreen = window.innerWidth < 640;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const sectionEl = document.getElementById('services-overview');
      const carouselRegion = document.getElementById('carousel-region');
      const toggleRotateBtn = document.getElementById('toggle-rotate');
      const prevBtn = document.getElementById('prev-service');
      const nextBtn = document.getElementById('next-service');
      const cardElements = Array.from(document.querySelectorAll('.service-card-wrapper'));
      const indicatorBtns = Array.from(document.querySelectorAll('.indicator-btn'));

      /* ─── MATRICES Y TRANSFORMACIONES 3D ─── */
      function updateCarousel() {
        cardElements.forEach((card, index) => {
          const offset = ((((index - activeIndex + totalServices / 2) % totalServices) + totalServices) % totalServices) - Math.floor(totalServices / 2);
          const absOffset = Math.abs(offset);
          const isCenter = offset === 0;

          if (reduceMotion) {
            card.style.transform = isCenter ? 'scale(1)' : 'scale(0.7)';
            card.style.opacity = isCenter ? '1' : '0';
            card.style.zIndex = isCenter ? totalServices : totalServices - absOffset;
            card.style.pointerEvents = isCenter ? 'auto' : 'none';
          } else {
            const rotateY = isSmallScreen ? 0 : offset * -28;
            const translateZ = isSmallScreen ? 0 : isCenter ? 120 : -absOffset * 180;
            const translateX = offset * (isSmallScreen ? 140 : 260);
            const scale = isCenter ? 1.05 : Math.max(0.65, 1 - absOffset * 0.18);
            const opacity = 1;

            card.style.transform = 'translateX(' + translateX + 'px) translateZ(' + translateZ + 'px) rotateY(' + rotateY + 'deg) scale(' + scale + ')';
            card.style.opacity = opacity;
            card.style.zIndex = totalServices - absOffset;
            card.style.pointerEvents = 'auto';
          }

          if (isCenter) {
            card.classList.add('is-center');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', 'Ver ficha técnica de ' + SERVICES_DATA[index].title);
          } else {
            card.classList.remove('is-center');
            card.setAttribute('tabindex', '-1');
            card.setAttribute('aria-label', 'Seleccionar ' + SERVICES_DATA[index].title);
          }
        });

        // Actualizar indicadores
        indicatorBtns.forEach((btn, i) => {
          const isActive = i === activeIndex;
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-current', isActive ? 'true' : 'false');
          btn.setAttribute('aria-label', 'Ir al servicio ' + SERVICES_DATA[i].title + (isActive ? ', servicio actual' : ''));
        });
      }

      function goToService(index) {
        activeIndex = (index + totalServices) % totalServices;
        updateCarousel();
      }

      /* ─── ROTACIÓN AUTOMÁTICA Y TEMPORIZADOR ─── */
      function stopAutoRotate() {
        if (autoRotateTimer) {
          clearInterval(autoRotateTimer);
          autoRotateTimer = null;
        }
      }

      function checkAutoRotate() {
        stopAutoRotate();
        if (isAutoRotate && !isHovered && !reduceMotion && !isModalOpen) {
          autoRotateTimer = setInterval(() => {
            goToService(activeIndex + 1);
          }, 4500);
        }
      }

      function setAutoRotateState(active) {
        isAutoRotate = active;
        toggleRotateBtn.classList.toggle('active', isAutoRotate);
        toggleRotateBtn.setAttribute('aria-pressed', isAutoRotate ? 'true' : 'false');
        toggleRotateBtn.innerText = isAutoRotate ? '⚡ ROTACIÓN AUTOMÁTICA' : 'ROTACIÓN PAUSADA';
        checkAutoRotate();
      }

      toggleRotateBtn.addEventListener('click', () => {
        setAutoRotateState(!isAutoRotate);
      });

      prevBtn.addEventListener('click', () => {
        setAutoRotateState(false);
        goToService(activeIndex - 1);
      });

      nextBtn.addEventListener('click', () => {
        setAutoRotateState(false);
        goToService(activeIndex + 1);
      });

      indicatorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          setAutoRotateState(false);
          goToService(idx);
        });
      });

      cardElements.forEach(card => {
        card.addEventListener('click', (e) => {
          const idx = parseInt(card.getAttribute('data-index'), 10);
          if (idx === activeIndex) {
            openModal(idx);
          } else {
            setAutoRotateState(false);
            goToService(idx);
          }
        });
      });

      // Pausar rotación en hover sobre la sección (fiel al TSX)
      sectionEl.addEventListener('mouseenter', () => {
        isHovered = true;
        checkAutoRotate();
      });
      sectionEl.addEventListener('mouseleave', () => {
        isHovered = false;
        checkAutoRotate();
      });

      // Teclado: Navegación ArrowLeft y ArrowRight
      carouselRegion.addEventListener('keydown', (e) => {
        if (isModalOpen) return;
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setAutoRotateState(false);
          goToService(activeIndex - 1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setAutoRotateState(false);
          goToService(activeIndex + 1);
        }
      });

      window.addEventListener('resize', () => {
        isSmallScreen = window.innerWidth < 640;
        updateCarousel();
      });

      /* ─── MODAL DIALOG Y GESTIÓN DE FOCO ─── */
      const modal = document.getElementById('service-modal');
      const modalClose = document.getElementById('modal-close');
      const modalBack = document.getElementById('modal-back');
      const modalTitle = document.getElementById('modal-title');
      const modalMeta = document.getElementById('modal-meta');
      const modalSummary = document.getElementById('modal-summary');
      const modalFeatures = document.getElementById('modal-features');
      const modalIcon = document.getElementById('modal-icon');
      const statTime = document.getElementById('stat-time');
      const statPrice = document.getElementById('stat-price');
      const statWeight = document.getElementById('stat-weight');
      const modalCta = document.getElementById('modal-cta');
      const modalCtaText = document.getElementById('modal-cta-text');
      let lastActiveTrigger = null;

      function openModal(index) {
        const item = SERVICES_DATA[index];
        lastActiveTrigger = document.activeElement;
        isModalOpen = true;
        checkAutoRotate();

        modalTitle.innerText = item.title;
        modalMeta.innerText = item.meta;
        modalSummary.innerText = item.summary;
        statTime.innerText = item.stats.time;
        statPrice.innerText = item.stats.price;
        statWeight.innerText = item.stats.weight;
        modalCtaText.innerText = item.ctaText;
        modalCta.setAttribute('href', item.ctaHref);

        modalIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">' + item.iconSvg + '</svg>';

        modalFeatures.innerHTML = item.features.map(f => {
          return '<div class="modal-feature-item">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
              '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>' +
              '<path d="m9 12 2 2 4-4"></path>' +
            '</svg>' +
            '<span>' + f + '</span>' +
          '</div>';
        }).join('');

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
          modalClose.focus();
        }, 50);
      }

      function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        isModalOpen = false;
        checkAutoRotate();

        if (lastActiveTrigger && typeof lastActiveTrigger.focus === 'function') {
          lastActiveTrigger.focus();
        }
      }

      modalClose.addEventListener('click', closeModal);
      modalBack.addEventListener('click', closeModal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });

      window.addEventListener('keydown', (e) => {
        if (!isModalOpen) return;

        if (e.key === 'Escape') {
          e.preventDefault();
          closeModal();
          return;
        }

        // Trap Focus
        if (e.key === 'Tab') {
          const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });

      updateCarousel();
      checkAutoRotate();

      /* ─── CANVAS RED LOGÍSTICA INTERACTIVA (LogisticaNetworkCanvas) ─── */
      const canvas = document.getElementById('network-canvas');
      if (canvas && !reduceMotion) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          let cssWidth = 0;
          let cssHeight = 0;
          let animId = null;
          let lastTime = null;
          const mouse = { x: -1000, y: -1000 };

          function resizeCanvas() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            cssWidth = canvas.offsetWidth;
            cssHeight = canvas.offsetHeight;
            canvas.width = Math.max(1, Math.round(cssWidth * dpr));
            canvas.height = Math.max(1, Math.round(cssHeight * dpr));
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          }

          resizeCanvas();
          window.addEventListener('resize', resizeCanvas);

          // Nodos de Mar del Plata
          const nodeDefs = [
            { id: 'cd',           label: 'Sede Central (Friuli)', size: 6, xRatio: 0.45, yRatio: 0.60 },
            { id: 'centro',       label: 'Centro',                size: 4, xRatio: 0.68, yRatio: 0.42 },
            { id: 'la_perla',     label: 'La Perla',              size: 4, xRatio: 0.65, yRatio: 0.30 },
            { id: 'constitucion', label: 'Constitución',          size: 4, xRatio: 0.52, yRatio: 0.18 },
            { id: 'guemes',       label: 'Zona Güemes',           size: 4, xRatio: 0.73, yRatio: 0.52 },
            { id: 'playa_grande', label: 'Playa Grande',          size: 4, xRatio: 0.77, yRatio: 0.63 },
            { id: 'puerto',       label: 'Puerto',                size: 4, xRatio: 0.72, yRatio: 0.76 },
            { id: 'bosque',       label: 'Bosque Peralta Ramos',  size: 4, xRatio: 0.64, yRatio: 0.88 },
            { id: 'martillo',     label: 'El Martillo / P. Ind.', size: 5, xRatio: 0.22, yRatio: 0.72 }
          ];

          const connections = [
            { from: 'cd',           to: 'martillo' },
            { from: 'cd',           to: 'centro' },
            { from: 'cd',           to: 'guemes' },
            { from: 'cd',           to: 'puerto' },
            { from: 'cd',           to: 'constitucion' },
            { from: 'constitucion', to: 'la_perla' },
            { from: 'constitucion', to: 'centro' },
            { from: 'la_perla',     to: 'centro' },
            { from: 'centro',       to: 'guemes' },
            { from: 'guemes',       to: 'playa_grande' },
            { from: 'playa_grande', to: 'puerto' },
            { from: 'puerto',       to: 'bosque' }
          ];

          const DETERMINISTIC_PARTICLES = [
            { connIndex: 0, speed: 0.0035, size: 2.8, color: '#FFEC01', progress: 0.1 },
            { connIndex: 1, speed: 0.0028, size: 3.2, color: '#FFFFFF', progress: 0.3 },
            { connIndex: 2, speed: 0.0042, size: 2.5, color: '#FFFFFF', progress: 0.5 },
            { connIndex: 3, speed: 0.0031, size: 3.0, color: '#FFEC01', progress: 0.7 },
            { connIndex: 4, speed: 0.0038, size: 2.7, color: '#FFFFFF', progress: 0.2 },
            { connIndex: 5, speed: 0.0025, size: 3.3, color: '#FFEC01', progress: 0.4 },
            { connIndex: 6, speed: 0.0045, size: 2.4, color: '#FFFFFF', progress: 0.6 },
            { connIndex: 7, speed: 0.0032, size: 2.9, color: '#FFFFFF', progress: 0.8 },
            { connIndex: 8, speed: 0.0037, size: 2.6, color: '#FFEC01', progress: 0.05 },
            { connIndex: 9, speed: 0.0029, size: 3.1, color: '#FFFFFF', progress: 0.25 },
            { connIndex: 10, speed: 0.0041, size: 2.3, color: '#FFFFFF', progress: 0.45 },
            { connIndex: 11, speed: 0.0033, size: 2.85, color: '#FFEC01', progress: 0.65 },
            { connIndex: 12, speed: 0.0036, size: 2.75, color: '#FFFFFF', progress: 0.85 },
            { connIndex: 13, speed: 0.0030, size: 3.05, color: '#FFEC01', progress: 0.15 },
            { connIndex: 14, speed: 0.0043, size: 2.45, color: '#FFFFFF', progress: 0.35 },
            { connIndex: 15, speed: 0.0034, size: 2.95, color: '#FFEC01', progress: 0.55 }
          ];

          window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
          });

          window.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
          });

          function animateCanvas(timestamp) {
            if (!lastTime) lastTime = timestamp;
            const delta = Math.min((timestamp - lastTime) / 16.667, 2);
            lastTime = timestamp;

            ctx.clearRect(0, 0, cssWidth, cssHeight);

            // Calcular coordenadas absolutas de los nodos
            const nodeMap = {};
            nodeDefs.forEach(def => {
              nodeMap[def.id] = {
                id: def.id,
                x: cssWidth * def.xRatio,
                y: cssHeight * def.yRatio,
                label: def.label,
                size: def.size
              };
            });

            // Dibujar Conexiones
            connections.forEach(conn => {
              const from = nodeMap[conn.from];
              const to = nodeMap[conn.to];
              if (!from || !to) return;

              ctx.beginPath();
              ctx.moveTo(from.x, from.y);
              ctx.lineTo(to.x, to.y);
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
              ctx.lineWidth = 1;
              ctx.stroke();

              // Efecto de proximidad del cursor
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2;
              const distMouse = Math.hypot(mouse.x - midX, mouse.y - midY);
              if (distMouse < 140) {
                const alpha = (1 - distMouse / 140) * 0.35;
                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.strokeStyle = 'rgba(255, 236, 1, ' + alpha + ')';
                ctx.lineWidth = 1.5;
                ctx.stroke();
              }
            });

            // Dibujar Partículas Móviles
            DETERMINISTIC_PARTICLES.forEach(p => {
              const conn = connections[p.connIndex % connections.length];
              const from = nodeMap[conn.from];
              const to = nodeMap[conn.to];
              if (!from || !to) return;

              p.progress = (p.progress + p.speed * delta) % 1;
              const curX = from.x + (to.x - from.x) * p.progress;
              const curY = from.y + (to.y - from.y) * p.progress;

              ctx.beginPath();
              ctx.arc(curX, curY, p.size, 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 6;
              ctx.fill();
              ctx.shadowBlur = 0;
            });

            // Dibujar Nodos
            nodeDefs.forEach(def => {
              const node = nodeMap[def.id];
              if (!node) return;

              const isHub = def.id === 'cd';
              const distMouse = Math.hypot(mouse.x - node.x, mouse.y - node.y);
              const isHoveredNode = distMouse < 50;

              // Anillo de pulso
              ctx.beginPath();
              ctx.arc(node.x, node.y, node.size + (isHub ? 4 : 2), 0, Math.PI * 2);
              ctx.fillStyle = isHub ? 'rgba(255, 236, 1, 0.15)' : 'rgba(255, 255, 255, 0.08)';
              ctx.fill();

              // Punto central
              ctx.beginPath();
              ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
              ctx.fillStyle = isHub ? '#FFEC01' : (isHoveredNode ? '#FFEC01' : '#FFFFFF');
              ctx.shadowColor = isHub ? '#FFEC01' : '#FFFFFF';
              ctx.shadowBlur = isHoveredNode ? 10 : (isHub ? 8 : 4);
              ctx.fill();
              ctx.shadowBlur = 0;

              // Etiquetas legibles para Sede Central o al hacer hover
              if (isHub || isHoveredNode) {
                ctx.font = '600 11px Outfit, sans-serif';
                ctx.fillStyle = isHub ? '#FFEC01' : '#FFFFFF';
                ctx.textAlign = 'center';
                ctx.fillText(node.label, node.x, node.y - 12);
              }
            });

            animId = requestAnimationFrame(animateCanvas);
          }

          animId = requestAnimationFrame(animateCanvas);
        }
      }
    })();