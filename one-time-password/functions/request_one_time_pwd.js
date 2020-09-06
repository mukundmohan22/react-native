const admin = require("firebase-admin");
const twilio = require("./twilio");

module.exports = (req, res) => {
  if (!req.body.phone) {
    return res.status(422).send({ error: "You must proive a phone number" });
  }
  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  admin
    .auth()
    .getUser(phone)
    .then((userRecords) => {
      const code = Math.floor(Math.random() * 8999 + 1000);

      twilio.messages.create(
        {
          body: `Your code is ${code}`,
          to: `+91${phone}`,
          from: "+15102579857",
        },
        (error) => {
          if (error) {
            return res.status(401).send({ error });
          }
          admin
            .firestore()
            .collection("users")
            .doc(phone)
            .update({ code, codeValid: true })
            .then(() => {
              return res.send({ success: true });
            })
            .catch(() => {
              admin
                .firestore()
                .collection("users")
                .doc(phone)
                .set({ code, codeValid: true })
                .then(() => {
                  return res.send({ success: true });
                })
                .catch((error) => {
                  return res.status(401).send({ error });
                });
            });
        }
      );
    })
    .catch((error) => {
      res.status(401).send({ error });
    });
};
