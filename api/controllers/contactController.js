/*
 * Controller
 *************/ 
module.exports = {
    // Method Get
    get: (req, res) => {
        console.log('Cookies: ', req.cookies.Cookie)
        console.log('Cookies: ', req.cookies)
        if (req.cookies.ptiGato) {
            console.log('Mon Super cookie')
            res.render('contact', {
                // Condition ternaire pour check les cookies
                CPtiGato: (req.cookies.ptiGato) ? 'et le cookie "ptiGato "' : false
            })
        }
        else res.render('contact')
    }
}