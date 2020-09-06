const admin = require("firebase-admin");

module.exports = (req, res) => {
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: "Phone and code must be provided" });
  }
  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const code = parseInt(req.body.code);

  admin
    .auth()
    .getUser(phone)
    .then(() => {
      const ref = admin.firestore().collection("users").doc(phone);
      ref
        .get()
        .then((doc) => {
          const user = doc.data();
          if (user.code !== code || !user.codeValid) {
            return res.status(401).send({ error: "Code not valid" });
          }

          ref.update({ codeValid: false });

          admin
            .auth()
            .createCustomToken(phone)
            .then((token) => res.send({ token }));
        })
        .catch((error) => {
          console.log("error ", error);
          return res.status(401).send({ error });
        });
    })
    .catch((error) => res.status(401).send({ error }));
};
