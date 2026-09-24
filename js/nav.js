(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.site-header');
    var nav = header && header.querySelector('nav');
    if (!header || !nav) return;
    if (!document.querySelector('link[href$="nav-mobile.css"]')) {
      var navStyles = document.createElement('link');
      navStyles.rel = 'stylesheet';
      navStyles.href = 'css/nav-mobile.css';
      document.head.appendChild(navStyles);
    }
    header.classList.add('menu-enhanced');
    var current = location.pathname.toLowerCase();
    var currentPage = current.split('/').pop();
    var isHome = current.endsWith('index.html') || current.endsWith('/');
    var universe = '<div class="nav-dropdown"><a class="nav-universe" href="universo.html">Universo <i class="bi bi-chevron-down" aria-hidden="true"></i></a><div class="nav-submenu"><a href="universo.html">Visão geral</a><a href="personagens.html">Personagens</a><a href="lugares.html">Lugares</a></div></div>';
    nav.innerHTML = isHome ? '<a href="#livro">O livro</a><a href="#book-trailer">Trailer</a>' + universe + '<a href="#citacoes">Citações</a><a href="#avaliacoes">Avaliações</a><a href="#autor">Autor</a>' : '<a href="index.html">Início</a>' + universe;
    if (/universo|personagens|lugares/.test(current)) nav.querySelector('.nav-dropdown').classList.add('current');
    nav.querySelectorAll('a').forEach(function (link) {
      if (currentPage && currentPage !== 'index.html' && link.href.toLowerCase().endsWith(currentPage)) link.setAttribute('aria-current', 'page');
    });
    var toggle = document.createElement('button');
    toggle.className = 'menu-toggle'; toggle.type = 'button'; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-controls', 'mobile-menu'); toggle.setAttribute('aria-label', 'Abrir menu de navegação'); toggle.innerHTML = '<span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><b>Menu</b>';
    var menu = document.createElement('div'); menu.className = 'mobile-menu'; menu.id = 'mobile-menu'; menu.hidden = true;
    function addLink(href, label) { var link = document.createElement('a'); link.href = href; link.textContent = label; menu.appendChild(link); }
    if (isHome) { addLink('#livro', 'O livro'); addLink('#book-trailer', 'Trailer'); } else addLink('index.html', 'Início');
    var mobileUniverse = document.createElement('details'); mobileUniverse.className = 'mobile-universe'; mobileUniverse.open = /universo|personagens|lugares/.test(current);
    var summary = document.createElement('summary'); summary.innerHTML = 'Universo <i class="bi bi-chevron-down" aria-hidden="true"></i>'; mobileUniverse.appendChild(summary);
    [['universo.html', 'Visão geral'], ['personagens.html', 'Personagens'], ['lugares.html', 'Lugares']].forEach(function (item) { var link = document.createElement('a'); link.href = item[0]; link.textContent = item[1]; if (current.endsWith(item[0])) { link.className = 'active'; link.setAttribute('aria-current', 'page'); } mobileUniverse.appendChild(link); });
    menu.appendChild(mobileUniverse);
    if (isHome) { addLink('#citacoes', 'Citações'); addLink('#avaliacoes', 'Avaliações'); addLink('#autor', 'Autor'); }
    var buy = header.querySelector('.header-buy'); if (buy) { var mobileBuy = buy.cloneNode(true); mobileBuy.className = 'mobile-buy'; menu.appendChild(mobileBuy); }
    header.append(toggle, menu);
    document.querySelectorAll('.universe-explore-grid a').forEach(function (card) { card.setAttribute('aria-label', card.querySelector('strong') ? 'Explorar ' + card.querySelector('strong').textContent.trim() : 'Explorar o universo'); });
    document.querySelectorAll('.image-placeholder').forEach(function (image) { image.setAttribute('role', 'img'); var label = image.querySelector('span'); if (label) image.setAttribute('aria-label', label.textContent.trim()); });
    toggle.addEventListener('click', function () { var open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); toggle.setAttribute('aria-label', open ? 'Abrir menu de navegação' : 'Fechar menu de navegação'); menu.hidden = open; header.classList.toggle('menu-open', !open); });
    menu.addEventListener('click', function (event) { if (event.target.closest('a')) { toggle.setAttribute('aria-expanded', 'false'); menu.hidden = true; header.classList.remove('menu-open'); } });
  });
}());
