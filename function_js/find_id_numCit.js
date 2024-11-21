export default function extractCitInfo(str) {
    const regex = /tc-(\d+)-(\d+)/;
    const match = str.match(regex);
  
    if (match) {
      const id = match[1];  // Primo gruppo di cattura (cit.id)
      const numCit = match[2];  // Secondo gruppo di cattura (cit.numCit)
      return  {id, numCit} ;
    } else {
      return null;  // Non è stato trovato un match
    }
  }
  