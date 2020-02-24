const nodemailer = require('nodemailer'),
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: '587',
    auth: {
      user: "jojocoin2019@gmail.com",
      pass: "jojocoin.2019$"
    }
  })

var rand,mailOptions,host,link;

module.exports = {
  test: (req, res) => {
    const mailOptions = {
      from: 'jojocoin2019@gmail.com',
      to: 'drkushikush@gmail.com',
      subject: 'Félicitation !',
      html: '<h2>Mon premier mail avec nodemailer, Successfull</h2>'
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err)
        console.log(err)
      else
        console.log(info)
        res.render('home')
    })
  },
  sendVerif: (req, res) => {
    rand = Math.floor((Math.random() * 100) + 54)
    host = req.get('host')
    link = "http://" + req.get('host') + "/verify/" + rand
    mailOptions = {
      from: 'jojocoin2019@gmail.com',
      to: 'drkushikush@gmail.com',
      subject: "Please confirm your Email account",
      rand: rand,
      html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    }
    console.log(mailOptions)
    transporter.sendMail(mailOptions, (err, res, next) => {
      if (err) {
        console.log(err)
        res.end("error")
      } else {
        console.log("Message Envoyer")
        next()
      }
    })
    res.render('home')
  },
  verifMail: (req, res) => {
    console.log(req.protocol + "://" + req.get('host'))
    console.log('Page verif' + mailOptions)
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
      console.log("Domain is matched. Information is from Authentic email")
      if (req.params.id == mailOptions.rand) {
        console.log("email is verified")
        res.end("<h1>Email " + mailOptions.to + " is been Successfully verified")
      } else {
        console.log("email is not verified")
        res.end("<h1>Bad Request</h1>")
      }
    } else {
      res.end("<h1>Request is from unknown source")
    }
  }
}