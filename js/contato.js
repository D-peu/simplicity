"use strict";

/* Selecionando os elementos que serão manipulados */
const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagem = formulario.querySelector("#status");


// Detectando o evento de CLICK no botão buscar
botaoBuscar.addEventListener("click", async function(event){
    event.preventDefault();

    let cep; // Undefined

    /* Verifique se o cep NÂO tem 8 dígitos.
    O operador !== significa "diferente de". */
    if(campoCep.value.length !==8){
        // Alerte o usuário sobre o erro de digitação
        mensagem.textContent = "Digite um CEP válido!";
        mensagem.style.color = "purple";
        mensagem.style.fontSize = "12px";

        // Pare a execução
        return;
    } else {
        // caso contrário (ou seja, tem 9 dígitos), guarde o valor
        cep = campoCep.value;
    }

    /* AJAX -> técnica de comunicação assíncrona para acessar uma API (www.viacep.com.br) */

    // Etapa 1: preparar a URL da API com CEP digitado
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    // Etapa 2: acessar a API (com a URL) e aguardar o retorno dela
    const response = await fetch(url);

    // Etapa 3: extrair os dados da resposta em formato JSON
    const dados = await response.json();

    // Etapa 4: lidar com os dados de resposta (em caso de erro ou sucesso)
    if( "erro" in dados ){
        mensagem.textContent = "CEP inválido";
        mensagem.style.color = "red";
    }else {
        mensagem.hidden 
        console.log(dados);
    }
    
});