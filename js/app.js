// elementos da modal de logar
let signinBtn = document.getElementById("signinBtn");
let signinBtn_2 = document.getElementById("signinBtn_2");
let signinPopup = document.getElementById("signinPopup");
let closeSigninPopup = document.getElementById("closeSigninPopup");

// elementos da modal de entrar
let signupBtn = document.getElementById("signupBtn");
let signupPopup = document.getElementById("signupPopup");
let closeSignupPopup = document.getElementById("closeSignupPopup");

// elementos da modal de categorias
let selectedCategory = '';
let sellBtn = document.getElementById("sellBtn");
let categoryPopup = document.getElementById("categoryPopup");
let closeCategoryPopup = document.getElementById("closeCategoryPopup");

// botao de voltar categoria
let backCategoryPopup = document.getElementById("backCategoryPopup");

// botao vender
let categoryForm = document.getElementById("categoryForm");
let categoryName = document.getElementById("categoryName");

// form de venda
let sellForm = document.getElementById("sellForm");

// form de cadastro
let signupForm = document.getElementById("signupForm");

// form de login
let signinForm = document.getElementById("signinForm");

// botao logout
let signoutBtn = document.getElementById("signoutBtn");

// elementos de busca
let searchField = document.getElementById('searchField');
let searchBtn = document.getElementById('searchBtn');

// Ao clicar em algum botão ajusta as propriedades CSS dos demais
signinBtn.onclick = () => {
    signinPopup.style.display = "flex";
    signupPopup.style.display = "none";
    sellPopup.style.display = "none";
    categoryPopup.style.display = "none";
}

signinBtn_2.onclick = () => {
    signinPopup.style.display = "flex";
    signupPopup.style.display = "none";
    sellPopup.style.display = "none";
    categoryPopup.style.display = "none";
}

signupBtn.onclick = () => {
    signupPopup.style.display = "flex";
    signinPopup.style.display = "none";
    sellPopup.style.display = "none";
    categoryPopup.style.display = "none";
}

sellBtn.onclick = () => {
    categoryPopup.style.display = "flex";
    sellPopup.style.display = "none";
    signupPopup.style.display = "none";
    signinPopup.style.display = "none";
}

backCategoryPopup.onclick = () => {
    categoryPopup.style.display = "flex";
    sellPopup.style.display = "none";
    signupPopup.style.display = "none";
    signinPopup.style.display = "none";
}

// ao clicar fora de qualquer popup
window.onclick = (event) => {
    if (event.target === signinPopup || event.target === closeSigninPopup || event.target === signupPopup || 
        event.target === closeSignupPopup || event.target === closeSellPopup || event.target === closeCategoryPopup || 
        event.target === closeAdDetailsPopup) 
    {
        signupPopup.style.display = "none";
        signinPopup.style.display = "none";
        sellPopup.style.display = "none";
        categoryPopup.style.display = "none";
        adDetailsPopup.style.display = "none";
    }
}

categoryForm.onsubmit = () => {
    selectedCategory = document.querySelector("input[name='category']:checked");

    if (Boolean(selectedCategory) === true) {
        categoryName.innerText = `Category: ${selectedCategory.value}`;

        sellPopup.style.display = "flex";
        signupPopup.style.display = "none";
        signinPopup.style.display = "none";
        categoryPopup.style.display = "none";

        selectedCategory.checked = false;
        categoryForm.reset();
    } else {
        document.getElementById("warning").style.display = "block";
        categoryForm.reset();
    }
    return false;
}

sellForm.onsubmit = (e) => {
    e.preventDefault();
    let vendor = document.getElementById("adVendor");
    let title  = document.getElementById("adTitle"); 
    let description = document.getElementById("adDescription"); 
    let price = document.getElementById("adPrice");
    let phone = document.getElementById("adPhone");
    let image = document.getElementById("adImage");
    saveSellFormLocalStorage(vendor, title, description, price, phone, image);

    sellPopup.style.display = "none";
    signupPopup.style.display = "none";
    signinPopup.style.display = "none";     
    categoryPopup.style.display = "none";
    sellForm.reset();
}

function saveSellFormLocalStorage(vendor, title, description, price, phone, image) {
    const sell = {
        vendor : vendor.value, 
        title  : title.value,
        description : description.value,
        price : price.value,
        phone : phone.value,
        image : saveImageLocalStorage(image)
    };
    let produtos = localStorage.getItem('produtos');
    if(produtos === '' || produtos === null){
        localStorage.setItem('produtos', JSON.stringify([sell]));
    }else{
        produtos = JSON.parse(produtos);
        produtos.push(sell);
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }
}

function saveImageLocalStorage(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
}

function listarProdutos(){
    let produtos = JSON.parse(localStorage.getItem('produtos'));
    let productsArea = document.querySelector('#recent-products');
    produtos.forEach(element => {
        console.log(element);
        productsArea.innerHTML += 
            `<div class="product">
                <div class="product-image">
                    <img src="`+element.image+`">
                </div>
                <div>
                    <div class="info-product-vendedor">Vendedor: `+element.vendor+`</div>
                    <div class="info-product-desc">`+element.description+`</div>
                    <div class="info-product-price">R$`+element.price+`</div>
                </div>
            </div>`;
    });
}

// signup
signupForm.onsubmit = (e) => {
    e.preventDefault();
    let name = document.getElementById("signupName");
    let email = document.getElementById("signupEmail");
    let pass = document.getElementById("signupPw");
    if(localStorage.getItem(email.value)){
        alert('Você já possui cadastro!');
        return;
    }else{
        saveUserLocalSorage(name, email, pass);
        alert('Cadastro realizado com sucesso!');
        signinBtn.onclick();
    }
    signupForm.reset();
}

function saveUserLocalSorage(name, email, pass){
    const user = {
        name : name.value,
        email : email.value, 
        pass : pass.value
    };
    localStorage.setItem(signupEmail.value, JSON.stringify(user));
}

signinForm.onsubmit = (e) => {
    e.preventDefault();
    signIn(document.getElementById("signinEmail"), document.getElementById("signinPw"));
    signinForm.reset();
}

function signIn(email, pass){
    let item = JSON.parse(localStorage.getItem(email.value));
    if(item !== null){
        if(item.email === email.value && item.pass === pass.value){
            console.log('deu certo');
            window.location.assign('userArea.html');
        }else{
            alert('Usuário ou senha inválidos!');
        }
    }else{
        alert('Você não possui cadastro!');
    }
}

signoutBtn.onclick = (e) => {
    e.preventDefault();
    signOut();
}

function signOut() {
    window.location.assign('index.html');
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    search();
})

searchField.addEventListener('keyup', () => {
    
})


function search() {
    

}

