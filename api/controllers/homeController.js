module.exports = {
  get: (req, res, next) => {
    const CSession = req.cookies.Session
        , CPtiGato = req.cookies.ptiGato
        , CCookie  = req.cookies.Cookie

        console.log('Page Home')
        console.log('1')
        console.log(req.cookies)
        console.log('2')
        console.log(CSession)
        console.log('3')
        console.log(CPtiGato)
        console.log('4')
        console.log(CCookie)

    if (!CSession) res.redirect('/')
    else if (CSession && CPtiGato && CCookie) {
        console.log('Tout les cookies !')
        res.render('home', {
            allCookie: 'Tous les cookies, la confiance est parmis nous !',
            CSession: 'cookie de la session',
            CPtiGato: 'cookie "ptiGato"',
            CCookie: 'cookie "cookie"'
        })

    } else if (CSession && CPtiGato || CCookie) {
        if (CPtiGato) {
            console.log('Session + CPtigato')
            res.render('home', {
                CSession: 'cookie de la session',
                CPtiGato: 'cookie "ptiGato"'
            })

        } else if (CCookie) {
            console.log('Session + CCookie')
            res.render('home', {
                CSession: 'cookie de la session',
                CCookie: 'cookie "cookie"'
            })
        } else res.redirect('/')

    } else {
        console.log('Cookie Session Seulement')
        res.render('home', {
            CSession: 'cookie de la session'
        })

    }
  },
  post: (req, res) => {
    console.log('coucou');

  }
}