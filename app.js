function criaElementoResultadoSucesso(value) {
    const result = document.querySelector("#result");
    result.innerHTML = "";
    if (!!value.cep) {
        for (const property in value) {
            result.insertAdjacentHTML(
                "beforeend",
                `<li>${property}: ${value[property]}</li>`
            );
        }
    } else {
        criaElementoResultadoErro("Cep não encontrado!!!");
    }
}

function criaElementoResultadoErro(value) {
    const result = document.querySelector("#result");
    result.innerHTML = "";
    result = insertAdjacentHTML(
        "beforeend",
        `<center><h2 style="color:#f00">${value}</h2></center>`
    )
} 

function pesquisaCEP(cep) {
    const url =`https://viacep.com.br/ws/${cep}/json/`;
    fetch(url)
    .then((Response) => Response.json())
    .then((result) => {
        criaElementoResultadoSucesso(result);
    })
    .catch((err) => {
        criaElementoResultadoErro("CEP invalido!!");
    })
}

const form = document.querySelector("form");
const inputCEP = document.querySelector("#cep");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const cep = inputCEP.value.replace(/\D/g, "");
    if (/^[0-9]{8}$/.test(cep)) {
        pesquisaCEP(cep);
    } else {
        criaElementoResultadoErro("CEP invalido!!")
    }
});

//Format
document.addEventListener("keydown", (e)=>{
    const key = e.keyCode

    if(key >= 96 && key <= 105){
        const cep = document.getElementById('cep').value
        if(cep.length == 5){
            document.getElementById('cep').value += '-'
        }
        
    }
})