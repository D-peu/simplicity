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
const bmostrar = document.querySelectorAll(".mostrar");
 
// Seleção do campo telefone usando JS Puro
//const campoTelefone = formulario.querySelector("#telefone");
 
// Seleção do campo telefone usando JS Puro
const campoTelefone = $("#tel");
 
// Ativando a máscara para o telefone
$(campoTelefone).mask("(00) 0000-0000"); // Exemplo: (11) 2135-0300
 
// Ativando a máscara para o Cep
$(campoCep).mask("00000-000"); // Exemplo: 02201-002
 
 
// Detectando o evento de CLICK no botão buscar
botaoBuscar.addEventListener("click", async function(event){
    event.preventDefault();
 
    let cep; // undefined
 
    /* Verficando se o cep NÃo tem 8 dígitos
    O operador !== significa "diferente de". */
    if(campoCep.value.length !== 9){
        mensagem.textContent = "CEP Inválido!";
        mensagem.style.color = "red";
       
        // Pare a
        return;
    } else {
        // Caso contrário (ou seja, tem 8 dígitos), guarde o valor
        cep = campoCep.value;
    }
 
    // Mostra os campos apos o cep valido ser digitado
    for(const mostrar of bmostrar){
        mostrar.classList.remove("mostrar");
    }
 
    /* AJAX -> Técnica de comunicação assícrona para acessar uma API (www.viacep.com.br) */
 
    // Etapa 1: preparar a URL da API com o CEP DIGITADP
    const url = `https://viacep.com.br/ws/${cep}/json/`;
   
    // Etapa 2: acessar a API (com a URL) e aguardar o retorno dela
    const resposta = await fetch(url);
 
    // Etapa 3: extrair os dados da resposta em formato JSON
    const dados = await resposta.json();
 
    // Etapa 4: lidar com os dados de resposta (em caso de erro ou sucesso)
    if("erro" in dados){
        mensagem.textContent = "CEP inexistente!";
        mensagem.style.color = "orange";
    } else {
        mensagem.textContent = "CEP encontrado!";
        mensagem.style.color = "green";
        campoEndereco.value = dados.logradouro;
        campoBairro.value = dados.bairro;
        campoCidade.value = dados.localidade;
        campoEstado.value = dados.uf;
 
 
       
    }
 
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