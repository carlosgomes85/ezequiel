(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.site-header');
    var nav = header && header.querySelector('nav');
    if (!header || !nav) return;
    header.classList.add('menu-enhanced');
    var current = location.pathname.toLowerCase();
    var currentPage = current.split('/').pop();
    var isHome = current.endsWith('index.html') || current.endsWith('/');
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var universe = '<div class="nav-dropdown"><a class="nav-universe" href="universo.html">Universo <i class="bi bi-chevron-down" aria-hidden="true"></i></a><div class="nav-submenu"><a href="universo.html">Visão geral</a><a href="personagens.html">Personagens</a><a href="lugares.html">Lugares</a></div></div>';
    nav.innerHTML = isHome ? '<a href="#livro">O livro</a><a href="#book-trailer">Trailer</a>' + universe + '<a href="#citacoes">Citações</a><a href="#avaliacoes">Avaliações</a><a href="#autor">Autor</a>' : '<a href="index.html">Início</a>' + universe;
    if (/universo|personagens|lugares/.test(current)) nav.querySelector('.nav-dropdown').classList.add('current');
    nav.querySelectorAll('a').forEach(function (link) { if (currentPage && currentPage !== 'index.html' && link.href.toLowerCase().endsWith(currentPage)) link.setAttribute('aria-current', 'page'); });
    var toggle = document.createElement('button');
    toggle.className = 'menu-toggle'; toggle.type = 'button'; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-controls', 'mobile-menu'); toggle.setAttribute('aria-label', 'Abrir menu de navegação');
    toggle.innerHTML = '<span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><b>Menu</b>';
    var menu = document.createElement('div'); menu.className = 'mobile-menu'; menu.id = 'mobile-menu'; menu.hidden = true;
    function addLink(href, label) { var link = document.createElement('a'); link.href = href; link.textContent = label; menu.appendChild(link); }
    if (isHome) { addLink('#livro', 'O livro'); addLink('#book-trailer', 'Trailer'); } else { addLink('index.html', 'Início'); }
    var mobileUniverse = document.createElement('details'); mobileUniverse.className = 'mobile-universe'; mobileUniverse.open = /universo|personagens|lugares/.test(current);
    var summary = document.createElement('summary'); summary.innerHTML = 'Universo <i class="bi bi-chevron-down" aria-hidden="true"></i>'; mobileUniverse.appendChild(summary);
    [['universo.html', 'Visão geral'], ['personagens.html', 'Personagens'], ['lugares.html', 'Lugares']].forEach(function (item) { var link = document.createElement('a'); link.href = item[0]; link.textContent = item[1]; if (current.endsWith(item[0])) { link.className = 'active'; link.setAttribute('aria-current', 'page'); } mobileUniverse.appendChild(link); });
    menu.appendChild(mobileUniverse);
    if (isHome) { addLink('#citacoes', 'Citações'); addLink('#avaliacoes', 'Avaliações'); addLink('#autor', 'Autor'); }
    var buy = header.querySelector('.header-buy'); if (buy) { var mobileBuy = buy.cloneNode(true); mobileBuy.className = 'mobile-buy'; menu.appendChild(mobileBuy); }
    header.append(toggle, menu);
    function closeMenu() { if (toggle.getAttribute('aria-expanded') !== 'true') return; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu de navegação'); menu.hidden = true; header.classList.remove('menu-open'); }
    toggle.addEventListener('click', function () { var open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); toggle.setAttribute('aria-label', open ? 'Abrir menu de navegação' : 'Fechar menu de navegação'); menu.hidden = open; header.classList.toggle('menu-open', !open); });
    menu.addEventListener('click', function (event) { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') { closeMenu(); toggle.focus(); } });
    document.addEventListener('click', function (event) { if (!header.contains(event.target)) closeMenu(); });
    document.querySelectorAll('.universe-explore-grid a').forEach(function (card) { card.setAttribute('aria-label', card.querySelector('strong') ? 'Explorar ' + card.querySelector('strong').textContent.trim() : 'Explorar o universo'); });
    document.querySelectorAll('.image-placeholder').forEach(function (image) { image.setAttribute('role', 'img'); var label = image.querySelector('span'); if (label) image.setAttribute('aria-label', label.textContent.trim()); });
    var lastScroll = -1;
    function updateScrollState() { var top = window.scrollY || document.documentElement.scrollTop; var height = document.documentElement.scrollHeight - window.innerHeight; header.classList.toggle('is-scrolled', top > 18); if (top !== lastScroll) { document.documentElement.style.setProperty('--scroll-progress', height > 0 ? Math.min(top / height, 1) : 0); lastScroll = top; } }
    updateScrollState(); window.addEventListener('scroll', updateScrollState, { passive: true });
    var floatingBuy = document.querySelector('.mobile-floating-buy');
    var opening = document.querySelector('.hero, .subpage-hero, .sample-hero');
    if (floatingBuy && opening && 'IntersectionObserver' in window) {
      var buyObserver = new IntersectionObserver(function (entries) { floatingBuy.classList.toggle('is-visible', !entries[0].isIntersecting); }, { threshold: 0 });
      buyObserver.observe(opening);
    }
    if (!reducedMotion && 'IntersectionObserver' in window) {
      var targets = document.querySelectorAll('main section, main article, .quote-stack blockquote, .review-grid blockquote');
      targets.forEach(function (element, index) { if (element.closest('.hero')) return; element.classList.add('reveal'); element.style.setProperty('--reveal-delay', Math.min((index % 4) * 55, 165) + 'ms'); });
      var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); } }); }, { threshold: .12, rootMargin: '0px 0px -7% 0px' });
      targets.forEach(function (element) { observer.observe(element); });
    }
  });
}());
