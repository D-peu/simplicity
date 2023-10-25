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

// Seleção do campo telefone usando JS PURO
// const campoTelefone = formulario.querySelector("#telefone");

// Seleção do campo telefone usando jQuery
const campoTelefone = $("#telefone");

// Ativando a máscara para o telefone 
$(campoTelefone).mask("(00) 0000-0000"); // Exemplo: (11) 2135-0300

$(campoCep).mask("00000-000"); // Exemplo: 03639-000

// Detectando o evento de CLICK no botão buscar
botaoBuscar.addEventListener("click", async function(event){
    event.preventDefault();

    let cep; // Undefined

    /* Verifique se o cep NÂO tem 8 dígitos.
    O operador !== significa "diferente de". */
    if(campoCep.value.length !==9){
        // Alerte o usuário sobre o erro de digitação
        mensagem.textContent = "Digite um CEP válido!";
        mensagem.style.color = "purple";

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
        mensagem.textContent = "CEP encontrado!";
        mensagem.style.color = "green";
    }

    campoEndereco.value = dados.logradouro;
    campoBairro.value = dados.bairro;
    campoCidade.value = dados.localidade;
    campoEstado.value = dados.uf;
    
});










/* Programação dp Formspree */

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: formulario.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Obrigado por sua contribuição!";
      formulario.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Deu ruim! Infelizmente deu alguma problema, tente novamente mais tarde"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Deu ruim! Infelizmente deu alguma problema, tente novamente mais tarde"
  });
}
formulario.addEventListener("submit", handleSubmit)