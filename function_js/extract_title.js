export default function extract_titles(format) {   
    let titles =  []
    if (format == 1) {
        let references = usr_ref.value.split("\n"); // separo le varie righe (una references per riga)
        references.forEach(reference => { 
            if (reference != "") { //gestisco caso in cui prende righe vuote (es. va a capo per sbaglio)
              titles.push(reference.match(/\*(.*?)\*/)?.[1]) //estraggo il titolo, al momento supponendo che sia dentro degli asterischi
            }
        });
    }else if(format == 2){
        let references = usr_ref.value.split("@"); // separo le varie righe (separatore chiocciola)
        references.forEach(reference => { 
            if (reference != "") { //gestisco caso in cui prende righe vuote (es. va a capo per sbaglio)
                titles.push(reference.match(/title\s*=\s*{([^}]*)}/i)?.[1])
            }
        });
    }
    return titles
}