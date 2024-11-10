export default function print_result(citation, format) {    
    // Svuoto il contenitore per evitare sovrapposizioni al successivo click
    result.innerHTML = ""; 
    citation.forEach(cit => {        
        if (cit.numCit === 1 ) {
            let div = document.createElement("div");
            div.classList.add("row", "my-3", "border-bottom", "border-black");
            div.innerHTML = `
                <div class="col-8 align-self-center">    
                        <a class="cit_choice_btn" id="cit-${cit.id}"
                            data-bs-toggle="popover" 
                            data-bs-placement="left"
                            tabindex="0"
                            data-bs-title="Seleziona citazione alternativa">
                            [${cit.id}]
                        </a>
                        <span class="m-0 text-result" id="${cit.id}">${cit.testo}</span>
                </div>
                <div class="col-4 d-flex align-items-center justify-content-center">
                    <img src=${format === 1 ? "./assets/APA_icon.jpeg" : "./assets/Bibtex_icon.jpg"} alt="" class="format-logo mb-2">
                </div>
        `;
            result.appendChild(div);
        }
    });
  
    
    // Seleziona tutti gli elementi popover appena creati e inizializzali
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(popoverTriggerEl => {
        // Filtra le citazioni per ottenere solo quelle associate all'elemento di attivazione
        const relatedCitations = citation
            .filter(cit => `cit-${cit.id}` === popoverTriggerEl.id && popoverTriggerEl.nextElementSibling.innerHTML != cit.testo)
            .map(cit => `<li><a class="alternative-cit btn cursor-pointer text-result text-start" id="${cit.id}">${cit.testo}</a></li>`)
            .join(''); // Converte l'array in una stringa HTML

        // Inizializza il popover con il contenuto generato dinamicamente
        const popover = new bootstrap.Popover(popoverTriggerEl, {
            html: true,
            trigger: 'focus',
            content: relatedCitations ? `<ul>${relatedCitations}</ul>` : "Non ci sono altre citazioni disponibili"
        });
    });

    // Gestione evento delegato: ascolta l'evento click sugli elementi .alternative-cit
    document.addEventListener("click", (event) => {
        // Verifica se il clic è stato effettuato su un elemento con la classe "alternative-cit"
        if (event.target && event.target.classList.contains("alternative-cit")) {
            
            // Seleziona tutte le textarea (o gli elementi) che hanno lo stesso id di event.target
            const textResultElements = document.querySelectorAll('.text-result');
            
            // Converte la NodeList in un array e filtra per id uguale
            const filteredElements = Array.from(textResultElements).filter(element => element.id === event.target.id);
            
            // Se ci sono elementi che corrispondono, stampa i risultati
            filteredElements[0].innerHTML = event.target.innerHTML

            popoverTriggerList.forEach(popoverTriggerEl => {
                console.log()
                // Filtra le citazioni per ottenere solo quelle associate all'elemento di attivazione
                const relatedCitations = citation
                    .filter(cit => `cit-${cit.id}` === popoverTriggerEl.id && popoverTriggerEl.nextElementSibling.innerHTML != cit.testo)
                    .map(cit => `<li><a class="alternative-cit btn cursor-pointer text-result text-start" id="${cit.id}">${cit.testo}</a></li>`)
                    .join(''); // Converte l'array in una stringa HTML
        
                // Inizializza il popover con il contenuto generato dinamicamente
                const popover = new bootstrap.Popover(popoverTriggerEl, {
                    html: true,
                    trigger: 'focus',
                    content: relatedCitations ? `<ul>${relatedCitations}</ul>` : "Non ci sono altre citazioni disponibili"
                });
            });
        }
    });
}