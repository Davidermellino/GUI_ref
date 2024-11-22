export default function error_message(message, element, position) {
  let div = document.createElement("div");
  div.classList.add("alert", "alert-danger");
  div.setAttribute("role", "alert");
  div.innerHTML = `
      ${message}
    `;
  element.insertAdjacentElement(position, div);
  setTimeout(() => {
    div.remove();
  }, 2000);
}

//this function take the error message and a element and create a div with the message at the position (passed by user) of the element