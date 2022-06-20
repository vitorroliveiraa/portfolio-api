require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/contact", (req, res) => {
  const contactDetails = req.body.contact;

  const msg = {
    to: process.env.SENDER_GMAIL, // Quem recebe o email
    from: {
      name: "Vítor Oliveira - DEV",
      email: process.env.VERIFIED_DESTINATION_EMAIL,
    }, // Quem está enviando
    subject: contactDetails.subject,
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <style>
          body {
            font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
              "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
              "Segoe UI Symbol", "Noto Color Emoji";
            background-color: #dee2e6d2;
          }
        </style>

        <title>Document</title>
      </head>

      <body
        style="
          padding: 0.25rem;
          width: 100%;
          max-width: 600px;
          margin: auto;
        "
      >
        <main>
          <div
            style="
              background-color: #17212a;
              border-radius: 6px;
            "
          >
            <h4
              style="
                color: white;
                padding: 10px 0px 0px 10px;
                margin: 0;
                font-size: 1.1rem;
              "
            >
              Nome:
            </h4>
            <p
              style="
                color: white;
                padding: 0px 0px 0px 10px;
                margin-top: 0;
                margin-bottom: 0.50rem;
                font-size: 1rem;
              "
            >
              ${contactDetails.name}
            </p>

            <h4
              style="
                color: white;
                padding: 0px 0px 0px 10px;
                margin: 0;
                font-size: 1.1rem;
              "
            >
              Assunto:
            </h4>
            <p
              style="
                color: white;
                padding: 0px 0px 0px 10px;
                margin-top: 0;
                margin-bottom: 0.50rem;
                font-size: 1rem;
              "
            >
              ${contactDetails.subject}
            </p>

            <h4
              style="
                color: white;
                padding: 0px 0px 0px 10px;
                margin: 0;
                font-size: 1.1rem;
              "
            >
              Remetente:
            </h4>
            <p
              style="
                color: white;
                padding: 0px 0px 0px 10px;
                margin-top: 0;
                margin-bottom: 0.50rem;
                font-size: 1rem;
              "
            >
              ${contactDetails.email}
            </p>

            <p style="border-bottom: 1px solid #618cb2b1; margin: 10px"></p>

            <p
              style="
                color: white;
                padding: 10px;
                margin-top: 0rem;
                font-size: 1rem;
                line-height: 1.4;
              "
            >
              ${contactDetails.message}
            </p>
          </div>
        </main>
      </body>
    </html>
    `,
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);

      console.info("Email sent!");
      res.status(200).send("Email successfully sent");
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("Failed to send email");
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`Server started on http://localhost:${port}`);
  console.log("------------------------------------------");
});
