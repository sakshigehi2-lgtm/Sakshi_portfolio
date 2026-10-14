/**
 * Sakshi Baldevsingh Gehi - Portfolio JavaScript
 * Features:
 * 1. Mobile Drawer Navigation
 * 2. Active Section Highlighting via IntersectionObserver
 * 3. Fully Working Active Contact Session:
 *    - Form validation & direct mailto link invocation
 *    - One-click email copy to clipboard with toast notification
 *    - Direct Gmail web dispatch support
 * 4. Interactive Project Modals:
 *    - QR Attendance Simulator (Dynamic Canvas QR, 45s timer, student roll check-in & proxy defense)
 *    - E-Commerce Shopping Cart Simulator (Add to cart, qty adjustments, live subtotal, checkout feedback)
 * 5. Dynamic Footer Year
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Drawer Navigation
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const drawerCloseBtn = document.getElementById('drawer-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDrawer = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Active Nav Link on Scroll (Intersection Observer)
  const sections = document.querySelectorAll('main section[id]');
  const navItems = document.querySelectorAll('.desktop-nav .nav-item');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === `#${activeId}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // 4. Toast Notification Utility
  const showToast = (message, duration = 3500) => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  // 5. One-Click Copy Email Button
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyEmailText = document.getElementById('copy-email-text');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'sakshigehi2@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          if (copyEmailText) copyEmailText.textContent = 'Copied!';
          showToast('&#10004; Email copied to clipboard: <strong>sakshigehi2@gmail.com</strong>');
          setTimeout(() => {
            if (copyEmailText) copyEmailText.textContent = 'Copy Email';
          }, 2500);
        }).catch(() => {
          showToast('Email: <strong>sakshigehi2@gmail.com</strong>');
        });
      } else {
        showToast('Email: <strong>sakshigehi2@gmail.com</strong>');
      }
    });
  }

  // 6. Fully Working Active Contact Form & Live Mail Session
  const contactForm = document.getElementById('active-contact-form');
  const formToast = document.getElementById('form-toast');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const charCounter = document.getElementById('char-counter');
  const submitBtn = document.getElementById('form-submit-btn');
  const directGmailBtn = document.getElementById('direct-gmail-btn');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  // Live dynamic update of Gmail link while user types info
  const updateLiveGmailLink = () => {
    if (!directGmailBtn) return;
    const nameVal = nameInput ? nameInput.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const subjectVal = subjectInput && subjectInput.value.trim()
      ? subjectInput.value.trim()
      : (nameVal ? `Portfolio Inquiry from ${nameVal}` : 'Portfolio Inquiry for Sakshi Gehi');
    const messageVal = messageInput ? messageInput.value.trim() : '';
    const bodyContent = `Hello Sakshi,\n\n${messageVal}\n\n---\nFrom: ${nameVal || '[Name]'}\nEmail: ${emailVal || '[Email]'}`;
    directGmailBtn.href = `https://mail.google.com/mail/?view=cm&fs=1&to=sakshigehi2@gmail.com&su=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent(bodyContent)}`;
  };

  // Real-time active feedback while user is adding info
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameError) nameError.textContent = '';
      if (nameInput.value.trim().length > 0) {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
      } else {
        nameInput.classList.remove('is-valid');
      }
      updateLiveGmailLink();
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (emailError) emailError.textContent = '';
      const val = emailInput.value.trim();
      if (validateEmail(val)) {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
      } else {
        emailInput.classList.remove('is-valid');
      }
      updateLiveGmailLink();
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('input', updateLiveGmailLink);
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      if (messageError) messageError.textContent = '';
      const len = messageInput.value.trim().length;
      if (charCounter) {
        charCounter.textContent = `${len} character${len === 1 ? '' : 's'}`;
      }
      if (len > 0) {
        messageInput.classList.remove('is-invalid');
        messageInput.classList.add('is-valid');
      } else {
        messageInput.classList.remove('is-valid');
      }
      updateLiveGmailLink();
    });
  }

  // Handle active email dispatch on form submission
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (messageError) messageError.textContent = '';
      if (formToast) {
        formToast.className = 'form-toast';
        formToast.textContent = '';
      }

      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        if (nameError) nameError.textContent = 'Please enter your name.';
        if (nameInput) nameInput.classList.add('is-invalid');
        isValid = false;
      }

      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal) {
        if (emailError) emailError.textContent = 'Please enter your email.';
        if (emailInput) emailInput.classList.add('is-invalid');
        isValid = false;
      } else if (!validateEmail(emailVal)) {
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        if (emailInput) emailInput.classList.add('is-invalid');
        isValid = false;
      }

      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal) {
        if (messageError) messageError.textContent = 'Please write a message.';
        if (messageInput) messageInput.classList.add('is-invalid');
        isValid = false;
      }

      if (!isValid) {
        const firstInvalid = contactForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const subjectVal = subjectInput && subjectInput.value.trim()
        ? subjectInput.value.trim()
        : `Portfolio Inquiry from ${nameVal}`;

      const mailBody = `Hello Sakshi,\n\n${messageVal}\n\nFrom: ${nameVal}\nEmail: ${emailVal}`;

      // Set loading state on submit button
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Send Active Email';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="btn-spinner"></span>
          <span>Sending Email...</span>
        `;
      }

      showToast(`&#128233; Dispatching active email to <strong>sakshigehi2@gmail.com</strong>...`);

      try {
        const response = await fetch('https://formsubmit.co/ajax/sakshigehi2@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: nameVal,
            email: emailVal,
            _subject: subjectVal,
            message: messageVal,
            _captcha: 'false',
            _template: 'table'
          })
        });

        const data = await response.json();

        if (response.ok && (data.success === 'true' || data.success === true)) {
          if (formToast) {
            formToast.innerHTML = `&#9989; <strong>Email Sent Successfully!</strong> Thank you <strong>${nameVal}</strong>, your message has been delivered to <strong>sakshigehi2@gmail.com</strong>. Sakshi will get back to you shortly.`;
            formToast.className = 'form-toast success';
          }
          showToast(`&#9989; Email delivered to <strong>sakshigehi2@gmail.com</strong>!`);

          // Reset inputs and valid markers
          contactForm.reset();
          [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
            if (inp) {
              inp.classList.remove('is-valid');
              inp.classList.remove('is-invalid');
            }
          });
          if (charCounter) charCounter.textContent = '0 characters';
          updateLiveGmailLink();
        } else if (data.message && data.message.toLowerCase().includes('activation')) {
          if (formToast) {
            formToast.innerHTML = `&#128233; <strong>Message Submitted!</strong> Note: FormSubmit has sent a 1-time activation link to <strong>sakshigehi2@gmail.com</strong>. Once Sakshi confirms it in her inbox, messages route automatically.<br><a href="${directGmailBtn ? directGmailBtn.href : '#'}" target="_blank" style="color: #38bdf8; text-decoration: underline; margin-top: 6px; display: inline-block;">Or click here to send immediately via Gmail Web &rarr;</a>`;
            formToast.className = 'form-toast success';
          }
          showToast(`&#128233; Form submission dispatched to <strong>sakshigehi2@gmail.com</strong>`);
          contactForm.reset();
          [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
            if (inp) {
              inp.classList.remove('is-valid');
              inp.classList.remove('is-invalid');
            }
          });
          if (charCounter) charCounter.textContent = '0 characters';
          updateLiveGmailLink();
        } else {
          throw new Error(data.message || 'Transmission failed');
        }
      } catch (err) {
        console.error('Email dispatch error:', err);
        const gmailFallbackUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=sakshigehi2@gmail.com&su=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent(mailBody)}`;
        const mailtoFallbackUrl = `mailto:sakshigehi2@gmail.com?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent(mailBody)}`;

        if (formToast) {
          formToast.innerHTML = `
            &#9888; Direct transmission encountered a network issue. Send directly using either option:
            <div style="margin-top: 10px; display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
              <a href="${gmailFallbackUrl}" target="_blank" class="btn btn-sm btn-glass-cyan">Open in Gmail Web</a>
              <a href="${mailtoFallbackUrl}" class="btn btn-sm btn-gradient">Launch Mail Client</a>
            </div>
          `;
          formToast.className = 'form-toast error';
        }
        showToast('&#9888; Issue sending email. Quick Gmail dispatch available below.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
      }
    });
  }

  // 7. Interactive Project Modals (QR Attendance & E-Commerce)
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalCloseAction = document.querySelector('.modal-close-action');
  const modalContactAction = document.querySelector('.modal-contact-action');
  const modalTriggers = document.querySelectorAll('.project-modal-trigger');

  let qrTimerInterval = null;

  // Procedural QR generator on canvas
  const drawSimulatedQR = (canvas, seed) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = '#0f172a';
    const grid = 21;
    const cellSize = size / grid;

    const drawFinder = (x, y) => {
      ctx.fillRect(x * cellSize, y * cellSize, 7 * cellSize, 7 * cellSize);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect((x + 1) * cellSize, (y + 1) * cellSize, 5 * cellSize, 5 * cellSize);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect((x + 2) * cellSize, (y + 2) * cellSize, 3 * cellSize, 3 * cellSize);
    };

    drawFinder(0, 0);
    drawFinder(14, 0);
    drawFinder(0, 14);

    let rng = seed;
    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        if ((r < 8 && c < 8) || (r < 8 && c > 13) || (r > 13 && c < 8)) continue;
        rng = (rng * 9301 + 49297) % 233280;
        if (rng / 233280 > 0.48) {
          ctx.fillRect(c * cellSize, r * cellSize, cellSize - 0.5, cellSize - 0.5);
        }
      }
    }
  };

  const initQRSimulator = () => {
    const canvas = document.getElementById('qr-canvas-sim');
    const timerElem = document.getElementById('qr-timer-seconds');
    const tokenElem = document.getElementById('qr-session-token');
    const scanForm = document.getElementById('qr-scan-form');
    const rollInput = document.getElementById('qr-roll-input');
    const logBox = document.getElementById('qr-log-box');
    const presentCountElem = document.getElementById('qr-present-count');

    let secondsLeft = 45;
    let seed = Math.floor(Math.random() * 100000);
    let currentToken = 'RCPIT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    let attendeeSet = new Set(['RCPIT-24-001', 'RCPIT-24-012']);

    if (canvas) {
      canvas.width = 140;
      canvas.height = 140;
      drawSimulatedQR(canvas, seed);
    }
    if (tokenElem) tokenElem.textContent = currentToken;

    if (qrTimerInterval) clearInterval(qrTimerInterval);
    qrTimerInterval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        secondsLeft = 45;
        seed = Math.floor(Math.random() * 100000);
        currentToken = 'RCPIT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        if (tokenElem) tokenElem.textContent = currentToken;
        if (canvas) drawSimulatedQR(canvas, seed);
      }
      if (timerElem) timerElem.textContent = secondsLeft + 's';
    }, 1000);

    if (scanForm) {
      scanForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const roll = rollInput.value.trim().toUpperCase();
        if (!roll) return;

        if (attendeeSet.has(roll)) {
          alert(`Proxy Check-In Blocked! Student ${roll} has already marked attendance for this session.`);
          return;
        }

        attendeeSet.add(roll);
        if (presentCountElem) presentCountElem.textContent = attendeeSet.size;

        const timeStr = new Date().toLocaleTimeString();
        const item = document.createElement('div');
        item.className = 'demo-log-item';
        item.innerHTML = `<span>&#9989; ${roll}</span><span>${timeStr} (${currentToken})</span>`;
        if (logBox) logBox.prepend(item);

        rollInput.value = '';
      });
    }
  };

  const initEcomSimulator = () => {
    let cart = [
      { id: 1, name: 'Wireless Mechanical Keyboard', price: 49.99, qty: 1 }
    ];

    const renderCart = () => {
      const itemsContainer = document.getElementById('ecom-cart-items');
      const totalElem = document.getElementById('ecom-cart-total');
      const countBadge = document.getElementById('ecom-cart-badge');

      if (!itemsContainer || !totalElem) return;

      itemsContainer.innerHTML = '';
      let subtotal = 0;
      let totalQty = 0;

      cart.forEach(item => {
        subtotal += item.price * item.qty;
        totalQty += item.qty;
        const row = document.createElement('div');
        row.className = 'demo-log-item';
        row.innerHTML = `
          <span>${item.name} ($${item.price.toFixed(2)})</span>
          <span>
            <button class="cart-qty-btn" data-id="${item.id}" data-action="dec">-</button>
            <strong>${item.qty}</strong>
            <button class="cart-qty-btn" data-id="${item.id}" data-action="inc">+</button>
          </span>
        `;
        itemsContainer.appendChild(row);
      });

      totalElem.textContent = '$' + subtotal.toFixed(2);
      if (countBadge) countBadge.textContent = totalQty;

      document.querySelectorAll('.cart-qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'));
          const action = btn.getAttribute('data-action');
          const found = cart.find(x => x.id === id);
          if (found) {
            if (action === 'inc') found.qty++;
            if (action === 'dec') {
              found.qty--;
              if (found.qty <= 0) {
                cart = cart.filter(x => x.id !== id);
              }
            }
            renderCart();
          }
        });
      });
    };

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));

        const existing = cart.find(x => x.id === id);
        if (existing) {
          existing.qty++;
        } else {
          cart.push({ id, name, price, qty: 1 });
        }
        renderCart();
      });
    });

    const checkoutBtn = document.getElementById('ecom-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
          alert('Your cart is empty! Add items first.');
          return;
        }
        alert('Order Simulation Successful! State persisted & order confirmation recorded.');
        cart = [];
        renderCart();
      });
    }

    renderCart();
  };

  const projectModalsContent = {
    qr: {
      title: 'QR Code Smart Attendance System - System Architecture',
      content: `
        <h4>Project Background &amp; Motivation</h4>
        <p>Developed as an Academic Mini Project at R.C. Patel Institute of Technology, Shirpur. The system eliminates proxy roll calls and attendance tracking errors using dynamic, short-lived QR codes generated on the teacher dashboard.</p>
        
        <h4>Key Technical Pillars</h4>
        <ul>
          <li><strong>Dynamic QR Token Rotation:</strong> Generates encrypted, time-limited QR codes expiring every 45–60 seconds, preventing students from taking pictures and sharing with proxies.</li>
          <li><strong>Student Authentication:</strong> Verifies student credentials, checks session parameters, and ensures only registered students mark attendance.</li>
          <li><strong>Backend APIs &amp; Database Integration:</strong> Relational schema recording timestamped check-ins with unique constraint validation to guarantee zero duplicates.</li>
          <li><strong>Faculty Real-Time Dashboard:</strong> Instant display of present counts and automated CSV/Excel attendance export.</li>
        </ul>

        <h4>Tech Stack</h4>
        <p><strong>Languages &amp; Tools:</strong> Java / JavaScript, HTML5 Canvas, Responsive CSS, Database APIs, Authentication protocols.</p>
      `
    },
    qr_demo: {
      title: 'QR Code Smart Attendance System - Live Interactive Demo',
      content: `
        <p>Experience the dynamic QR generation and proxy-proof student attendance simulation in real time:</p>
        
        <div class="demo-panel">
          <div class="qr-demo-layout">
            <div class="qr-display-box">
              <canvas id="qr-canvas-sim" class="qr-canvas"></canvas>
              <span class="qr-token-label" id="qr-session-token">RCPIT-LOADING</span>
              <span class="pill" style="font-size: 0.74rem; color: #0284c7; font-weight: 700;">Expires in: <strong id="qr-timer-seconds">45s</strong></span>
            </div>

            <div class="qr-controls">
              <div class="demo-badge-row">
                <span>Class: <strong class="text-cyan">SY Computer Engg (RCPIT)</strong></span>
                <span>Present: <strong id="qr-present-count" class="text-purple">2</strong> / 60</span>
              </div>

              <form id="qr-scan-form" class="demo-input-row">
                <input type="text" id="qr-roll-input" placeholder="Enter Student Roll No (e.g. RCPIT-24-045)" required>
                <button type="submit" class="btn btn-gradient btn-sm">Scan &amp; Mark</button>
              </form>

              <div class="demo-log-box" id="qr-log-box">
                <div class="demo-log-item"><span>&#9989; RCPIT-24-012</span><span>09:02 AM (Verified)</span></div>
                <div class="demo-log-item"><span>&#9989; RCPIT-24-001</span><span>09:01 AM (Verified)</span></div>
              </div>
            </div>
          </div>
        </div>
      `
    },
    ecommerce: {
      title: 'E-Commerce Web Application - Architecture & State Design',
      content: `
        <h4>Application Architecture</h4>
        <p>A full-featured, mobile-first digital storefront built with responsive CSS, component-based modular structure, and client-side state persistence.</p>
        
        <h4>Core Modules</h4>
        <ul>
          <li><strong>Dynamic Catalog Filtering:</strong> Live category filtering and search with optimized JavaScript array handling.</li>
          <li><strong>Shopping Cart State Engine:</strong> Add to cart, quantity manipulation, subtotal updates, and promo coupon calculation.</li>
          <li><strong>Local Storage Synchronization:</strong> Client-side persistence retaining shopping cart state across page reloads.</li>
          <li><strong>Checkout Simulation:</strong> Form validation for shipping info and instant order confirmation.</li>
        </ul>

        <h4>Tech Stack</h4>
        <p><strong>Languages &amp; Tools:</strong> JavaScript ES6+, Modern Glassmorphism CSS, REST API integration, LocalStorage.</p>
      `
    },
    ecommerce_demo: {
      title: 'E-Commerce Platform - Live Shopping Cart Simulation',
      content: `
        <p>Test dynamic cart calculation, item quantity manipulation, and checkout simulation below:</p>
        
        <div class="demo-panel">
          <div class="shop-demo-grid">
            <div class="shop-card">
              <h5>Wireless ANC Earbuds</h5>
              <span class="price">$39.99</span>
              <button class="btn btn-glass-cyan btn-sm add-to-cart-btn" data-id="2" data-name="Wireless ANC Earbuds" data-price="39.99">+ Add to Cart</button>
            </div>
            <div class="shop-card">
              <h5>Smart Fitness Band</h5>
              <span class="price">$29.50</span>
              <button class="btn btn-glass-cyan btn-sm add-to-cart-btn" data-id="3" data-name="Smart Fitness Band" data-price="29.50">+ Add to Cart</button>
            </div>
            <div class="shop-card">
              <h5>Ergonomic Mouse</h5>
              <span class="price">$24.00</span>
              <button class="btn btn-glass-cyan btn-sm add-to-cart-btn" data-id="4" data-name="Ergonomic Mouse" data-price="24.00">+ Add to Cart</button>
            </div>
          </div>

          <div class="shop-cart-tray">
            <div class="cart-header-line">
              <span>Shopping Cart (<span id="ecom-cart-badge" class="text-cyan">1</span> items)</span>
              <span>Total: <span id="ecom-cart-total" class="text-cyan">$49.99</span></span>
            </div>
            <div class="demo-log-box" id="ecom-cart-items"></div>
            <div style="margin-top: 14px; display: flex; justify-content: flex-end;">
              <button class="btn btn-gradient btn-sm" id="ecom-checkout-btn">Simulate Instant Checkout</button>
            </div>
          </div>
        </div>
      `
    }
  };

  const openModal = (projectId) => {
    const data = projectModalsContent[projectId];
    if (data && modal && modalTitle && modalBody) {
      modalTitle.textContent = data.title;
      modalBody.innerHTML = data.content;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (projectId === 'qr_demo') {
        initQRSimulator();
      } else if (projectId === 'ecommerce_demo') {
        initEcomSimulator();
      }
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (qrTimerInterval) {
        clearInterval(qrTimerInterval);
        qrTimerInterval = null;
      }
    }
  };

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-project');
      openModal(pid);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCloseAction) modalCloseAction.addEventListener('click', closeModal);
  if (modalContactAction) modalContactAction.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
