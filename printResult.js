export default function print_result(titles, format) {

    //per ogni titolo creo una riga nel div "risultato"
    result.innerHTML = ""; //lo svuoto per non sovrapporre al successivo click
    titles.forEach(title => {

        //dobbiamo aggiungere qua i [n] che potrebbero essere link e con l'hover si apre un popover con le 10 scelte che possono essere link e se l'utente clicca li cambia
        let div = document.createElement("div")
        div.classList.add("row")
        div.classList.add("my-3")
        div.classList.add("border-bottom")
        div.classList.add("border-black")
        div.innerHTML = `
        
       
        <div class="col-8 align-self-center">
            
          <p class="m-0">${title}</p>
        </div>
        <div class="col-4 d-flex align-items-center justify-content-center">
            <img src=${format == 1 ? "./assets/APA_icon.jpeg" : "./assets/Bibtex_icon.jpg"} alt="" class="format-logo mb-2">
        </div>
    `




        result.appendChild(div)
    });

}