import switch_cit from "./switch_[cit].js";
import find_id_numcit from "./find_id_numCit.js";

export default function print_result(citation, format, textarea, mode) {
  // Svuoto il contenitore per evitare sovrapposizioni al successivo click
  result.innerHTML = `
    <div class="col-8">${switch_cit(textarea.value)}</div>
    <div class="col-4 d-flex align-items-center justify-content-center">
        <img src=${
          format == 1 ? "./assets/APA_icon.jpeg" : "./assets/Bibtex_icon.jpg"
        } alt="" class="format-logo mb-2 copy-btn">
    </div>
    `;
  let selected = [];

  // Inizializza il popover per ogni elemento
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );

  popoverTriggerList.forEach((popoverTriggerEl) => {
    const citId = popoverTriggerEl.id.replace("cit-", "");
    
    // Inizializza l'array selected con il valore predefinito (1) per la prima citazione
    if (!selected[citId - 1]) {
      selected[citId - 1] = 1; // Se la citazione non è stata selezionata, seleziona il primo numero di citazione come predefinito
    }

    // Filtra le citazioni relative all'elemento corrente se provided le prende tutte
    const relatedCitations = citation
      .filter(mode == "scopus" ? (cit) => cit.id == citId : (cit) => cit)
      .map(
        (cit) => `
                <li>
                    <a 
                        class="alternative-cit btn cursor-pointer text-result text-start 
                        ${
                          (cit.numCit === selected[citId - 1] &&
                            mode == "scopus") ||
                          citation.indexOf(cit) == 0
                            ? "text-decoration-underline"
                            : ""
                        }"
                        id=${
                          mode == "scopus" ? `tc-${cit.id}-${cit.numCit}` : `${citation.indexOf(cit)}`
                        }
                        data-cit-id="${mode == "scopus" ? cit.id : citation.indexOf(cit)}" 
                        data-num-cit="${mode == "scopus" ? cit.numCit : ""}"
                        >
                        ${mode == "scopus" ? cit.testo : cit}
                    </a>
                </li>
            `
      )
      .join("");

    // Inizializza il popover con il contenuto generato dinamicamente
    const popover = new bootstrap.Popover(popoverTriggerEl, {
      html: true,
      trigger: "focus",
      content: `<ol>${
        relatedCitations || "Non ci sono altre citazioni disponibili"
      }</ol>`,
    });


    //appena si vede un popover
    popoverTriggerEl.addEventListener("shown.bs.popover", () => {
      //mi salvo l'id del popover
      const popoverID = popoverTriggerEl.getAttribute("aria-describedby");
      //tramite l'id recupero gli elementi del popover selezionato
      const popoverElement = document.getElementById(popoverID);

      //ciclo su tutti gli elementi del popover
      popoverElement
        .querySelectorAll(".alternative-cit")
        .forEach((citElement) => {
          //quando ne clicco uno..
          citElement.addEventListener("click", () => {
            //ciclo su tutti gli elementi del popover e gli tolgo la sottolineatura
            popoverElement
              .querySelectorAll(".alternative-cit")
              .forEach((citElement) => {
                citElement.classList.remove("text-decoration-underline");
              });
            //aggiorno array dei selezionati
            if (mode == "scopus") {
              let { id, numCit } = find_id_numcit(citElement.id);
              selected[id - 1] = Number(numCit);
            }else{
              let cit_number = popover._element.id.match(/[0-9]+/)[0];
              selected[Number(cit_number)-1] = Number(citElement.id)+1
                                    
            }

            //aggiungo la sottolineatura al cit selezionato
            citElement.classList.add("text-decoration-underline");
          });
        });
    });
    
  });

  // Seleziono il bottone per copiare le cit
  const copy_btn = document.querySelector(".copy-btn");

  // Se lo clicco
  copy_btn.addEventListener("click", () => {
    // Crea una stringa con le citazioni selezionate
    let selectedCitationsText = ""
    if (mode == "scopus"){
      selectedCitationsText = citation
        .filter((cit) => selected[cit.id - 1] === cit.numCit)
        .map((cit) => `[${cit.id}] ${cit.testo}`) // Aggiungi la citazione con il numero
        .join("\n"); // Unisci le citazioni con una nuova linea
    }else{
      popoverTriggerList.forEach((popoverTriggerEl, i) => {
        
        selectedCitationsText += citation
        .filter((cit)=>selected[i]==citation.indexOf(cit)+1)
        .map((cit) => `[${i+1}] ${cit}`) // Aggiungi la citazione con il numero
        .join("\n");
      })
      
    }
    
    // Copia il testo delle citazioni selezionate sulla clipboard
    navigator.clipboard.writeText(selectedCitationsText);
    let div = document.createElement("div");
    div.classList.add("alert", "alert-success");
    div.setAttribute("role", "alert");
    div.innerHTML = `
      copiato con successo
    `;
    result.insertAdjacentElement("beforebegin", div);
    setTimeout(() => {
      div.remove(); // Rimuove l'alert dopo 5 secondi
    }, 2000);
  });
}
