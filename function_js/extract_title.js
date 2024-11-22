export default function extract_titles(format) {   
    let titles =  []
    
    if (format == 1) {
        let references = usr_ref.value.split("\n"); // separo le varie righe (una references per riga)
        references.forEach(reference => { 
            if (reference.trim() !== "") { // gestisco il caso di righe vuote o solo con spazi
                // Estraggo il titolo usando una regex APA
                let match = reference.match(/\(\d{4}\)\.\s([^\.]+)\./); 
                if (match) {
                    titles.push(match[1]); // aggiungo il titolo trovato
                }
            }
        });


    }else if(format == 2){
        let references = usr_ref.value.split("@"); // separo le varie righe (separatore chiocciola)        
        references.forEach(reference => {             
            titles.push(reference.match(/title\s*=\s*{([^}]*)}/i)?.[1])
        });
        titles.splice(0,1)
    }
    return titles
}
