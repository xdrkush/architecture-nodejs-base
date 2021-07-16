/*
 * Controller
 *************/
module.exports = {
    get: (req, res, next) => {
        // Définition de la récupération de nos cookie
        const CSession = req.cookies.Session,
            CPtiGato = req.cookies.ptiGato,
            CCookie = req.cookies.Cookie;

        // Check des log //
        // console.log('Page Home')
        console.log('1')
        console.log(req.signedCookies)
        // console.log('2')
        // console.log(CSession)
        // console.log('3')
        // console.log(CPtiGato)
        // console.log('4')
        // console.log(CCookie)

        // Si on a pas le cookie CSession alors on rédirige sur la racine '/'
        if (!CSession) res.redirect('/')
        // Si on le cooki CSession & CPtiGato & CCookie
        else if (CSession && CPtiGato && CCookie) {
            console.log('Tout les cookies !')
            res.render('home', {
                // Les variable que l'on renvoit sur le front
                cook: CCookie,
                allCookie: 'Tous les cookies, la confiance est parmis nous !',
                idAllCookie: 'loveCookie',
                CSession: 'Vous avez le cookie de la session ',
                CPtiGato: 'et le cookie "ptiGato "',
                CCookie: 'et le cookie "cookie "'
            })
            // Si on a le cookie CSession & ( CPtiGato || CCookie )
        } else if (CSession && CPtiGato || CCookie) {
            // Si on a le cookie CSession & CPtiGato
            if (CPtiGato) {
                console.log('Session + CPtigato')
                res.render('home', {
                    // Les variable que l'on renvoit sur le front
                    CSession: 'Vous avez le cookie de la session ',
                    CPtiGato: 'et le cookie "ptiGato !"'
                })
                // Si on a le cookie CSession & CCookie
            } else if (CCookie) {
                console.log('Session + CCookie')
                res.render('home', {
                    // Les variable que l'on renvoit sur le front
                    CSession: 'Vous avez le cookie de la session ',
                    CCookie: 'et le cookie "cookie !"'
                })
            } else res.redirect('/')

            // Sinon
        } else {
            console.log('Cookie Session Seulement')
            res.render('home', {
                // Les variable que l'on renvoit sur le front
                CSession: 'Vous avez le cookie de la session '
            })
        }
    }
}