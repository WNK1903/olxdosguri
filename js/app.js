var currentUserName;
var currentUserUid;

// signin popup
var signinBtn = document.getElementById("signinBtn");
var signinBtn_2 = document.getElementById("signinBtn_2");
var signinPopup = document.getElementById("signinPopup");
var closeSigninPopup = document.getElementById("closeSigninPopup");

function signinBtn_f() {
    signinPopup.style.display = "flex";
    signupPopup.style.display = "none";
}

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

// signup popup
var signupBtn = document.getElementById("signupBtn");
var signupPopup = document.getElementById("signupPopup");
var closeSignupPopup = document.getElementById("closeSignupPopup");

signupBtn.onclick = () => {
    signupPopup.style.display = "flex";
    signinPopup.style.display = "none";
    sellPopup.style.display = "none";
    categoryPopup.style.display = "none";
}

// category popup
var selectedCategory = '';
var sellBtn = document.getElementById("sellBtn");
var categoryPopup = document.getElementById("categoryPopup");
var closeCategoryPopup = document.getElementById("closeCategoryPopup");

sellBtn.onclick = () => {
    categoryPopup.style.display = "flex";
    sellPopup.style.display = "none";
    signupPopup.style.display = "none";
    signinPopup.style.display = "none";
}

// back category popup
var backCategoryPopup = document.getElementById("backCategoryPopup");

backCategoryPopup.onclick = () => {
    categoryPopup.style.display = "flex";
    sellPopup.style.display = "none";
    signupPopup.style.display = "none";
    signinPopup.style.display = "none";
}

// sell popup
var categoryForm = document.getElementById("categoryForm");
var categoryName = document.getElementById("categoryName");

categoryForm.onsubmit = () => {
    selectedCategory = document.querySelector("input[name='category']:checked");

    if (Boolean(selectedCategory) === true) {
        categoryName.innerText = `Category: ${selectedCategory.value}`;

        sellPopup.style.display = "flex";
        signupPopup.style.display = "none";
        signinPopup.style.display = "none";
        categoryPopup.style.display = "none";

        selectedCategory.checked = false;

        document.getElementById("warning").style.display = "none";
    } else {
        document.getElementById("warning").style.display = "block";
    }
    return false;
}

// window onclick
window.onclick = () => {
    if (event.target === signinPopup || event.target === closeSigninPopup || event.target === signupPopup || event.target === closeSignupPopup || event.target === closeSellPopup || event.target === closeCategoryPopup || event.target === closeAdDetailsPopup) {
        signupPopup.style.display = "none";
        signinPopup.style.display = "none";
        sellPopup.style.display = "none";
        categoryPopup.style.display = "none";
        adDetailsPopup.style.display = "none";
    }
}

//sellForm
var sellForm = document.getElementById("sellForm");

sellForm.onsubmit = (e) => {
    e.preventDefault();
    var vendor = document.getElementById("adVendor");
    var title  = document.getElementById("adTitle"); 
    var description = document.getElementById("adDescription"); 
    var price = document.getElementById("adPrice");
    var phone = document.getElementById("adPhone");
    var image = document.getElementById("adImage");
    saveSellFormLocalStorage(vendor, title, description, price, phone, image);

    sellPopup.style.display = "none";
    signupPopup.style.display = "none";
    signinPopup.style.display = "none";     
    categoryPopup.style.display = "none";
}

function saveSellFormLocalStorage(vendor, title, description, price, phone, image) {
    const sell = {
        vendor : vendor.value, 
        title  : title.value,
        description : description.value,
        price : price.value,
        phone : phone.value,
        image : image.value
    };
    localStorage.setItem(adDescription.value, JSON.stringify(sell));
}


var signupForm = document.getElementById("signupForm");
// signup
signupForm.onsubmit = (e) => {
    e.preventDefault();
    var name = document.getElementById("signupName");
    var email = document.getElementById("signupEmail");
    var pass = document.getElementById("signupPw");
    saveUserLocalSorage(name, email, pass);

}

function saveUserLocalSorage(name, email, pass){
    const user = {
        name : name.value,
        email : email.value, 
        pass : pass.value
    };
    localStorage.setItem(signupEmail.value, JSON.stringify(user));
}


// signin
var signinForm = document.getElementById("signinForm");

signinForm.onsubmit = (e) => {
    e.preventDefault();
    signIn(document.getElementById("signinEmail"), document.getElementById("signinPw"));
}

function signIn(email, pass){
    var item = JSON.parse(localStorage.getItem(email.value));
    if(item !== null){
        if(item.email === email.value && item.pass === pass.value){
            console.log('deu certo');
            window.location.assign('userArea.html');
        }
    }
}


// signout
var signoutBtn = document.getElementById("signoutBtn");

signoutBtn.onclick = (e) => {
    e.preventDefault();
    signOut();
}

function signOut() {
    window.location.assign('index.html');
}

// rendering all products
const picks = document.getElementById('picks');
var adUid;

// filtering
var searchCategory = 'All';
var popularCategories = document.getElementById("popularCategories");
var categoryHeading = document.getElementById("categoryHeading");
var browseCategories = document.getElementById("browseCategories");
var mainBanner = document.getElementById("mainBanner");
var mainBannerImg = document.getElementById("mainBannerImg");

function filter(category) {
    filteredAds = [];
    searchField.value = '';
    browseCategories.innerHTML = '';
    browseCategories.innerHTML = `Browse by Categories &nbsp; / &nbsp; ${category}`;
    // popularCategories.style.display = "none";
    categoryHeading.innerText = category;
    picks.innerHTML = '';
    searchCategory = category;

    if (category === 'All') {
        filteredAds = [...allAds];
        allAds.map((ad) => {
            renderAds(ad);
        })

        return;
    }

    allAds.map((ad) => {
        if (ad.category === category) {
            filteredAds.push(ad);
            renderAds(ad);
        }
    });

    if (picks.innerHTML.trim().length === 0) {
        picks.innerHTML = `<div style="text-align:center; margin:50px 0;"><h2>Oops! There is nothing to show :(</h2><img src="./images/noresults.png" alt=""></div>`;
    }
}

// searching ads
var searchField = document.getElementById('searchField');
var searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    search();
})

searchField.addEventListener('keyup', () => {
    
})


function search() {
    

}

