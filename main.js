let getref = document.querySelector("#getref");
let compute_placeholder = document.querySelector("#comp_placeholder");
let container_provided_by_user_elements = document.querySelector("#ct_prov_by_user")
let radios = document.querySelectorAll(".form-check-input");
let textarea = document.querySelector("#first_ta");

getref.addEventListener("click", ()=>{
    let check = Array.from(radios).find((button) => button.checked);
    
    if (check.value == "prov"){
        container_provided_by_user_elements.classList.remove("d-none")        
    }
    else{
        container_provided_by_user_elements.classList.add("d-none")        
    }
})

textarea.addEventListener("blur", ()=>{
    if(textarea.value.includes("[cit]")){
        compute_placeholder.classList.add("d-none")
    }else{
        compute_placeholder.classList.remove("d-none")
        
    }

    
})
