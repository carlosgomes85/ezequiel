(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.site-header');
    var nav = header && header.querySelector('nav');
    if (!header || !nav) return;
    if (!document.querySelector('link[href$="nav-mobile.css"]')) { var navStyles = document.createElement('link'); navStyles.rel = 'stylesheet'; navStyles.href = 'css/nav-mobile.css'; document.head.appendChild(navStyles); }
    header.classList.add('menu-enhanced');
    var current = location.pathname.toLowerCase();
    var currentPage = current.split('/').pop();
    var isHome = current.endsWith('index.html') || current.endsWith('/');
    var universeLinks = '<a href="universo.html">Visão geral</a><a href="personagens.html">Personagens</a><a href="lugares.html">Lugares</a>';
    var universe = '<div class="nav-dropdown"><a class="nav-universe" href="universo.html">Universo <i class="bi bi-chevron-down" aria-hidden="true"></i></a><div class="nav-submenu">' + universeLinks + '</div></div>';
    nav.innerHTML = isHome ? '<a href="#livro">O livro</a>' + universe + '<a href="#citacoes">Citações</a><a href="#avaliacoes">Avaliações</a><a href="#autor">Autor</a>' : '<a href="index.html">Início</a>' + universe;
    if (/universo|personagens|lugares/.test(current)) nav.querySelector('.nav-dropdown').classList.add('current');
    nav.querySelectorAll('a').forEach(function (link) { if (currentPage && currentPage !== 'index.html' && link.href.toLowerCase().endsWith(currentPage)) link.setAttribute('aria-current', 'page'); });
    var toggle = document.createElement('button');
    toggle.className = 'menu-toggle'; toggle.type = 'button'; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-controls', 'mobile-menu'); toggle.innerHTML = '<span></span><span></span><span></span><b>Menu</b>';
    var menu = document.createElement('div'); menu.className = 'mobile-menu'; menu.id = 'mobile-menu'; menu.hidden = true;
    function addLink(href, label) { var link = document.createElement('a'); link.href = href; link.textContent = label; menu.appendChild(link); }
    if (isHome) addLink('#livro', 'O livro'); else addLink('index.html', 'Início');
    var mobileUniverse = document.createElement('details'); mobileUniverse.className = 'mobile-universe'; mobileUniverse.open = /universo|personagens|lugares/.test(current);
    var summary = document.createElement('summary'); summary.innerHTML = 'Universo <i class="bi bi-chevron-down" aria-hidden="true"></i>'; mobileUniverse.appendChild(summary);
    [['universo.html', 'Visão geral'], ['personagens.html', 'Personagens'], ['lugares.html', 'Lugares']].forEach(function (item) { var link = document.createElement('a'); link.href = item[0]; link.textContent = item[1]; if (current.endsWith(item[0])) { link.className = 'active'; link.setAttribute('aria-current', 'page'); } mobileUniverse.appendChild(link); });
    menu.appendChild(mobileUniverse);
    if (isHome) { addLink('#citacoes', 'Citações'); addLink('#avaliacoes', 'Avaliações'); addLink('#autor', 'Autor'); }
    var buy = header.querySelector('.header-buy'); if (buy) { var mobileBuy = buy.cloneNode(true); mobileBuy.className = 'mobile-buy'; menu.appendChild(mobileBuy); }
    header.append(toggle, menu);
    document.querySelectorAll('.universe-explore-grid a').forEach(function (card) { card.setAttribute('aria-label', card.querySelector('strong') ? 'Explorar ' + card.querySelector('strong').textContent.trim() : 'Explorar o universo'); });
    document.querySelectorAll('.image-placeholder').forEach(function (image) { image.setAttribute('role', 'img'); var label = image.querySelector('span'); if (label) image.setAttribute('aria-label', label.textContent.trim()); });
    var villainCard = document.querySelector('.villain-card');
    if (villainCard && !document.querySelector('.nabur-quote')) {
      var quote = document.createElement('blockquote');
      quote.className = 'nabur-quote';
      quote.innerHTML = '<p>“Babiorne é um oásis nesse mundo caído. Um paraíso.<br>Aqui dentro há ordem. É por isso que essas pessoas ainda estão vivas.<br>Eu sei muito bem o preço que paguei por esse equilíbrio e não vou deixar qualquer doutorzinho aventureiro, com essas ideias utópicas, inflamar a cabeça do meu povo e trazer o caos pra cá também.”</p><cite>Coronel Nabur</cite>';
      villainCard.parentNode.insertBefore(quote, villainCard.nextSibling);
    }
    var romanceCopy = document.querySelector('.romance-copy');
    if (romanceCopy && !romanceCopy.querySelector('.romance-quote')) {
      var romanceQuote = document.createElement('blockquote');
      romanceQuote.className = 'romance-quote';
      romanceQuote.innerHTML = '<p>“O sol estava torando no céu, e as vizinhas fofoqueiras de plantão já estavam penduradas nas varandas.<br>Foi ali que aconteceu.<br>No meio da rua mesmo.<br>Noemi ainda segurava a casquinha de sorvete quando criei coragem e a puxei para perto. Ela tentou protestar, mas acabou sorrindo, porque, no fundo, também queria.<br>E então nos beijamos pela primeira vez.”</p>';
      var romanceLink = romanceCopy.querySelector('.text-link');
      romanceCopy.insertBefore(romanceQuote, romanceLink);
    }
    toggle.addEventListener('click', function () { var open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); menu.hidden = open; header.classList.toggle('menu-open', !open); });
    menu.addEventListener('click', function (event) { if (event.target.closest('a')) { toggle.setAttribute('aria-expanded', 'false'); menu.hidden = true; header.classList.remove('menu-open'); } });
  });
}());
