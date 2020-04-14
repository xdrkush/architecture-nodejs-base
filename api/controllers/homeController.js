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
            cook: CCookie,
            allCookie: 'Tous les cookies, la confiance est parmis nous !',
            idAllCookie: 'loveCookie',
            CSession: 'Vous avez le cookie de la session ',
            CPtiGato: 'et le cookie "ptiGato "',
            CCookie: 'et le cookie "cookie "'
        })

    } else if (CSession && CPtiGato || CCookie) {
        if (CPtiGato) {
            console.log('Session + CPtigato')
            res.render('home', {
                CSession: 'Vous avez le cookie de la session ',
                CPtiGato: 'et le cookie "ptiGato !"'
            })

        } else if (CCookie) {
            console.log('Session + CCookie')
            res.render('home', {
                CSession: 'Vous avez le cookie de la session ',
                CCookie: 'et le cookie "cookie !"'
            })
        } else res.redirect('/')

    } else {
        console.log('Cookie Session Seulement')
        res.render('home', {
            CSession: 'Vous avez le cookie de la session '
        })
    }
  },
  post: (req, res) => {
    console.log('coucou');

  }
}