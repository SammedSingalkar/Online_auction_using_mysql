const express = require("express");
const path = require("path");
const ejs = require("ejs");
var bodyParser = require("body-parser");
var mysql = require("mysql");
const session = require("express-session");
const nodemailer = require("nodemailer");
let alert = require("alert");
const fs = require("fs");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const util = require("util");
// const query = util.promisify(con.query).bind(con);

var router = express.Router();

var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));

// app.use('/api',router)

app.use("/", router);
router.use(fileUpload());

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to Database!");
});

router.use(
  session({
    secret: "teamwitonlineauction",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 360000000,
    }, // Session expires in 100 hour
  })
);

router
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const aadhar = req.body.aadhar;
    const mobile = req.body.mobile;
    const dob = req.body.date;
    const address = req.body.address;
    const random_number = Math.floor(Math.random() * 100);
    const userid = name.slice(0, 5) + "@" + random_number;
    const password = req.body.password;

    const sql = `INSERT INTO user (Name, Email, Aadhar_Card, Mobile_No, DOB, User_Id, Password, Shipping_Add) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      name,
      email,
      aadhar,
      mobile,
      dob,
      userid,
      password,
      address,
    ];

    con.query(sql, values, (err, result) => {
      if (err) throw err;
      alert("Data inserted successfully");
      res.redirect("/signin");
    });
  });

router
  .route("/signin")
  .get((req, res) => {
    if (!req.session.isLoggedIn) {
      res.render("signin", { message: "" });
    } else {
      res.redirect("/profile");
    }
  })
  .post((req, res) => {
    let email = req.body.email;
    const password = req.body.password;
    // console.log(email, password);
    con.query(`SELECT * FROM user WHERE Email='${email}'`, (error, result) => {
      if (error) throw error;
      if (result.length > 0) {
        if (password === result[0].Password) {
          // Set session data
          // console.log(req.session);
          var email = result[0];
          req.session.user = email;
          req.session.isLoggedIn = true;
          res.redirect("/profile");
        } else {
          res.render("signin", { message: "password is wrong" });
        }
      } else {
        res.render("signin", { message: "User Not Found" });
      }
    });
  });

router.route("/").get((req, res) => {
  if (!req.session.isLoggedIn) {
    con.query("SELECT * FROM item ", (err, result) => {
      if (err) throw err;
      res.render("index", {
        msg: "signin",
        link: "/signin",
        link1: "/signin",
        result: result,
      });
    });
  } else {
    con.query("SELECT * FROM item ", (err, result) => {
      if (err) throw err;
      res.render("index", {
        msg: "logout",
        link: "/logout",
        link1: "/list_product",
        result: result,
      });
    });
  }
});

router.route("/about").get((req, res) => {
  res.render("about_us");
});

router.route("/privacy_&_policy").get((req, res) => {
  res.render("privacy_&_policy");
});

router.route("/terms_&_conditions").get((req, res) => {
  res.render("Terms_&_Conditions");
});

router.route("/contact").get((req, res) => {
  let email = "sammedsingalkar@gmail.com";
  let address = "WIT Boys Hostel, Solapur";
  let number = 8759487525;
  res.render("contact", { email, address, number });
});

router.route("/all/categories").get((req, res) => {
  con.query(
    "SELECT category, COUNT(*) as count FROM item GROUP BY category",
    (err, result) => {
      if (err) throw err;
      res.render("Categories", { result: result });
    }
  );
});

router.route("/category_prodcuts").get((req, res) => {
  res.render("category_detail");
});

router
  .route("/profile")
  .get((req, res) => {
    if (!req.session.isLoggedIn) {
      res.redirect("/signin");
    } else {
      const email = req.session.user.Email;
      con.query(
        "SELECT * FROM user WHERE Email = ?",
        [email],
        (err, result) => {
          if (err) throw err;
          res.render("user_content/profile", { result: result });
        }
      );
    }
  })
  .post((req, res) => {
    const name = req.body.name;
    const addhar = req.body.addhar;
    const mobile = req.body.number;
    const DOB = req.body.dob;
    const address = req.body.address;
    const password = req.body.password;
    const email = req.session.user.Email;
    con.query(
      "UPDATE user SET Name=?, Aadhar_Card=?, Mobile_No=?, DOB=?, Shipping_Add=?, Password=? WHERE Email=?",
      [name, addhar, mobile, DOB, address, password, email],
      (err, result) => {
        if (err) throw err;
        console.log("Profile updated successfully");
        // res.render('user_content/profile', {readonly: 'readonly', result: result})
        res.redirect("/profile");
      }
    );
  });

router
  .route("/wishlist")
  .get((req, res) => {
    if (!req.session.isLoggedIn) {
      res.redirect("/signin");
    } else {
      user_id = req.session.user.User_Id;
      con.query(
        "SELECT * FROM watchlist JOIN item ON watchlist.Item_Id = item.Item_Id where User_Id  = ?",
        [user_id],
        (err, result) => {
          if (err) throw err;
          res.render("user_content/wishlist", { result: result });
        }
      );
    }
  })
  .post((req, res) => {
    con.query("Delete from watchlist", (err, result) => {
      if (err) throw err;
      alert("Deleted Successfullt");
      res.redirect("/wishlist");
    });
  });

router.route("/wishlist/:id").post((req, res) => {
  var id = req.params.id;
  con.query(
    "Delete from watchlist where WatchList_Id = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      alert("Deleted Successfullt");
      res.redirect("/wishlist");
    }
  );
});

// router.route("/addwishlist/:id")

router.route("/bid").get((req, res) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/signin");
  } else {
    res.render("user_content/bid");
  }
});

router.route("/notifications").get((req, res) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/signin");
  } else {
    user_id = req.session.user.User_Id;
    con.query(
      "SELECT * FROM notification where User_Id = ?",
      [user_id],
      (err, result) => {
        if (err) throw err;
        res.render("Notifications", { result: result });
      }
    );
  }
});

router.route("/notify").get((req, res) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/signin");
  } else {
    user_id = req.session.user.User_Id;
    con.query(
      "SELECT * FROM notification where User_Id = ?",
      [user_id],
      (err, result) => {
        if (err) throw err;
        res.render("user_content/notifications", { result: result });
      }
    );
  }
});

router.route("/notify/:id").post((req, res) => {
  const id = req.params.id;
  con.query(
    "Delete from notification where Noti_Id = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      alert("Deleted Successfullt");
      res.redirect("/notify");
    }
  );
});

router
  .route("/list_product")
  .get((req, res) => {
    con.query("SELECT DISTINCT Category FROM item", (err, result) => {
      if (err) throw err;
      res.render("user_content/list_product", { result: result });
    });
  })
  .post((req, res) => {
    if (!req.session.isLoggedIn) {
      res.redirect("/signin");
    } else {
      const product_name = req.body.product_name;
      const product_description = req.body.product_description;
      const starting_price = req.body.starting_price;
      const status = "Not Started"; //Sold, Active, Expired, Not Started
      const current_price = starting_price;
      const seller_Id = (user_id = req.session.user.User_Id);

      const auction_starting = req.body.auction_start + ":00";
      const date = new Date(auction_starting);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      const auction_start = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      const auction_ending = req.body.auction_end + ":00";
      const date1 = new Date(auction_ending);
      const year1 = date1.getFullYear();
      const month1 = String(date1.getMonth() + 1).padStart(2, "0");
      const day1 = String(date1.getDate()).padStart(2, "0");
      const hours1 = String(date1.getHours()).padStart(2, "0");
      const minutes1 = String(date1.getMinutes()).padStart(2, "0");
      const seconds1 = String(date1.getSeconds()).padStart(2, "0");
      const auction_end = `${year1}-${month1}-${day1} ${hours1}:${minutes1}:${seconds1}`;
      const category = req.body.category;

      const img1 = req.files.product_image1
        ? req.files.product_image1.data
        : null;
      const img2 = req.files.product_image2
        ? req.files.product_image2.data
        : null;
      const img3 = req.files.product_image3
        ? req.files.product_image3.data
        : null;
      const img4 = req.files.product_image4
        ? req.files.product_image4.data
        : null;

      const sql = `INSERT INTO item (Item_Id, Item_Name, Description, Starting_Bid_Price, Status, Curr_Bid_Price, Seller_Id, Auction_Start_Time, Auction_End_Time, Category) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        null,
        product_name,
        product_description,
        starting_price,
        status,
        current_price,
        seller_Id,
        auction_start,
        auction_end,
        category,
      ];
      // Create a folder with the product name
      const folderPath = `public/images/product_images/${product_name}`;
      fs.mkdirSync(folderPath, { recursive: true });

      const buffer1 = Buffer.from(img1, "base64");
      const buffer2 = Buffer.from(img2, "base64");
      const buffer3 = Buffer.from(img3, "base64");
      const buffer4 = Buffer.from(img4, "base64");

      fs.writeFileSync(`${folderPath}/1.jpg`, buffer1);
      fs.writeFileSync(`${folderPath}/2.jpg`, buffer2);
      fs.writeFileSync(`${folderPath}/3.jpg`, buffer3);
      fs.writeFileSync(`${folderPath}/4.jpg`, buffer4);

      con.query(sql, values, (err, result) => {
        if (err) throw err;
        alert("Data inserted successfully");
        res.redirect("/list_product");
      });
    }
  });

router.route("/selling_history").get((req, res) => {
  // res.sendFile(path.join(__dirname+'/templates/user_content/selling_history.html'))
  if (!req.session.isLoggedIn) {
    res.redirect("/signin");
  } else {
    user_id = req.session.user.User_Id;
    con.query(
      "SELECT * FROM sell_history JOIN item ON sell_history.Item_Id = item.Item_Id and sell_history.Seller_Id = item.Seller_Id where sell_history.Seller_Id = ?",
      [user_id],
      (err, result) => {
        if (err) throw err;
        res.render("user_content/selling_history", { result: result });
      }
    );
  }
});

router.route("/purchases").get((req, res) => {
  res.render("user_content/purchases");
});




router
  .route("/product_detail/:id")
  .get((req, res) => {
    if (!req.session.isLoggedIn) {
      res.redirect("/signin");
    } else {
      const id = req.params.id;
      con.query("SELECT * FROM item where Item_Id = ?", [id], (err, result) => {
        if (err) throw err;
        res.render("product_detail", { result: result });
      });
    }
  })
  .post((req, res) => {
    if (!req.session.isLoggedIn) {
      res.redirect("/signin");
    } else {
      var id = req.params.id;
      var amount = req.body.amount;
      var user_id = req.session.user.User_Id;
    
      con.query(
        "SELECT Curr_Bid_Price, Seller_Id, Status, Auction_End_Time FROM item where Item_Id = ?",
        [id],
        (err, result) => {
          if (err) throw err;
          var end_time = result[0].Auction_End_Time;
          // if (end_time > current _time)
          const now = new Date();
          if (end_time > now){
          var current_price = result[0].Curr_Bid_Price;
          var status = result[0].Status;
          var seller_id = result[0].Seller_Id;
          if (status == "active") {
            if (amount > current_price) {
              con.query(
                "UPDATE item SET Curr_Bid_Price = ? WHERE Item_Id  = ?",
                [amount, id],
                (error, results, fields) => {
                  if (error) {
                    console.error(error);
                  } else {
                    alert("Bid is placed successfully");
                    con.query(
                      "SELECT bid_ID FROM bid ORDER BY bid_ID DESC LIMIT 1;",
                      (err, result) => {
                        if (err) throw err;
                       let last_Id = result[0].bid_ID;
                       let next_Id = last_Id + 1;
                        const sql = `INSERT INTO Bid (bid_ID, buyer_ID, seller_ID, item_Id, Bid_Amount, Product_Status, Date_Time) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;
                        const now = new Date();
                        const year = now.getFullYear();
                        const month = String(now.getMonth() + 1).padStart(2, '0');
                        const day = String(now.getDate()).padStart(2, '0');
                        const hour = String(now.getHours()).padStart(2, '0');
                        const minute = String(now.getMinutes()).padStart(2, '0');
                        const second = String(now.getSeconds()).padStart(2, '0');
                        const dateTimeString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
               const values = [next_Id, user_id, seller_id, id, amount, status,dateTimeString];
               con.query(sql, values, (err, result) => {
                 if (err) throw err;
                 alert("Data inserted successfully");
                 res.redirect("/product_detail/" + id);
           });
                      });
                    // res.redirect("/product_detail/" + id);
                  }
                }
              );
            } else {
              alert("Enter bigger amount than current amount");
            }
          } else if (!status == "active") {
            const a = `Bidding is ${status}`;
            alert(a);
            // res.render('/product_detial')
          }
        }
        else{
          alert("bidding is expired")
          res.redirect("/product_detail/" + id);
        }
      }
      );
    }
  });

router.route("/addwishlist/:id").post((req, res) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/signin");
  } else {
    var item_id = req.params.id;
    var user_id = req.session.user.User_Id;
    const sql = `INSERT INTO watchlist (WatchList_Id, Item_Id, User_Id) 
             VALUES (?, ?, ?)`;

    const values = [null, item_id, user_id];
    con.query(sql, values, (err, result) => {
      if (err) throw err;
      alert("Data inserted successfully");
      res.redirect("/product_detail/" + item_id);
    });
  }
});

router.route("/logout").get((req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.listen(3000, function () {
  console.log("Server Started");
});
