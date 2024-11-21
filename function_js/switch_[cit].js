export default function switch_cit(testo) {
    let contatore = 1;
    // Sostituzione con numeri crescenti come link
    return testo.replace(/\[cit\]/g, () => `<span
                                                    tabindex="0" 
                                                    id="cit-${contatore}" 
                                                    class="cit_choice_btn" 
                                                    data-bs-toggle="popover"
                                                    data-bs-title="Scegli un altra cit"
                                                    data-bs-custom-class="custom-popover"
                                                    >
                                                        [${contatore++}]
                                            </span>`);
}