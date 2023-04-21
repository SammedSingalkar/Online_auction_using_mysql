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
  



router.use(session({
  secret: 'teamwitonlineauction',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false ,
     maxAge: 360000000 } // Session expires in 100 hour
}));

router.route('/register')
.get((req,res)=>{
    res.render('register')
})
.post((req,res)=>{
  const name = req.body.name;
  const email = req.body.email;
  const aadhar = req.body.aadhar;
  const mobile = req.body.mobile;
  const dob = req.body.date;
  const address = req.body.address;
  const random_number = Math.floor(Math.random() * 100);
  const userid = name.slice(0,5) + '@' +  random_number;
  const password = req.body.password;

  const sql = `INSERT INTO user (Name, Email, Aadhar_Card, Mobile_No, DOB, User_Id, Password, Shipping_Add) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

const values = [name, email, aadhar, mobile, dob, userid, password, address];

con.query(sql, values, (err, result) => {
  if (err) throw err;
  alert("Data inserted successfully");
  res.redirect('/signin')
});
})


router.route('/signin')
.get((req,res)=>{
    if (!req.session.isLoggedIn) {
    res.render('signin',{message:""})
    }
    else{
        res.redirect('/profile')
    }
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
            var email = result[0]
            req.session.user = email;
            req.session.isLoggedIn = true;
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

router.route('/')
  .get((req, res) => {
    if (!req.session.isLoggedIn) {
      con.query("SELECT * FROM item ", (err, result) => {
        if (err) throw err;
        res.render('index', { msg: "signin", link: "/signin",link1:"/signin", result: result })
      })
    } else {
      con.query("SELECT * FROM item ", (err, result) => {
        if (err) throw err;
        res.render('index', { msg: "logout", link: "/logout",link1:"/list_product", result: result })
      })
      }
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

router.route('/all/categories')
.get((req,res)=>{
  con.query("SELECT category, COUNT(*) as count FROM item GROUP BY category", (err, result) => {
    if (err) throw err;
    res.render('Categories', { result: result });
  });
});

router.route('/profile')
.get((req,res)=>{
    if (!req.session.isLoggedIn) {
        res.redirect('/signin');
      }
    else{ 
    email = req.session.user.Email
    user_id = req.session.user.User_Id
    con.query("SELECT * FROM user where Email = ?", [email], (err, result) => {
        if (err) throw err;
        res.render('user_content/profile',{result:result})
      });    
    }
});

router.route('/wishlist')
.get((req,res)=>{
    if (!req.session.isLoggedIn) {
        res.redirect('/signin');
      }
    else{ 
    user_id = req.session.user.User_Id
    con.query("SELECT * FROM watchlist JOIN item ON watchlist.Item_Id = item.Item_Id where User_Id  = ?", [user_id], (err, result) => {
        if (err) throw err;
        res.render('user_content/wishlist',{result:result})
      }); 
    }
});


router.route('/bid')
.get((req,res)=>{
    if (!req.session.isLoggedIn) {
        res.redirect('/signin');
      }
    else{ 
    res.render('user_content/bid');
    }
});

router.route('/notifications')
.get((req,res)=>{
    if (!req.session.isLoggedIn) {
        res.redirect('/signin');
      }
    else{ 
    user_id = req.session.user.User_Id
    con.query("SELECT * FROM notification where User_Id = ?", [user_id], (err, result) => {
        if (err) throw err;
        res.render('Notifications',{result:result})
      });
    }  
});

router.route('/notify')
.get((req,res)=>{
    if (!req.session.isLoggedIn) {
        res.redirect('/signin');
      }
    else{ 
    user_id = req.session.user.User_Id
    con.query("SELECT * FROM notification where User_Id = ?", [user_id], (err, result) => {
        if (err) throw err;
        res.render('user_content/notifications',{result:result})
      });
    }  
})

router.route('/list_product')
.get((req,res)=>{
    res.render('user_content/list_product')
});


router.route('/selling_history')
.get((req,res)=>{
    // res.sendFile(path.join(__dirname+'/templates/user_content/selling_history.html'))
    if (!req.session.isLoggedIn) {
        res.redirect('/signin');
      }
    else{ 
        user_id = req.session.user.User_Id
        con.query("SELECT * FROM sell_history JOIN item ON sell_history.Item_Id = item.Item_Id and sell_history.Seller_Id = item.Seller_Id where sell_history.Seller_Id = ?", [user_id], (err, result) => {
            if (err) throw err;
            res.render('user_content/selling_history',{result:result})
          });
    }
});



router.route('/purchases')
.get((req,res)=>{
    res.render('user_content/purchases')
});



router.route('/product_detail/:id')
.get((req,res)=>{
    res.render('product_detail')
});

router.route('/logout')
  .get((req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  });


app.listen(3000, function(){
    console.log("Server Started")
})