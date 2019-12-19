const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'public'));




// const adminData = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminData.routes);
// app.use(shopRoutes);
const emailController = require('./controllers/contactEmail')

app.get("/robots.txt", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'robots.txt'));
});

// app.use((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

// send email from form
app.post('/contact', emailController.sendEmailForm, (req, res) => {
    res.redirect('/')
}

)

app.use("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    // res.sendFile(fs.readFileSync(path.join(__dirname, 'index.html')));
});

// testing

app.listen(3001);
