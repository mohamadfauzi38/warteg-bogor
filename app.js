(() => {
  'use strict';

  const config = window.WARTEG_CONFIG;
  if (!config) return;
  const business = config.business;
  const money = value => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value).replace(/\u00a0/g, '');
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const icons = {
    plus: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14"/></svg>'
  };
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const icon = name => {
    const holder = element('span');
    holder.innerHTML = icons[name];
    return holder.firstElementChild;
  };
  const seenIds = new Set();
  const products = (config.products || []).filter(product => {
    if (typeof product.id !== 'string' || seenIds.has(product.id) || !Number.isFinite(product.price) || product.price < 0) return false;
    seenIds.add(product.id);
    return true;
  });
  const productById = new Map(products.map(product => [product.id, product]));
  const storageKey = 'warteg-bogor-cart-v1';
  const maximumQuantity = 99;
  let cart = new Map();
  let category = 'Semua';
  let query = '';
  let toastTimer;
  let storageAvailable = true;
  let orderSectionVisible = false;

  function normalizePhone(value) {
    let digits = String(value || '').replace(/[\s()+.-]/g, '');
    if (/^0\d+$/.test(digits)) digits = '62' + digits.slice(1);
    return /^\d{8,15}$/.test(digits) ? digits : '';
  }

  function openWhatsApp(message) {
    const phone = normalizePhone(business.whatsapp);
    if (!phone) return false;
    const link = element('a');
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.append(link);
    link.click();
    link.remove();
    return true;
  }

  function imageFallback(image) {
    image.addEventListener('error', () => {
      const frame = image.parentElement;
      image.hidden = true;
      if (!frame.querySelector('.image-fallback')) frame.append(element('span', 'image-fallback', 'Foto belum tersedia'));
    }, { once: true });
  }

  function applyBusiness() {
    const themeKeys = { cream: 'cream', orange: 'orange', orangeHover: 'orange-hover', brown: 'brown', muted: 'muted', line: 'line', surface: 'surface', paper: 'paper' };
    for (const [key, property] of Object.entries(themeKeys)) {
      const value = config.theme?.[key];
      if (typeof value === 'string' && CSS.supports('color', value)) document.documentElement.style.setProperty(`--${property}`, value);
    }
    $('meta[name="theme-color"]').content = config.theme?.cream || '#fff8ed';
    $$('[data-brand-name]').forEach(node => { node.textContent = (business.brandName || business.name).toUpperCase(); });
    $$('[data-brand-city]').forEach(node => { node.textContent = business.city.toUpperCase(); });
    $$('[data-brand-link]').forEach(node => { node.setAttribute('aria-label', `${business.name}, beranda`); });
    $$('[data-demo-only]').forEach(node => { node.hidden = !business.demoMode; });
    $('[data-hero-first]').textContent = business.hero.title[0] || business.name;
    $('[data-hero-second]').textContent = business.hero.title[1] || '';
    $('[data-hero-description]').textContent = business.hero.description;
    $('#hero-image').src = business.hero.image;
    $('#hero-image').alt = business.hero.alt;
    $('#hero-image').style.objectPosition = business.hero.position || '50% 50%';
    $('#about-image').src = business.about.image;
    $('#about-image').alt = business.about.alt;
    $('[data-about-title]').textContent = business.about.title;
    business.about.paragraphs.forEach(text => $('#about-story').append(element('p', '', text)));
    (config.benefits || []).forEach(benefit => {
      const item = element('div', 'benefit');
      item.append(element('h3', '', benefit.title), element('p', '', benefit.description));
      $('#benefits').append(item);
    });
    const featured = productById.get(business.hero.featuredProductId) || products[0];
    if (featured) {
      $('#featured-name').textContent = featured.name;
      $('#featured-description').textContent = featured.description;
      $('#featured-price').textContent = money(featured.price);
      $('#featured-add').dataset.add = featured.id;
      $('#featured-add').setAttribute('aria-label', `Tambah ${featured.name} ke pesanan`);
    } else {
      $('#featured-add').disabled = true;
    }
    $('#business-address').textContent = business.address || `${business.city}, ${business.region}`;
    $('#address-unavailable').hidden = Boolean(business.address);
    $('#business-hours').textContent = business.hours || 'Jam buka belum tersedia';
    $('#hours-label').textContent = business.demoMode && business.hours ? 'Jam buka (contoh)' : 'Jam buka';
    $('#business-phone').textContent = normalizePhone(business.whatsapp) ? (business.whatsappDisplay || '+' + normalizePhone(business.whatsapp)) : 'Nomor belum tersedia';
    $('#maps-link').href = business.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address || `${business.city}, ${business.region}`)}`;
    $('#maps-link').firstChild.textContent = business.mapsUrl || business.address ? 'Buka Google Maps ' : `Lihat area ${business.city} `;
    const instagram = String(business.instagram || '').trim().replace(/^@/, '');
    const hasInstagram = /^[a-zA-Z0-9_](?:[a-zA-Z0-9._]{0,28}[a-zA-Z0-9_])?$/.test(instagram) && !instagram.includes('..');
    $('#instagram-unavailable').hidden = hasInstagram;
    $('#instagram-link').hidden = !hasInstagram;
    if (hasInstagram) {
      $('#instagram-link').href = `https://www.instagram.com/${encodeURIComponent(instagram)}/`;
      $('#instagram-link').textContent = '@' + instagram;
    }
    document.title = `${business.name} — ${business.hero.title.join(' ')}`;
    $('meta[name="description"]').content = `Pilih nasi, lauk rumahan, camilan, dan minuman di ${business.name}. Susun pesanan untuk diambil sendiri atau diantar melalui WhatsApp.`;
    $('#copyright').textContent = `© ${new Date().getFullYear()} ${business.name}.`;
    const testimonials = config.testimonials;
    $('#testimoni').hidden = !testimonials?.enabled || !testimonials.items?.length;
    if (testimonials?.enabled) {
      $('#testimonials-disclosure').textContent = testimonials.isExample ? 'Contoh testimoni — bukan ulasan pelanggan asli.' : 'Pengalaman pelanggan, ditampilkan dengan izin.';
      testimonials.items.forEach(item => {
        const figure = element('figure', 'testimonial');
        const quote = element('blockquote', '', item.quote);
        const caption = element('figcaption');
        caption.append(element('cite', '', item.name), document.createTextNode(` · ${item.detail}`));
        figure.append(quote, caption);
        $('#testimonials-list').append(figure);
      });
    }
    const usedImages = new Set([business.hero.image, business.about.image, ...products.map(product => product.image)]);
    const usedCredits = (window.WARTEG_PHOTO_CREDITS || []).filter(credit => usedImages.has(credit.file));
    $('.photo-credits').hidden = usedCredits.length === 0;
    usedCredits.forEach(credit => {
      const item = element('li');
      const source = element('a', '', credit.title.replace(/^File:/, '').replace(/\.(jpe?g|png)$/i, ''));
      source.href = credit.source;
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      const license = element('a', '', credit.license);
      license.href = credit.licenseUrl;
      license.target = '_blank';
      license.rel = 'noopener noreferrer';
      item.append(source, document.createTextNode(` — ${credit.artist}, `), license, document.createTextNode('. Ukuran disesuaikan; tampilan dapat dipotong.'));
      $('#photo-credit-list').append(item);
    });
    $$('img').forEach(imageFallback);
  }

  function decodeCart(raw) {
    const next = new Map();
    try {
      const stored = JSON.parse(raw || '{}');
      if (stored.version !== 1 || !stored.items || typeof stored.items !== 'object') return next;
      for (const [id, quantity] of Object.entries(stored.items)) {
        if (productById.has(id) && productById.get(id).available !== false && Number.isInteger(quantity) && quantity > 0) next.set(id, Math.min(quantity, maximumQuantity));
      }
    } catch { /* Ignore obsolete or corrupt browser-local cart data. */ }
    return next;
  }

  function loadCart() {
    try { cart = decodeCart(localStorage.getItem(storageKey)); }
    catch { storageAvailable = false; }
  }

  function persistCart() {
    try { localStorage.setItem(storageKey, JSON.stringify({ version: 1, items: Object.fromEntries(cart) })); }
    catch { storageAvailable = false; }
    $('#storage-note').hidden = storageAvailable;
  }

  function totals() {
    let count = 0;
    let subtotal = 0;
    for (const [id, quantity] of cart) {
      count += quantity;
      subtotal += productById.get(id).price * quantity;
    }
    return { count, subtotal };
  }

  function renderMenu() {
    const needle = query.trim().toLocaleLowerCase('id-ID');
    const filtered = products.filter(product => (category === 'Semua' || product.category === category) && `${product.name} ${product.description} ${product.category}`.toLocaleLowerCase('id-ID').includes(needle));
    $('#menu-list').replaceChildren();
    filtered.forEach(product => {
      const card = element('article', 'menu-card');
      const frame = element('div', 'menu-image');
      const image = element('img');
      image.src = product.image;
      image.alt = product.alt || `Ilustrasi ${product.name}`;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.width = 800;
      image.height = 600;
      image.style.objectPosition = product.position || '50% 50%';
      imageFallback(image);
      frame.append(image);
      const bottom = element('div', 'menu-card-bottom');
      const price = element('div', 'menu-price');
      price.append(element('strong', '', money(product.price)), element('span', '', 'per ' + (product.unit || 'porsi')));
      const add = element('button', 'add-button');
      add.type = 'button';
      add.dataset.add = product.id;
      add.setAttribute('aria-label', `Tambah ${product.name} ke pesanan`);
      add.append(icon('plus'), element('span', '', product.available === false ? 'Habis' : 'Tambah'));
      add.disabled = product.available === false;
      const quantity = element('p', 'menu-quantity');
      quantity.dataset.quantityFor = product.id;
      bottom.append(price, add);
      card.append(frame, element('h3', '', product.name), element('p', 'menu-description', product.description), bottom, quantity);
      $('#menu-list').append(card);
    });
    $('#menu-empty').hidden = filtered.length > 0;
    $('#menu-empty-description').textContent = query.trim() ? `Tidak ada hasil untuk “${query.trim()}”. Coba kata lain atau lihat semua menu.` : 'Belum ada menu dalam kategori ini. Coba kategori lain.';
    $('#menu-results').textContent = `${filtered.length} menu ditampilkan${category !== 'Semua' ? ` dalam kategori ${category}` : ''}.`;
    $$('[data-category]').forEach(button => {
      const active = button.dataset.category === category;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    updateMenuQuantities();
  }

  function updateMenuQuantities() {
    $$('[data-quantity-for]').forEach(node => {
      const quantity = cart.get(node.dataset.quantityFor) || 0;
      const product = productById.get(node.dataset.quantityFor);
      node.textContent = product.available === false ? 'Belum tersedia' : quantity ? `${quantity} ${product.unit || 'porsi'} dalam pesanan` : '';
    });
    $$('[data-add]').forEach(button => {
      button.disabled = productById.get(button.dataset.add)?.available === false || (cart.get(button.dataset.add) || 0) >= maximumQuantity;
    });
  }

  function renderCart() {
    const focused = document.activeElement;
    const focusedItem = focused.closest?.('[data-cart-id]');
    const focusState = focusedItem ? { id: focusedItem.dataset.cartId, action: focused.dataset.cartAction, input: focused.matches('input') } : null;
    const { count, subtotal } = totals();
    $('#cart-list').replaceChildren();
    for (const [id, quantity] of cart) {
      const product = productById.get(id);
      const item = element('li', 'cart-item');
      item.dataset.cartId = id;
      const image = element('img');
      image.src = product.image;
      image.alt = '';
      image.width = 72;
      image.height = 72;
      image.style.objectPosition = product.position || '50% 50%';
      const content = element('div');
      content.append(element('h4', '', product.name), element('p', 'cart-unit-price', `${money(product.price)} / ${product.unit || 'porsi'}`));
      const quantityControl = element('div', 'quantity-control');
      const minus = element('button');
      minus.type = 'button';
      minus.dataset.cartAction = 'decrease';
      minus.setAttribute('aria-label', `Kurangi jumlah ${product.name}`);
      minus.append(icon('minus'));
      const input = element('input');
      input.type = 'number';
      input.min = '1';
      input.max = String(maximumQuantity);
      input.step = '1';
      input.value = quantity;
      input.inputMode = 'numeric';
      input.setAttribute('aria-label', `Jumlah ${product.name}`);
      input.dataset.cartAction = 'quantity';
      const plus = element('button');
      plus.type = 'button';
      plus.dataset.cartAction = 'increase';
      plus.disabled = quantity >= maximumQuantity;
      plus.setAttribute('aria-label', `Tambah jumlah ${product.name}`);
      plus.append(icon('plus'));
      quantityControl.append(minus, input, plus);
      content.append(quantityControl);
      const right = element('div', 'cart-item-right');
      const remove = element('button', 'text-button remove-item', 'Hapus');
      remove.type = 'button';
      remove.dataset.cartAction = 'remove';
      remove.setAttribute('aria-label', `Hapus ${product.name} dari pesanan`);
      right.append(element('span', 'cart-line-price', money(product.price * quantity)), remove);
      item.append(image, content, right);
      $('#cart-list').append(item);
    }
    $('#cart-empty').hidden = count > 0;
    $('#clear-cart').hidden = count === 0;
    $('#cart-item-label').textContent = `${count} item`;
    $('#cart-subtotal').textContent = money(subtotal);
    $$('[data-cart-count]').forEach(node => { node.textContent = count; });
    $$('[data-order-link]').forEach(link => { link.setAttribute('aria-label', `Lihat pesanan, ${count} item, subtotal ${money(subtotal)}`); });
    $('#mobile-cart-price').textContent = money(subtotal);
    $('#mobile-cart-count').textContent = `${count} item dipilih`;
    updateMobileCart();
    updateMenuQuantities();
    $('#storage-note').hidden = storageAvailable;
    if (focusState) {
      const row = [...$('#cart-list').children].find(item => item.dataset.cartId === focusState.id);
      const nextFocus = row?.querySelector(`[data-cart-action="${focusState.input ? 'quantity' : focusState.action}"]`) || $('#cart-list [data-cart-action="increase"]') || $('#cart-empty a');
      nextFocus?.focus({ preventScroll: true });
    }
  }

  function updateMobileCart() {
    const visible = totals().count > 0 && !orderSectionVisible;
    $('#mobile-cart').hidden = !visible;
    document.body.classList.toggle('has-mobile-cart', visible && matchMedia('(max-width: 600px)').matches);
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    $('#toast-message').textContent = message;
    $('#cart-toast').hidden = false;
    toastTimer = setTimeout(() => { $('#cart-toast').hidden = true; }, 5200);
  }

  function invalidatePreview() {
    $('#order-preview').hidden = true;
    $('#order-message').value = '';
    $('#copy-order').textContent = 'Salin pesanan';
  }

  function changeQuantity(id, value, notify = false) {
    const product = productById.get(id);
    if (!product || product.available === false) return;
    const quantity = Math.min(maximumQuantity, Math.max(0, Math.trunc(value)));
    if (quantity) cart.set(id, quantity); else cart.delete(id);
    persistCart();
    invalidatePreview();
    $('#checkout-error').hidden = true;
    renderCart();
    if (notify) showToast(`${product.name} ditambahkan. ${quantity} ${product.unit || 'porsi'} dalam pesanan.`);
  }

  function goTo(sectionId) {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    const heading = section?.querySelector('h2');
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
  }

  function setNavigation(open) {
    $('#main-nav').classList.toggle('is-open', open);
    $('.nav-toggle').setAttribute('aria-expanded', String(open));
    $('.nav-toggle').setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
  }

  function fulfillmentChanged() {
    const delivery = $('[name="fulfillment"]:checked').value === 'delivery';
    $('#address-field').hidden = !delivery;
    $('#delivery-address').disabled = !delivery;
    $('#delivery-address').required = delivery;
    $('#shipping-note').textContent = delivery ? 'Ongkir belum termasuk. Biaya dan jangkauan antar dikonfirmasi lewat WhatsApp.' : 'Ambil sendiri, tanpa ongkir.';
    $('#address-error').hidden = true;
    $('#delivery-address').removeAttribute('aria-invalid');
    invalidatePreview();
  }

  function buildOrderMessage() {
    const name = $('#customer-name').value.trim();
    const delivery = $('[name="fulfillment"]:checked').value === 'delivery';
    const lines = [`Halo ${business.name}, saya ingin pesan:`, '', `Nama: ${name}`, `Cara menerima: ${delivery ? 'Diantar' : 'Ambil sendiri'}`];
    if (delivery) lines.push(`Alamat: ${$('#delivery-address').value.trim()}`);
    lines.push('', 'Pesanan:');
    for (const [id, quantity] of cart) {
      const product = productById.get(id);
      lines.push(`- ${product.name} x${quantity} ${product.unit || 'porsi'} @ ${money(product.price)} = ${money(product.price * quantity)}`);
    }
    lines.push('', `Subtotal menu: ${money(totals().subtotal)}`);
    if (delivery) lines.push('Ongkir: mohon dikonfirmasi (belum termasuk subtotal).');
    const notes = $('#order-notes').value.trim();
    if (notes) lines.push(`Catatan: ${notes}`);
    lines.push('', 'Mohon konfirmasi ketersediaan dan waktu pesanan. Terima kasih.');
    if (business.demoMode) lines.push('', '(Menu dan harga pada website ini merupakan contoh.)');
    return lines.join('\n');
  }

  function validateCheckout() {
    const name = $('#customer-name');
    const address = $('#delivery-address');
    const missingName = !name.value.trim();
    const missingAddress = !address.disabled && !address.value.trim();
    $('#name-error').textContent = 'Isi nama pemesan agar pesanan mudah dikenali.';
    $('#name-error').hidden = !missingName;
    name.setAttribute('aria-invalid', String(missingName));
    $('#address-error').textContent = 'Isi alamat pengantaran, termasuk nomor rumah atau patokan.';
    $('#address-error').hidden = !missingAddress;
    address.setAttribute('aria-invalid', String(missingAddress));
    if (!cart.size) {
      $('#checkout-error').textContent = 'Pesananmu masih kosong. Pilih setidaknya satu menu terlebih dahulu.';
      $('#checkout-error').hidden = false;
      goTo('menu');
      return false;
    }
    if (missingName || missingAddress) { (missingName ? name : address).focus(); return false; }
    $('#checkout-error').hidden = true;
    return true;
  }

  applyBusiness();
  loadCart();
  renderMenu();
  renderCart();
  fulfillmentChanged();

  document.addEventListener('click', event => {
    const add = event.target.closest('[data-add]');
    if (add && !add.disabled) changeQuantity(add.dataset.add, (cart.get(add.dataset.add) || 0) + 1, true);
    const orderLink = event.target.closest('[data-order-link]');
    if (orderLink) { event.preventDefault(); $('#cart-toast').hidden = true; goTo('pesanan'); }
  });
  $$('[data-category]').forEach(button => button.addEventListener('click', () => { category = button.dataset.category; renderMenu(); }));
  $('#menu-query').addEventListener('input', event => { query = event.target.value; renderMenu(); });
  $('#reset-menu').addEventListener('click', () => { query = ''; category = 'Semua'; $('#menu-query').value = ''; renderMenu(); $('#menu-query').focus(); });
  $('#cart-list').addEventListener('click', event => {
    const button = event.target.closest('button[data-cart-action]');
    if (!button || button.disabled) return;
    const id = button.closest('[data-cart-id]').dataset.cartId;
    const current = cart.get(id) || 0;
    const action = button.dataset.cartAction;
    changeQuantity(id, action === 'remove' ? 0 : current + (action === 'increase' ? 1 : -1));
  });
  $('#cart-list').addEventListener('change', event => {
    if (!event.target.matches('input[data-cart-action="quantity"]')) return;
    const id = event.target.closest('[data-cart-id]').dataset.cartId;
    const value = Number(event.target.value);
    changeQuantity(id, Number.isFinite(value) ? Math.min(maximumQuantity, Math.max(1, Math.trunc(value))) : 1);
  });
  $('#clear-cart').addEventListener('click', () => { cart.clear(); persistCart(); invalidatePreview(); renderCart(); $('#cart-empty a').focus({ preventScroll: true }); });
  $('#close-toast').addEventListener('click', () => { $('#cart-toast').hidden = true; });
  $('.nav-toggle').addEventListener('click', () => setNavigation($('.nav-toggle').getAttribute('aria-expanded') !== 'true'));
  $$('#main-nav a').forEach(link => link.addEventListener('click', () => setNavigation(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && $('.nav-toggle').getAttribute('aria-expanded') === 'true') { setNavigation(false); $('.nav-toggle').focus(); }
  });
  document.addEventListener('click', event => { if (!$('.site-header').contains(event.target)) setNavigation(false); });
  matchMedia('(max-width: 860px)').addEventListener('change', () => setNavigation(false));
  matchMedia('(max-width: 600px)').addEventListener('change', updateMobileCart);
  $$('[name="fulfillment"]').forEach(radio => radio.addEventListener('change', fulfillmentChanged));
  $('#checkout-form').addEventListener('input', event => {
    invalidatePreview();
    if (event.target === $('#customer-name')) { $('#name-error').hidden = true; event.target.removeAttribute('aria-invalid'); }
    if (event.target === $('#delivery-address')) { $('#address-error').hidden = true; event.target.removeAttribute('aria-invalid'); }
  });
  $('#checkout-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!validateCheckout()) return;
    const message = buildOrderMessage();
    if (openWhatsApp(message)) {
      showToast('WhatsApp dibuka. Periksa rincian sebelum mengirim pesanan.');
    } else {
      $('#order-message').value = message;
      $('#order-preview').hidden = false;
      $('#order-message').focus({ preventScroll: true });
      $('#order-preview').scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  });
  $('#copy-order').addEventListener('click', async () => {
    const message = $('#order-message').value;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(message);
      $('#copy-order').textContent = 'Pesanan tersalin';
    } catch {
      const field = $('#order-message');
      field.focus();
      field.select();
      const copied = document.execCommand('copy');
      $('#copy-order').textContent = copied ? 'Pesanan tersalin' : 'Pilih teks, lalu salin manual';
    }
  });
  $$('[data-whatsapp-chat]').forEach(button => button.addEventListener('click', () => {
    if (!openWhatsApp(`Halo ${business.name}, saya ingin bertanya tentang menu dan pemesanan.`)) {
      $('#contact-notice').textContent = 'Nomor WhatsApp warteg belum tersedia. Kamu tetap bisa menyusun dan menyalin rincian pesanan di bagian Pesananmu.';
      $('#contact-notice').hidden = false;
      goTo('kontak');
    }
  }));
  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return;
    cart = decodeCart(event.newValue);
    invalidatePreview();
    renderCart();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.target.id === 'pesanan') orderSectionVisible = entry.isIntersecting; });
      updateMobileCart();
    }, { threshold: 0 }).observe($('#pesanan'));
    const navigationObserver = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => {
        $$('#main-nav a').forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'page');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    ['beranda', 'menu', 'tentang', 'kontak'].forEach(id => navigationObserver.observe(document.getElementById(id)));
  }
})();
