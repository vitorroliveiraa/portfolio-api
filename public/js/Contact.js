const contactForm = document.querySelector(".node-email");
const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const status = document.getElementById("status");
const sendButton = document.getElementById("btnSendEmail");

function setStatus(message, klass) {
  status.textContent = message;
  status.classList.add(klass);
  status.removeAttribute("hidden");
}
function hideStatus() {
  status.setAttribute("hidden", "hidden");
  status.className = "status";
  status.textContent = "";
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  hideStatus();

  btnSendEmail.setAttribute("disabled", "");

  const contact = {
    name: event.target[0].value,
    email: event.target[1].value,
    subject: event.target[2].value,
    message: event.target[3].value,
  };

  try {
    const response = await axios.post("http://localhost:8080/contact", {
      contact,
    });

    if (response.statusText === "OK") {
      name.value = "";
      email.value = "";
      subject.value = "";
      message.value = "";

      btnSendEmail.disabled = false;

      setStatus("E-mail enviado com sucesso! Obrigado pelo contato!");

      setTimeout(hideStatus, 5000);
    } else {
      const data = await response.json();
      console.log(data);

      setStatus(
        "Putzz, o e-mail não foi enviado 🤔! Bom, caso o erro persista entre em contato pelas redes sociais, fico no aguardo!"
      );
    }
    // sendButton.removeAttribute("disabled");
    btnSendEmail.removeAttribute("disabled");
  } catch (error) {
    setStatus(
      "Putzz, o e-mail não foi enviado 🤔! Bom, caso o erro persista entre em contato pelas redes sociais, fico no aguardo!"
    );
    console.log(error);

    btnSendEmail.removeAttribute("disabled");
  }
});
