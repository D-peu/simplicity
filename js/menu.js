"use strict"

// Selecionando o elemento que acionará o menu
const botaomenu = document.querySelector("nav h2");

// Selecionando a lista/menu
const menu = document.querySelector(".menu");

// Selecionando o link que está dentro do nav h2
const textobotao = botaomenu.querySelector("a");

botaomenu.addEventListener("click", function(event){

    /* Anular/Prevenir o comportamento padrão do link */
    event.preventDefault();
    menu.classList.toggle("menu-aberto");

    if (menu.classList.contains("menu-aberto")) {
        textobotao.innerHTML = "fechar &times;";
    } else {
        textobotao.innerHTML ="Menu &equiv;";
    }
});