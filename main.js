let getref = document.querySelector("#getref");
let compute_placeholder = document.querySelector("#comp_placeholder");
let container_provided_by_user_elements = document.querySelector("#ct_prov_by_user")
let radios = document.querySelectorAll(".form-check-input");
let textarea = document.querySelector("#first_ta");

radios[0].addEventListener("change", ()=>{

    container_provided_by_user_elements.classList.add("d-none")        
})

radios[1].addEventListener("change", ()=>{
    
    
    container_provided_by_user_elements.classList.remove("d-none")        
   
})

textarea.addEventListener("blur", ()=>{
    if(textarea.value.includes("[cit]")){
        compute_placeholder.classList.add("d-none")
    }else{
        compute_placeholder.classList.remove("d-none")        
    }

})

//roba guida
let guideIcon = document.querySelector(".pd");
let guideContent = document.querySelector('#guideContent');
let closeGuide = document.querySelector('#closeGuide');

guideIcon.addEventListener("click", () => {
    guideContent.classList.remove("d-none");
});

closeGuide.addEventListener("click", () => {
    guideContent.classList.add("d-none");
});