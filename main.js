import extract_titles from "./function_js/extract_title.js";
import print_result from "./function_js/printResult.js";
import cerca_cit from "./function_js/cerca_[cit].js";
import cerca_1 from "./function_js/cerca_[1].js";
import switch_cit from "./function_js/switch_[cit].js";

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

//l'utente ha cliccato compute placeholder (vengono aggiunti i cit) e lo segnalo
compute_placeholder.addEventListener("click", () => {
  //al click di place holder

  if (!cerca_cit(textarea)) {
    textarea.value += "[cit]";
  } else {
    //gestione errore [cit] già presenti
    let div = document.createElement("div");
    div.classList.add("alert", "alert-danger");
    div.setAttribute("role", "alert");
    div.innerHTML = `
      ci sono già i cit
    `;
    textarea.insertAdjacentElement("afterend", div);
    setTimeout(() => {
      div.remove();
    }, 2000);
  }
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

getref.addEventListener("click", () => {
  //al click di get citation

  if (cerca_cit(textarea) || cerca_1(textarea)) {
    let format = dropdown.value;
    // se seleziona provided by user
    if (radios[1].checked) {
      result.innerHTML = `
                <div class="col-8" >${switch_cit(textarea.value)} </div>
                <div class="col-4 d-flex align-items-center justify-content-center">
                    <img src=${
                      format === 1
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
      titles.forEach((title) => {});
    }
    //selezionato status per GetRef
    if (radios[0].checked) {
      // se seleziona status

      fetch("risultato.json") // prendo dal file JSON i titoli
        .then((response) => response.json())
        .then((data) => {
          print_result(data.citazioni, 1, textarea); //format 1 = APE
        });
    }
  } else {
    //gestione errore [cit] mancabtu
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
