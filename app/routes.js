module.exports = function(app, passport, db, ObjectId,moment, Nexmo,socketio) {

  // normal routes ===============================================================

  // This will open to a page that will give the user the option to go to dictionary or sign in to their account
  app.get('/', function(req, res) {
    res.render('login.ejs');
  });
  // PROFILE SECTION =========================
  // This route brings the user to their profile once they have successfully logged in and shows them
  app.get('/mood', isLoggedIn, function(req, res) {
    // const presentUser = req.user._id
    db.collection('patientVoice').find({made: new ObjectId(req.user._id)}).toArray((err, result) => {
      if (err) return console.log(err)
      console.table(result);
      res.render('index.ejs', {
        user : req.user,
        patientResults: result
      })
    })
  });

  app.get('/userEntries', isLoggedIn, function(req, res) {
      db.collection('patientVoice').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('userEntries.ejs', {
          user : req.user,
          moodEntries: result,
          veryHappyCount : result.filter((entry) => entry.mood === '5').length,
          happyCount:result.filter((entry) => entry.mood === '4').length,
          neutralCount:result.filter((entry) => entry.mood === '3').length,
          sadCount:result.filter((entry) => entry.mood === '2').length,
          verySadCount:result.filter((entry) => entry.mood === '1').length
        })
      })
  });


  // Once the user logouts , the page goes to the login page
  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  // ===================================================







  // PROFILE ROUTES
  // This request grabs the index.ejs and displays the page along with an object of the results
  // app.get('/welcome', (req, res) => {
  //   db.collection('slangEntry').find().toArray((err, result) => {
  //     if (err) return console.log(err)
  //     console.table(result);
  //     res.render('index.ejs', {slangResults: result})
  //   })
  // })
  // app.post('/searchWord', (req,res)=>{
  //   const word = req.body.userWord;
  // console.log("hi")
  // console.log(`The word is ${word}`);
  // db.collection('slangEntry').find({userWord: new RegExp('^' + word + '$', 'i')}).toArray((err, result) => {
  //   if (err) return console.log(err)
  // console.log(Array.isArray(result))
  // console.log(result);
  //     console.log(result[0].userMeaning);
  //     res.render('index.ejs', {slangResults: result})
  //   })
  // })




  // Option for feelings page (home)
  app.post('/mood', (req, res) => {
    // if(req,body.number.length>0)
    const patientVoice= {
      made: req.user._id,
      date: moment().format('LLLL'),
      mood: req.body.mood,
      feelingsReasoning: req.body.feelingsReasoning,
      painQuestionOption:req.body.painQuestionOption,
      painLocation: req.body.painLocation,
      explainPain: req.body.explainPain,
      extraInfo: req.body.extraInfo,
      appt: req.body.appt,
      number: parseInt(req.body.number)
    }

    const nexmo = new Nexmo({
      apiKey: '0c61115a',
      apiSecret: 'WRYKwYPtXYAu3yFi',
    },{debug:true });


    const numberFrom = '17607339142'
    const to = '18572666012'
    const text = 'Please set your appointment'

    console.log('Nexmo!!!', nexmo);

    nexmo.message.sendSms(numberFrom, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })


    db.collection('patientVoice').save(patientVoice, (err, result) => {
      console.log("Inserted Id here:", patientVoice);

      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/userEntries')
    })
  })


  // This updates our browser to retieve the definition after the matched word is found in the document of the collection. The server will look for the user word, once it finds the user's word, it updates it with the desired value of userMeaning. In this case, it will not create another document since our upsert is set to true is there is a match.
  app.put('/userEntries', (req, res) => {
    db.collection('patientVoice')
    .findOneAndUpdate({made: req.user._id, date:req.body.date
}, {
      $set: {
        extraInfo: req.body.extraInfo,
        painLocation: req.body.painLocation,
      }
    },
    {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })



//
// NEXMO SMS CODE =========================
//     Init NEXMO


    const nexmoo = new Nexmo({
      apiKey: '0c61115a',
      apiSecret: 'WRYKwYPtXYAu3yFi',
    },{debug:true });

    // const from = '17607339142';
    // const to = '18572666012';
    // const text = 'Hello from Nexmo';
    //
    // nexmo.message.sendSms(from, to, text);


    //send text reminders to users
    app.post('/userEntries', (req, res) => {
      console.log('this fires')
      res.send(req.body);
    //   const number = req.body.number;
    //
    //   const text = req.body.text;
    //
    //   nexmo.message.sendSms(
    //     '17607339142', number, text, {
    //       type: 'unicode'
    //     },
    //     (err, responseData) => {
    //       if (err) {
    //       return console.log(err);
    //     }else{
    //       console.dir(responseData);
    //     }
    //   })
    // });

    const from = '17607339142'
    const to = '18572666012'
    const text = 'Please set your appointment'

    nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
  })



  // this finds all of the properties,once it is a match, it then deletes them
  app.delete('/userEntries', (req, res) => {
    (req.body)
    var uId = ObjectId(req.session.passport.user)
    db.collection('patientVoice').findOneAndDelete({_id:uId,date:req.body.date,extraInfo:req.body.extraInfo}, (err, result) => {
      if (err) return res.send(500, err)
        res.send('Message deleted!')
    })
  })

  // ===================================================================
  //AUTHENTICATE (FIRST LOGIN)  ==================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('login.ejs', { slangEntry: req.flash('loginMessage')});
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/mood', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));



  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { patientResults: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/mood', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));


  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/mood');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
  return next();

  res.redirect('/');
}
