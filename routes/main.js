// Create a new router
const express = require("express");
const router = express.Router();



// Define our data
var shopData = {
  shopName: 'Drinks R Us',
  productCategories: ['Beer', 'Wine', 'Soft Drinks', 'Hot Drinks'],
  shops: [
    { id: 1, name: 'Stratford', manager: 'Aisha Khan',  address: '12 High St, Stratford, London E15 1XY' },
    { id: 2, name: 'Peckham',   manager: 'James Mchardy', address: '88 Rye Ln, Peckham, London SE15 5DQ' },
    { id: 3, name: 'Greenwich', manager: 'Emma Patel',  address: '5 Nelson Rd, Greenwich, London SE10 9JB' }
  ]
};
      

// Handle the main routes
router.get('/index',function(req,res){
    res.render('index.ejs', shopData)
 });


router.get('/about',function (req, res){
    res.render('about.ejs', shopData)
});

router.get('/search',function (req,res){
    res.render('search.ejs', shopData)
});

router.get('/search_result', function (req, res) {
    // TODO: search in the database
    res.send("You searched for " + req.query.search_text + " in " + req.query.category);
 });

 router.get('/search_result', (req, res) => {
    const { search_text, category } = req.query;   
    res.json({ search_text, category });           
  });

  router.get("/register", (req,res) => {
    res.render("register.ejs",  shopData); 
}); 
 
router.post('/registered', (req, res) => {
    const { first, last, email } = req.body;
  
    // simple robust-enough email regex for coursework
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;
  
    if (!emailRegex.test(email)) {
      return res.status(400).send('Please enter a valid email address.');
    }
  
    res.send(`Hello ${first} ${last} you are now registered! We will send an email to you at ${email}`);
  });

// --- Survey form ---
// --- Survey form (GET) ---
router.get('/survey', (req, res) => {
  res.render('survey.ejs', {
    ...shopData,
    errors: [],
    form: { firstName:'', surname:'', email:'', age:'', drinks:[], isStudent:false }
  });
});


// --- Survey submit ---
router.post('/survey', (req, res) => {
  const { firstName, surname, email, age } = req.body;

  // drinks may be a single string or an array (if multiple boxes checked)
  let drinks = req.body.drinks || [];
  if (!Array.isArray(drinks)) drinks = [drinks];

  // checkbox sends 'on' when checked; otherwise it's undefined
  const isStudent = req.body.student === 'on';

  // (Optional) super-light validation
  const errors = [];
  if (!firstName) errors.push('First name is required.');
  if (!surname) errors.push('Surname is required.');
  if (!email) errors.push('Email is required.');
  if (!age || Number.isNaN(parseInt(age))) errors.push('Age must be a number.');

  if (errors.length) {
    return res.status(400).render('survey.ejs', {
      ...shopData,
      errors,
      // re-fill the form with what the user typed
      form: { firstName, surname, email, age, drinks, isStudent }
    });
  }

  res.render('survey_result.ejs', {
    shopName: shopData.shopName,
    firstName, surname, email,
    age: parseInt(age, 10),
    drinks,
    isStudent
  });
});


// Export the router object so index.js can access it
module.exports = router;
