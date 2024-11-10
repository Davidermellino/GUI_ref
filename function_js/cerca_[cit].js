export default function cerca_cit(textarea, compute_placeholder, div_getref ){
    textarea.addEventListener("blur", () => {
        if (textarea.value.includes("[cit]")) {
          compute_placeholder.classList.add("d-none");
          div_getref.classList.remove("d-none")
        } else {
          compute_placeholder.classList.remove("d-none");
          div_getref.classList.add("d-none")    
        }
      });
}