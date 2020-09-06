const admin = require("firebase-admin");

module.exports = (req, res) => {
  //Verify User Phone number
  if (!req.body.phone) {
    return res.status(422).send({ error: "Bad Input" });
  }
  // format the phone number
  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  // create new user using phone number
  admin
    .auth()
    .createUser({ uid: phone })
    .then((user) => res.send(user))
    .catch((error) => {
      console.log("error",error);
      return res.status(422).send({ error });
    });
};
