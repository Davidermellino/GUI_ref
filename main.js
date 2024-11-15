import extract_titles from "./function_js/extract_title.js";
import print_result from "./function_js/printResult.js";
import cerca_cit from "./function_js/cerca_[cit].js";


let compute_placeholder = document.querySelector("#comp_placeholder");
let container_provided_by_user_elements =
  document.querySelector("#ct_prov_by_user");

let radios = document.querySelectorAll(".form-check-input");
let textarea = document.querySelector("#first_ta");

let getref = document.querySelector("#getref");
let usr_ref = document.querySelector("#usr_ref");
let div_getref = document.querySelector("#div-getref");

let dropdown = document.querySelector("#dropdownSelect");

let result = document.querySelector("#result");

// abilito tooltip
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
//abilito i popover
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


// veririco se [cit] occore nel textbox iniziale per far apparire compute placeholder o meno
cerca_cit(textarea, compute_placeholder, div_getref)


//l'utente ha cliccato compute placeholder (vengono aggiunti i cit) e lo segnalo
compute_placeholder.addEventListener("click", () => { //al click di place holder
  textarea.value += "[cit]"
  div_getref.classList.remove("d-none")
});

// Verifico se i radio button status e prov cambiano per far apparire la sezione per l'inserimento
radios.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    if (index === 0) {
      container_provided_by_user_elements.classList.add("d-none");
    } else if (index === 1) {
      container_provided_by_user_elements.classList.remove("d-none");
    }
  });
});

// stampo i titoli in base al formato della biografia
getref.addEventListener("click", () => { //al click di get references
  let titles = []

  let format = dropdown.value
  if (radios[1].checked) { // se seleziona provided by user
    titles = extract_titles(format)
    result.innerHTML = ""; 
    titles.forEach(title => {        
            let div = document.createElement("div");
            div.classList.add("row", "my-3", "border-bottom", "border-black");
            div.innerHTML = `
                <div class="col-8 align-self-center">    
                        <span class="m-0 text-result"">${title}</span>
                </div>
                <div class="col-4 d-flex align-items-center justify-content-center">
                    <img src=${format == 1 ? "./assets/APA_icon.jpeg" : "./assets/Bibtex_icon.jpg"} alt="" class="format-logo mb-2">
                </div>
        `;
            result.appendChild(div);
    });
  }


  //selezionato status per GetRef
  if (radios[0].checked) { // se seleziona status

    fetch("risultato.json") // prendo dal file JSON i titoli 
      .then((response) => response.json())
      .then((data) => {

        // data.citazioni.forEach((citazione) => {

        //   titles.push(citazione.testo) //li aggiungo alla lista
          
        // });
        
        print_result(data.citazioni, 1) //format 0 = APE
      })
  }
});
