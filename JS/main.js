/* Declarando variaveis*/
const modal1 = document.getElementById("card-modal");
const modal3 = document.getElementById("card-modal3")
const itens = document.getElementById("card-itens");
const Total = document.getElementById("card-total");
var fecha = document.getElementById("fech");
const finalizar = document.getElementById("finaliz");
const rua = document.getElementById("adress");
const numero = document.getElementById("adress1");
const bairro = document.getElementById("adress2");
const erro = document.getElementById("erro-en");
const card =  document.getElementById("card-menu");
const menu = document.getElementById("lista");
const nomePedidor = document.getElementById("item-name");
const quant = document.getElementById("item-quant");
const val = document.getElementById("item-valor");
const quantCarr = document.getElementById("quantCarrinho");
const titleEntr = document.getElementById("title-entrega");
const nome = document.getElementById("nome1");

let cart = [];

/*acionar o modal sim ou não*/
 

  menu.addEventListener("click", function(event){
      let captura = event.target.closest(".title-list1")
      
      
      if(captura){
              
          const name = captura.getAttribute("data-name")
          const price = parseFloat(captura.getAttribute("data-price"))
  
          addToCard(name, price)
          alert(name + " adicionado ao carrinho!")
           
      
      }
    
  })


/*Função para adicionar ao carrinho*/
function addToCard(name, price){

    const exist = cart.find(item => item.name === name)
    if(exist){
        // se o item ja existe apenas some 1
        exist.quantity += 1;
    }else{
    cart.push({
        name,
        price,
        quantity: 1,
    
    })
}
updateCardModal()

}

    

/*Função atualizar carrinho*/
function updateCardModal(){
    nomePedidor.innerHTML="";
    let total = 0;
    cart.forEach(item =>{
        const createDiv = document.createElement("div");
    

        createDiv.innerHTML =`
        <div>
        <div class="container-flex">
         <div class="container-block"> 
         <p>${item.name}</p>
         <p>Qtd: ${item.quantity}</p>
         <p>R$ ${item.price.toFixed(2)}</p>
         </div> 

         <div>
         <button class="remove-btn" data-name="${item.name}" style="cursor:pointer; margin-top:25px; padding:5px; border-radius:10px;border: 1px solid black;">
         remover
         </button>
         </div>
         </div>
        </div>
        `
        total += item.price * item.quantity;
        nomePedidor.appendChild(createDiv);
       

    })
    Total.textContent=total.toFixed(2);

}


/*Acionar modal pedido*/
function modaliza(){
updateCardModal()
modal3.style.display="block"

fecha.addEventListener("click", function(){
         modal3.style.display="none"

})

}

//função para remover o item do carrinho
nomePedidor.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-btn")){
        const name1 = event.target.getAttribute("data-name")
        removeItemCa(name1)
    }
})

function removeItemCa(name1){
    const index = cart.findIndex(item => item.name === name1);
    if(index !== -1){
        const it = cart[index];
        if(it.quantity > 1) {
            it.quantity -= 1;
            updateCardModal();
            return;
        }
        cart.splice(index, 1);
        updateCardModal();
    }
}

//Função para pegar o input
nome.addEventListener("input", function(event3){
    let inputValue = event3.target.value;
    if(!inputValue !== ""){
    erro.style.visibility="hidden"
    }
})

rua.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== "") {
    erro.style.visibility="hidden";
}
});
  numero.addEventListener("input", function(event1){
    let inputValue = event1.target.value;

    if(inputValue !== ""){
    erro.style.visibility="hidden";
 }
});
bairro.addEventListener("input", function(event2){
    let inputValue = event2.target.value;

    if(inputValue !== ""){
    erro.style.visibility="hidden";
}
});


//Finalizar pedido
finalizar.addEventListener("click", function(){

    const isOpen = checkRestauranteOn();

    if(!isOpen){
        alert("Lancheria fechada no momento");
        return;
    }

    if(cart.length === 0) return;

    if(nome.value === "" || rua.value === "" || numero.value === "" || bairro.value === "") {
        erro.style.visibility="visible";
        return;
    }

    //Enviar pedido para o Whatsapp
    const cardItem = cart.map((item) => {
        return (
            `${item.name}, Quantidade: ${item.quantity} | `
        )

    }).join("");

    const message = encodeURIComponent(cardItem);
    const fone = "5198968933"

    window.open(`https://wa.me/${fone}?text=Boa noite, me chamo ${nome.value}, Queria Pedir: ${message} Endereço: ${rua.value}, Nº: ${numero.value}, Bairro: ${bairro.value}`, "_blank");
    cart=[];
    updateCardModal()


})

//verificar hora
function checkRestauranteOn(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 23; //restaurante aberto
}

const itemSpan = document.getElementById("data-span");

const open = checkRestauranteOn();
if(open){
    itemSpan.style.backgroundColor= "rgba(28, 187, 7, 0.65)";
}else{
    itemSpan.style.backgroundColor= "rgba(231, 1, 1, 0.65)";
}


