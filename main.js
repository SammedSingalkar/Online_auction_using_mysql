const express = require('express')
const path  = require('path')
const ejs = require('ejs')
var bodyParser = require('body-parser');
var mysql = require("mysql");
const session = require('express-session');
const nodemailer = require('nodemailer')
let alert = require('alert'); 

var router = express.Router()

var app = express()
app.set('view engine','ejs')
app.use(express.static(__dirname));
app.use(express.urlencoded())
// app.use(express.urlencoded({ extended: true }));

// app.use('/api',router)
app.use('/', router);


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Iamsammed@12",
    database: "online_auction",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to Database!");
  });
  
router.route('/')
.get((req,res)=>{
    res.render('index')
});

router.route('/about')
.get((req,res)=>{
    res.render('about_us')
});

router.route('/privacy_&_policy')
.get((req,res)=>{
    res.render('privacy_&_policy')
});

router.route('/terms_&_conditions')
.get( (req,res)=>{
    res.render('Terms_&_Conditions')
});

router.route('/contact')
.get((req,res)=>{
    let email = 'sammedsingalkar@gmail.com';
    let address = 'WIT Boys Hostel, Solapur';
    let number = 8759487525;
    res.render('contact', {email,address,number});
});

router.route('/register')
.get((req,res)=>{
    // let
    res.render('register')
});

router.route('/signin')
.get((req,res)=>{
    
    res.render('signin',{message:""})
})
.post((req,res)=>{
    let email = req.body.email;
    const password = req.body.password;
    // console.log(email, password);
    con.query(
      `SELECT * FROM user WHERE Email='${email}'`,
      (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
          if (password === result[0].Password) {
            // Set session data
            // console.log(req.session);
            // var email = result[0]
            // req.session.user = email;
            // req.session.isLoggedIn = true;
            res.redirect("/profile");
          } else {
            res.render("signin", { message: "password is wrong" });
          }
        } else {
          res.render("signin", { message: "User Not Found" });
        }
      }
    );
})
.post((req,res)=>{
    var email = req.body.email;
    let password = req.body.password;
    var print = `Email is ${email}  Password is ${password}`
    console.log(print)
    res.redirect('/profile')
})



router.route('/profile')
.get((req,res)=>{
    email = "sammedsingalkar@gmail.com"
    con.query("SELECT * FROM user where Email = ?", [email], (err, result) => {
        if (err) throw err;
    
        res.render('user_content/profile',{result:result})
      });    
});

router.route('/bid')
.get((req,res)=>{
    res.render('user_content/bid');
});

router.route('/notifications')
.get((req,res)=>{
    res.render('Notifications');
});

router.route('/notify')
.get((req,res)=>{
    res.render('user_content/notifications')
})

router.route('/list_product')
.get((req,res)=>{
    res.render('user_content/list_product')
});


router.route('/selling_history')
.get((req,res)=>{
    // res.sendFile(path.join(__dirname+'/templates/user_content/selling_history.html'))
    res.render('user_content/selling_history')
});



router.route('/purchases')
.get((req,res)=>{
    res.render('user_content/purchases')
});

router.route('/wishlist')
.get((req,res)=>{
    res.render('user_content/wishlist')
});

router.route('/product_detail')
.get((req,res)=>{
    res.render('user_content/product_detail')
});


app.listen(3000, function(){
    console.log("Server Started")
})