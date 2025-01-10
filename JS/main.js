/* Declarando variaveis*/
const modal1 = document.getElementById("card-modal");
const modal3 = document.getElementById("card-modal3");
const modal4 = document.getElementById("card-modal4");
const itens = document.getElementById("card-itens");
const Total = document.getElementById("card-total");
const fecha = document.getElementById("fech");
const proximo = document.getElementById("finaliz");
const volt = document.getElementById("voltare");
const final = document.getElementById("finaliza");
const rua = document.getElementById("adress");
const numero = document.getElementById("adress1");
const bairro = document.getElementById("adress2"); 
const erro = document.getElementById("erro-en");
const erro2 = document.getElementById("erro-en2");
const card =  document.getElementById("card-menu");
const menu = document.getElementById("lista");
const nomePedidor = document.getElementById("item-name");
const quant = document.getElementById("item-quant");
const val = document.getElementById("item-valor");
const quantCarr = document.getElementById("quantCarrinho");
const butModaliza = document.getElementById("modaliza");
const titleEntr = document.getElementById("title-entrega");
const nome = document.getElementById("nome1");
const checkbox = document.getElementById("check");
const teleen = document.getElementById("tele1");
const obs = document.getElementById("observacao");
const complement = document.getElementById("compl");
const pag = document.getElementById("sele");
const maionese = document.getElementById("maio");



let cart = [];
let teleE = 0;

/*acionar o modal sim ou não*/
 

  menu.addEventListener("click", function(event){
      let captura = event.target.closest(".title-list1")
      
      
      if(captura){
              
          const name = captura.getAttribute("data-name")
          const price = parseFloat(captura.getAttribute("data-price"))
  
          addToCard(name, price)
          
          Toastify({
            text: name + " adicionado ao carrinho!",
            duration: 2500,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "rgba(28, 187, 7, 0.95)",
            },
          }).showToast();
           
      
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
    var total = 0;
    var total1 = 0;
    
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
         <button class="remove-btn" data-name="${item.name}" style="cursor:pointer; margin-top:25px; padding:5px; border-radius:5px;border: 1px solid black; font-size:13px;">
         remover
         </button>
         </div>
         </div>
        </div>
        `
        total += item.price * item.quantity;
        total1 = total + teleE;
        nomePedidor.appendChild(createDiv);
       

    })
    quantCarr.innerHTML ="(" +  cart.length + ")";
    Total.textContent=total1.toFixed(2);


}



/*Acionar modal pedido*/
butModaliza.addEventListener("click", function(){
    updateCardModal()
    modal3.style.display="block"
})

fecha.addEventListener("click", function(){
         modal3.style.display="none"

})



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
checkbox.addEventListener("click", function(){
    if (checkbox.checked){
        teleE = 9;
        updateCardModal();
        Toastify({
            text: "Será adicionado R$ 9,00 com a tele",
            duration: 2600,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "rgba(28, 187, 7, 0.95)",
            },
          }).showToast();

    teleen.style.display="block";
    updateCardModal();
nome.addEventListener("input", function(event3){
    let inputValue = event3.target.value;
    if(!inputValue !== ""){
    erro.style.visibility="hidden"
    updateCardModal();
    }
})

rua.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== "") {
    erro2.style.visibility="hidden";
}
});
  numero.addEventListener("input", function(event1){
    let inputValue = event1.target.value;

    if(inputValue !== ""){
    erro2.style.visibility="hidden";
 }
});
bairro.addEventListener("input", function(event2){
    let inputValue = event2.target.value;

    if(inputValue !== ""){
    erro2.style.visibility="hidden";
}
});
complement.addEventListener("input", function(event3){
    let inputValue = event3.target.value;

    if(inputValue !== ""){
        erro2.style.visibility="hidden";
    }
})} else {
    teleE = 0;
    obs.value = "";
    rua.value = "";
    numero.value = "";
    bairro.value = "";
    complement.value = "";
    teleen.style.display="none";
    updateCardModal();
}
});

// Avançar pedido
proximo.addEventListener("click", function(){
    if(nome.value === "") {
        erro.style.visibility="visible";
        return;
    } 

    const isOpen = checkRestauranteOn();

    if(!isOpen){
        Toastify({
            text: "Ops o restaurante está fechado",
            duration: 2300,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            style: {
              background: "#ef4444",
            },
          }).showToast();
        return;
        
        }    
    if(cart.length === 0) return;
     modal3.style.display="none";
        modal4.style.display="block"


// modal 2

volt.addEventListener("click", function(){
    modal3.style.display="block";
    modal4.style.display="none";
})

final.addEventListener("click", function(){
    if(checkbox.checked){
        if(rua.value === "" || numero.value === "" || bairro.value === "" || complement.value ==="") {
            erro2.style.visibility="visible";
            return;
        }
    } else {
    
    }
    
    
    
        //Enviar pedido para o Whatsapp
        const cardItem = cart.map((item) => {
            return (
                `
*- ${item.name}*, quantidade: ${item.quantity};`
            )
    
        }).join("");
    
        const endeR = cart.map((item) => {
            return (
    `                                                                                                                                                                                                                                                            `
            ) }).join("");
           
            const endeR1 = cart.map((item) => {
                return (
     `                                                                                                                                                                                                                                                            `
                )
        
            }).join("");
    
        const message = encodeURIComponent(cardItem);
        const ende = encodeURIComponent(endeR);
        const fone = "5198968933"
    
        if (checkbox.checked){
            window.open(`https://wa.me/${fone}?text=Boa noite, me chamo ${nome.value}, queria pedir: ${message} ${ende}*Endereço:* ${rua.value}, Nº: ${numero.value}, Bairro: ${bairro.value}, Complemento: ${complement.value};  ${endeR1}*Observação:* ${obs.value};${endeR1}*Maionese:* ${maionese.value}; ${endeR1}*Forma de Pagamento:* ${pag.value}; ${endeR1}*Total:* R$ ${Total.textContent}.`);
        }else{
            window.open(`https://wa.me/${fone}?text=Boa noite, me chamo ${nome.value}, queria pedir: ${message} ${ende} *Observação:* ${obs.value}; ${endeR1}*Maionese:* ${maionese.value}; ${endeR1}*Forma de Pagamento:* ${pag.value}; ${endeR1}*Total: R$ ${Total.textContent}.`);
        }
    
       
        cart=[];
        checkbox.checked = false;
        obs.value = null;
        nome.value = null;
        rua.value = null;
        numero.value = null;
        bairro.value = null;
        complement.value = null;
        teleen.style.display="none";
        modal4.style.display="none";
        updateCardModal()
    
    });

})

//verificar hora
function checkRestauranteOn(){
    const data = new Date();
    const hora = data.getHours();
    const dia = data.getDay();
    console.log(data.getDay());
    return dia != 1 && hora >= 18 && hora < 23; //restaurante aberto
    
}

const itemSpan = document.getElementById("data-span");

const open = checkRestauranteOn();
if(open){
    itemSpan.style.backgroundColor= "rgba(28, 187, 7, 0.65)";
}else{
    itemSpan.style.backgroundColor= "rgba(231, 1, 1, 0.65)";
}



