/* Curso VB-MAPP na prática | Lapidar Clínica Multidisciplinar */
(function () {
  "use strict";

  var botoes = document.querySelectorAll("[data-cta]");

  /* ============ 1. UTM DO ANÚNCIO ATÉ O CHECKOUT ============
     Se a pessoa chegou por um link com ?utm_source=... (anúncio, Instagram),
     esses parâmetros seguem para o checkout da Kiwify. */
  var params = new URLSearchParams(location.search);
  if (params.toString()) {
    botoes.forEach(function (b) {
      try {
        var url = new URL(b.href);
        params.forEach(function (valor, chave) {
          if (!url.searchParams.has(chave)) url.searchParams.set(chave, valor);
        });
        b.href = url.toString();
      } catch (e) { /* mantém o link original */ }
    });
  }

  /* ============ 2. EVENTO DE CLIQUE NO BOTÃO (PIXEL E ANALYTICS) ============
     Depois de colar o pixel no index.html, descomente a linha da ferramenta que você usa. */
  botoes.forEach(function (b) {
    b.addEventListener("click", function () {
      // if (window.fbq) fbq("track", "InitiateCheckout");
      // if (window.gtag) gtag("event", "begin_checkout");
    });
  });

  /* ============ 3. BARRA FIXA NO CELULAR ============
     Aparece quando nenhum outro botão está na tela. */
  var barra = document.getElementById("barra");
  if (barra && "IntersectionObserver" in window) {
    var naTela = new Set();
    var observador = new IntersectionObserver(function (itens) {
      itens.forEach(function (i) {
        if (i.isIntersecting) { naTela.add(i.target); } else { naTela.delete(i.target); }
      });
      barra.classList.toggle("is-visivel", naTela.size === 0);
    });
    document.querySelectorAll("[data-esconde-barra]").forEach(function (el) { observador.observe(el); });
  }

  /* Ano do rodapé sempre atualizado */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
