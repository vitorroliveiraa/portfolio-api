const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  from: "teste@gmail.com", // Quem está enviando
  to: process.env.MY_EMAIL, // Quem recebe o email
  subject: "assunto teste",
  text: "variável com a mensagem teste",
  // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode);
    console.log(response[0].headers);
  })
  .catch((error) => {
    console.error(error);
  });
