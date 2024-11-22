import extract_titles from "./function_js/extract_title.js";
import print_result from "./function_js/printResult.js";
import cerca_cit from "./function_js/cerca_[cit].js";
import cerca_1 from "./function_js/cerca_[1].js";
import switch_cit from "./function_js/switch_[cit].js";


//----------------------------Dichiarazione VAR----------------------------
let compute_placeholder = document.querySelector("#comp_placeholder"); //pulsante Compute_PlaceHolder
let container_provided_by_user_elements = document.querySelector("#ct_prov_by_user");

let textarea = document.querySelector("#first_ta"); //textArea input testo
let radios = document.querySelectorAll(".form-check-input");//radios per scelta Scopus/Provided By User
let dropdown = document.querySelector("#dropdownSelect");//dropDown per scelta APA o BibTex se sceglie ProvByUsr

//si possono togliere
let usr_ref = document.querySelector("#usr_ref");
let div_getref = document.querySelector("#div-getref");

let getref = document.querySelector("#getref"); //pulsante Get Citation

let result = document.querySelector("#result"); //area del risultato

// abilito tooltip
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);



//----------------------------Gestione pulsante ComputePlaceholder----------------------------
//Creo l'HTML del modal
const modalHTML = `
<div class="modal fade" id="err_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">[cit] already inserted</h1>
        </div>
      <div class="modal-body">
        Do you want to replace the [cit]?
      </div>
      <div class="modal-footer">
        <button type="button" id="close" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="FC">Yes</button>
      </div>
    </div>
  </div>
</div>`;

let myModal; //var per gestire il modal

// GESTISCO CLICK PLACEHOLDER: caso con o senza [cit] presenti
compute_placeholder.addEventListener("click", () => { //al click di place holder

  if (!cerca_cit(textarea)) { //se non sono presenti [cit]
    textarea.value += "[cit]"; //li aggiungo(chiamata API)
  } else {//gestione errore [cit] già presenti

    // Prima di aggiungere un nuovo modal, rimuoviamo il modal precedente (se esiste)
    let existingModal = document.getElementById('err_modal');
    if (existingModal) {
      existingModal.remove(); // Rimuovi il modal esistente dal DOM
    }

    // Aggiungi il modal dinamicamente al body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Seleziona il modal appena aggiunto
    myModal = new bootstrap.Modal(document.getElementById('err_modal'));

    // Mostra il modal
    myModal.show();

    // Assegna l'evento al bottone "Save changes"
    let btn_FC = document.getElementById('FC');
    btn_FC.addEventListener('click', () => { //al click del bottone FaiComunque 

      textarea.value += "[cit]"; //Chiamo l'API 

      // Chiudi il modal e rimuovilo dal DOM
      myModal.hide();
      document.getElementById('err_modal').remove(); // Rimuovi il modal dal DOM
    });

    //Gestisco la chiusura tramite il pulsante "Close" 
    let closeBtn = document.getElementById('close');
    closeBtn.addEventListener('click', () => {
      myModal.hide();
      document.getElementById('err_modal').remove(); // Rimuovi il modal dal DOM
    });
  }

});


//---------------------------- Verifico se i radio button status e prov cambiano per far apparire la sezione per l'inserimento----------------------------
radios.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    if (index === 0) {
      container_provided_by_user_elements.classList.add("d-none");
    } else if (index === 1) {
      container_provided_by_user_elements.classList.remove("d-none");
    }
  });
});


//---------------------------- Gestione pulsante Get Citation ---------------------------- 

getref.addEventListener("click", () => {//al click di get citation

  if (cerca_cit(textarea) || cerca_1(textarea)) { //se sono presenti [cit] o [1]

    let format = dropdown.value;


    // se seleziona provided by user
    if (radios[1].checked) {
      
      if (format!= 0 && format!=1)
      {
        //formato non selezionato
        {
          let div = document.createElement("div");
        div.classList.add("alert", "alert-danger");
        div.setAttribute("role", "alert");
        div.innerHTML = `
          You have not chosen the format!
        `;
        textarea.insertAdjacentElement("afterend", div);
        setTimeout(() => {
          div.remove();
        }, 2000);
        
        }
      }
      else{
      //WARNING PARSING FALLITO  (facciamo quando abbiamo l'API se non restituisce nulla)
      result.innerHTML = `
                <div class="col-8" >${switch_cit(textarea.value)} </div>
                <div class="col-4 d-flex align-items-center justify-content-center">
                    <img src=${format === 1
          ? "./assets/APA_icon.jpeg"
          : "./assets/Bibtex_icon.jpg"
        } alt="" class="format-logo mb-2">
                </div>`;

      //abilito i popover
      const popoverTriggerList = document.querySelectorAll(
        '[data-bs-toggle="popover"]'
      );
      let titles = extract_titles(format);

      popoverTriggerList.forEach((popoverTriggerEl, index) => {
        const popover = new bootstrap.Popover(popoverTriggerEl, {
          html: true,
          trigger: "focus",
          content: titles[index]

        });
      })
      titles.forEach((title) => { });
    }
    }



    //selezionato Scopus per GetRef
    else if (radios[0].checked) {

      fetch("risultato.json") // prendo dal file JSON i titoli
        .then((response) => response.json())
        .then((data) => {
          print_result(data.citazioni, 1, textarea); //format 1 = APE
        });
    }

   
  }

  //gestione errore [cit] mancanti  
  else {
    
    //creo l'alert
    let div = document.createElement("div");
    div.classList.add("alert", "alert-danger");
    div.setAttribute("role", "alert");
    div.innerHTML = `
      Non hai inserito cit 
    `;
    textarea.insertAdjacentElement("afterend", div);
    setTimeout(() => {
      div.remove();
    }, 2000);
  }
});
