module.exports = {
  clearCookie: (req, res) => {
    console.log(req.body)
    req.session.destroy(() => {
      res.clearCookie(`Session`)
      res.clearCookie(`ptiGato`)
      res.clearCookie(`Cookie`)
      // res.render('home', {
      //   clearCookie: 'Vous avez supprimer vos cookie, (sauf le cookie Session que vous avez renouvelez)'
      // })
      res.redirect('/')
    })
  },
  newCookie: async (req, res, next) => {
    console.log('test nouveau cookie')
    res.cookie('Cookie', { domain: '.coucou', path: '/coucou', secure: true, resave: false })
    // res.render('home', {
    //   newCookie: 'Un nouveau cookie "Cookie" vous à été assigné',
    //   CCookie: 'cookie "cookie"'
    // })
    res.redirect('/')
  },
  newPtiGato: async (req, res, next) => {
    res.cookie('ptiGato', { domain: '.ptiGAto', path: '/ptiGAto', secure: true, resave: false })
    // res.render('home', {
    //   newPtiGato: 'Un nouveau cookie "ptiGato" vous à été assigné',
    //   CPtiGato: 'cookie "ptiGato"'
    // })
    res.redirect('/')
  },
  cookie: (req, res, next) => {
    console.log(req.body)
    if (req.body.clearCookie) {
      console.log('1')
      req.session.destroy(() => {
        res.clearCookie(`Cookie`)
        // res.render('home', {
        //   clearCookieCookie: 'Vous avez supprimer le cookie "Cookie" !'
        // })
        res.redirect('/')
      })
    } else if (req.body.clearPtiGato) {
      console.log('2')
      req.session.destroy(() => {
        res.clearCookie(`ptiGato`)
        // res.render('home', {
        //   clearCookiePtiGato: 'Vous avez supprimer le cookie "ptiGato" !'
        // })
        res.redirect('/')
      })
    } else {
      console.log('3')
      next()
    }
  },
}