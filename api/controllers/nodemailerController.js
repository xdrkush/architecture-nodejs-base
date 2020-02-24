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

module.exports = {
  test: (req, res, next) => {
    const mailOptions = {
      from: 'jojocoin2019@gmail.com',
      to: 'drkushikush@gmail.com',
      subject: 'Félicitation !',
      html: '<h2>Mon premier mail avec nodemailer, Successfull</h2>'
    }

    transporter.sendMail(mailOptions, function(err, info) {
      if (err)
        console.log(err)
      else
        console.log(info)
        res.redirect('/')
    })
    
  }
}
