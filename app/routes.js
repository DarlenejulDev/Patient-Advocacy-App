module.exports = function(app, passport, db, ObjectId) {

  // normal routes ===============================================================

  // This will open to a page that will give the user the option to go to dictionary or sign in to their account
  app.get('/', function(req, res) {
    res.render('login.ejs');
  });
  // PROFILE SECTION =========================
  // This route brings the user to their profile once they have successfully logged in and shows them
  app.get('/mood', isLoggedIn, function(req, res) {
    // const presentUser = req.user._id
    console.log(req.user._id)
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

  // This takes the user's information from the form and saves it into the database.Then it goes to the home route which redisplays the page with the new information.
  // app.get('/feelings', function(req, res) {
  //   res.render('feelings.ejs',{VoiceId:req.query.VoiceId});
  // });
  // app.get('/painQuestionForm', function(req, res) {
  //   res.render('painQuestion.ejs',{VoiceId:req.query.VoiceId});
  // });
  // app.get('/explainPainForm', function(req, res) {
  //   res.render('explainPain.ejs',{VoiceId:req.query.VoiceId});
  // });
  // app.get('/extraForm', function(req, res) {
  //   res.render('extra.ejs',{VoiceId:req.query.VoiceId});
  // });
  // app.get('/apptForm', function(req, res) {
  //   res.render('appt.ejs',{VoiceId:req.query.VoiceId});
  // });


  // Option for feelings page (home)
  app.post('/mood', (req, res) => {
    const patientVoice= {
      date: new Date(),
      mood: req.body.mood,
      made: req.user._id,
      feelingsReasoning: req.body.feelingsReasoning,
      painQuestionOption:req.body.painQuestionOption,
      painLocation: req.body.painLocation,
      explainPain: req.body.explainPain,
      extraInfo: req.body.extraInfo,
      appt: req.body.appt,
    }
    db.collection('patientVoice').insert(patientVoice, (err, result) => {
      console.log("Inserted Id here:", patientVoice);

      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/userEntries')
    })
  })


  // This updates our browser to retieve the definition after the matched word is found in the document of the collection. The server will look for the user word, once it finds the user's word, it updates it with the desired value of userMeaning. In this case, it will not create another document since our upsert is set to true is there is a match.
  app.put('/mood', (req, res) => { console.log('hello')
    db.collection('patientVoice')
    .findOneAndUpdate({made: req.user._id,
    feelingsReasoning: req.body.feelingsReasoning,  explainPain: req.body.explainPain,
      extraInfo: req.body.extraInfo,
      appt: req.body.appt}, {
      $set: {

        painLocation: req.body.painLocation,
        mood: req.body.mood
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
  app.put('/mood', (req, res) => { console.log('hello')
    db.collection('patientVoice')
    .findOneAndUpdate({made: req.user._id,
    feelingsReasoning: req.body.feelingsReasoning,  explainPain: req.body.explainPain,
      extraInfo: req.body.extraInfo,
      }, {
      $set: {
        appt: req.body.appt

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


  // ========================================
  // EX: db.slangEntry(collection name).find({})(empty query search)
  // app.put('/searchWord', (req, res) => { console.log('hello')
  //   db.collection('slangEntry')
  //   .find({userChoiceWord: req.body.userChoiceWord, userWord: req.body.userWord}, {
  //     $set: {
  //
  //     }
  //   },
  //   {
  //     sort: {_id: -1},
  //     upsert: true
  //   }, (err, result) => {
  //     if (err) return res.send(err)
  //     res.send(result)
  //   }).forEach(printjson);
  // })
  // {

  // })
  // })

  // this finds all of the properties,once it is a match, it then deletes them
  app.delete('/mood', (req, res) => { console.log(req.body)
    db.collection('patientVoice').findOneAndDelete({userWord: req.body.userWord, userMeaning: req.body.userMeaning}, (err, result) => {
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
    res.render('signup.ejs', { message: req.flash('signupMessage') });
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
    user.local.pNumber  = undefined;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/mood');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  console.log(req)
  if (req.isAuthenticated())
  return next();

  res.redirect('/');
}
