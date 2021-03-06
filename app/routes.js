const apikeys = require('./../config/apikeys.js');
module.exports = function(app, passport, db, ObjectId,moment) {
var THREE_HOURS = 10800000;
var accountSid = apikeys.TWILIO_ACCOUNT_SID
var authToken= apikeys.TWILIO_ACCOUNT_TOKEN
  // normal routes ===============================================================

  // This will open to a page that will give the user the option to go to sign in to their account or sign up.
  app.get('/', function(req, res) {
    res.render('login.ejs');
  });
  // PROFILE SECTION =========================
  // This route brings the doctor to their account once they have successfully logged in and shows them the list of their patients
  app.get('/mood', isLoggedIn, function(req, res) {
    if (req.user.doctor === true) {
      db.collection('users').find().toArray((err, result) => {
        let newResult = []
        for (let i = 0; i < result.length; i++) {
          if ('doctor' in result[i] === false) {
            newResult.push(result[i])
          }
        }
        res.render('doctor.ejs', {
          user : req.user,
          patients: newResult
        });
      })

    }else{
      db.collection('patientVoice').find({made: new ObjectId(req.user._id)}).toArray((err, result) => {
        if (err) return console.log(err)
        // console.table(result);
          res.render('index.ejs', {
            user : req.user,
            patientResults: result
          })
      })
    }
  });
// Date picked form, will match and  update to fulfill search
var monster = {}
  app.put('/datePick', (req, res) => {
    // Users unique id
    let id = ObjectId(req.body.query)
    const filter= {made: id}
    console.log("ID: "+id+" Log: "+ req.body.logDate);
    if(req.body.logDate){
      const dateFind=new Date(req.body.logDate)
      const dateFindNextDay= new Date(dateFind.getTime()+ 86400*1000)
      filter.date ={$gte:dateFind,$lt:dateFindNextDay}
      console.log(JSON.stringify(filter));
      console.log("DATE: "+ dateFind);
      db.collection('patientVoice').find(filter).toArray((err, result) => {
        console.log("RESULTS: "+ result);
        if (err) return console.log(err)
          monster.results = {
            query:req.query.id,
            queryId: id,
            user :req.user,
            patientInfo: result,
            moment: moment,
            veryHappyCount : result.filter((entry) => entry.mood === '5').length,
            happyCount:result.filter((entry) => entry.mood === '4').length,
            neutralCount:result.filter((entry) => entry.mood === '3').length,
            sadCount:result.filter((entry) => entry.mood === '2').length,
            verySadCount:result.filter((entry) => entry.mood === '1').length,
            leftLegPainCount: result.filter((entry) => entry.painLocation === 'Left Leg').length,
            rightLegPainCount: result.filter((entry) => entry.painLocation === 'Right Leg').length,
            rightArmPainCount: result.filter((entry) =>   entry.painLocation === 'Right Arm').length,
            leftArmPainCount: result.filter((entry) =>   entry.painLocation === 'Left Arm').length,
            headPainCount: result.filter((entry) =>   entry.painLocation === 'Head').length,
            shoulderPainCount: result.filter((entry) =>   entry.painLocation === 'Shoulder').length,
            stomachPainCount: result.filter((entry) =>   entry.painLocation === 'Stomach').length,
            hipPainCount: result.filter((entry) =>   entry.painLocation === 'Hip').length,
            rightFootPainCount: result.filter((entry) =>   entry.painLocation === 'Right Foot').length,    leftFootPainCount: result.filter((entry) =>   entry.painLocation === 'Left Foot').length,
            backPainCount: result.filter((entry) =>   entry.painLocation === 'Back').length,
          }
      })

    }
    res.send({query: req.body.query})
  })

// focuses on patient logs based on log number and mainly id of user/id of post
  app.get('/pInfo', isLoggedIn, function(req, res) {
      if(monster.results){
        res.on('finish',()=>{monster = {}});
        monster.results.query = req.query.id;
        monster.results.queryId = req.query.id;
        console.log("monster:", monster.results);
        res.render('patientInfo.ejs', monster.results)

      }else{


      const id = req.query.id
      console.log("query: " + id);
      const filter= {made: id}
      if(req.body.logDate){
        const dateFind=new Date(req.body.logDate)
        const dateFindNextDay= new Date(dateFind.getTime()+ 86400*1000)
        filter.date ={$gte:dateFind,$lt:dateFindNextDay}
        console.log(JSON.stringify(filter));
        console.log("DATE: "+ dateFind);
        db.collection('patientVoice').find(filter).toArray((err, result) => {
          console.log("RESULTS: "+ result);
          if (err) return console.log(err)
            res.render('patientInfo.ejs', {
              query:req.query.id,
              queryId: id,
              user :req.user,
              patientInfo: result,
              moment: moment,
              veryHappyCount : result.filter((entry) => entry.mood === '5').length,
              happyCount:result.filter((entry) => entry.mood === '4').length,
              neutralCount:result.filter((entry) => entry.mood === '3').length,
              sadCount:result.filter((entry) => entry.mood === '2').length,
              verySadCount:result.filter((entry) => entry.mood === '1').length,
              leftLegPainCount: result.filter((entry) => entry.painLocation === 'Left Leg').length,
              rightLegPainCount: result.filter((entry) => entry.painLocation === 'Right Leg').length,
              rightArmPainCount: result.filter((entry) =>   entry.painLocation === 'Right Arm').length,
              leftArmPainCount: result.filter((entry) =>   entry.painLocation === 'Left Arm').length,
              headPainCount: result.filter((entry) =>   entry.painLocation === 'Head').length,
              shoulderPainCount: result.filter((entry) =>   entry.painLocation === 'Shoulder').length,
              stomachPainCount: result.filter((entry) =>   entry.painLocation === 'Stomach').length,
              hipPainCount: result.filter((entry) =>   entry.painLocation === 'Hip').length,
              rightFootPainCount: result.filter((entry) =>   entry.painLocation === 'Right Foot').length,    leftFootPainCount: result.filter((entry) =>   entry.painLocation === 'Left Foot').length,
              backPainCount: result.filter((entry) =>   entry.painLocation === 'Back').length,

            })
        })
      }else{
        db.collection('patientVoice').find({made: new ObjectId(id)}).toArray((err, result) => {
          if (err) return console.log(err)
            res.render('patientInfo.ejs', {
              query:req.query.id,
              queryId: id,
              user :req.user,
              patientInfo: result,
              moment: moment,
              veryHappyCount : result.filter((entry) => entry.mood === '5').length,
              happyCount:result.filter((entry) => entry.mood === '4').length,
              neutralCount:result.filter((entry) => entry.mood === '3').length,
              sadCount:result.filter((entry) => entry.mood === '2').length,
              verySadCount:result.filter((entry) => entry.mood === '1').length,
              leftLegPainCount: result.filter((entry) => entry.painLocation === 'Left Leg').length,
              rightLegPainCount: result.filter((entry) => entry.painLocation === 'Right Leg').length,
              rightArmPainCount: result.filter((entry) =>   entry.painLocation === 'Right Arm').length,
              leftArmPainCount: result.filter((entry) =>   entry.painLocation === 'Left Arm').length,
              headPainCount: result.filter((entry) =>   entry.painLocation === 'Head').length,
              shoulderPainCount: result.filter((entry) =>   entry.painLocation === 'Shoulder').length,
              stomachPainCount: result.filter((entry) =>   entry.painLocation === 'Stomach').length,
              hipPainCount: result.filter((entry) =>   entry.painLocation === 'Hip').length,
              rightFootPainCount: result.filter((entry) =>   entry.painLocation === 'Right Foot').length,    leftFootPainCount: result.filter((entry) =>   entry.painLocation === 'Left Foot').length,
              backPainCount: result.filter((entry) =>   entry.painLocation === 'Back').length,

          })
      })
    }
  }

  });

  app.get('/userEntries', isLoggedIn, function(req, res) {
      db.collection('patientVoice').find({made:req.user._id}).toArray((err, result) => {
        if (err) return console.log(err)
        res.render('userEntries.ejs', {
          user : req.user,
          moodEntries: result,
          moment: moment,
          veryHappyCount : result.filter((entry) => entry.mood === '5').length,
          happyCount:result.filter((entry) => entry.mood === '4').length,
          neutralCount:result.filter((entry) => entry.mood === '3').length,
          sadCount:result.filter((entry) => entry.mood === '2').length,
          verySadCount:result.filter((entry) => entry.mood === '1').length,
          leftLegPainCount: result.filter((entry) => entry.painLocation === 'Left Leg').length,
          rightLegPainCount: result.filter((entry) => entry.painLocation === 'Right Leg').length,
          rightArmPainCount: result.filter((entry) =>   entry.painLocation === 'Right Arm').length,
          leftArmPainCount: result.filter((entry) =>   entry.painLocation === 'Left Arm').length,
          headPainCount: result.filter((entry) =>   entry.painLocation === 'Head').length,
          shoulderPainCount: result.filter((entry) =>   entry.painLocation === 'Shoulder').length,
          stomachPainCount: result.filter((entry) =>   entry.painLocation === 'Stomach').length,
          hipPainCount: result.filter((entry) =>   entry.painLocation === 'Hip').length,
          rightFootPainCount: result.filter((entry) =>   entry.painLocation === 'Right Foot').length,    leftFootPainCount: result.filter((entry) =>   entry.painLocation === 'Left Foot').length,
          backPainCount: result.filter((entry) =>   entry.painLocation === 'Back').length,

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
//   app.post('/docNotes', (req, res) => {
//     const id= req.query.id
//     console.log("this is the id of the log:",id);
//     const dates= req.query.logDate
//     console.log(dates)
//     let notes= {
//       doctorNotes:req.body.doctorNotes, patientLog: req.body.pId}
//     console.log(notes);
//   db.collection('doctorNotes').save(notes, (err, result)=> {
//     console.log("Succesfully saved:", notes);
//
//     if (err) return console.log(err)
//     console.log('saved to database')
//     res.redirect('/pInfo?id='+req.body.queryId)
//   })
// })
//

app.post('/docNotes', (req, res) => {
  // const id= req.query.id
  // console.log("this is the id of the log:",id);
  // const dates= req.query.logDate
  // console.log(dates)
  // let notes= {
  //   doctorNotes:req.body.doctorNotes, patientLog: req.body.pId}
  // console.log(notes);
db.collection('patientVoice').findOneAndUpdate({ _id:ObjectId(req.body.pId)
}, {
  $set: {
    doctorNotes: req.body.doctorNotes,
  }
},
{
  sort: {_id: -1},
  upsert:false
}, (err, result) => {
  if (err) return res.send(err)
  res.redirect('/pInfo?id='+req.body.queryId)
})
})



  app.post('/mood', (req, res) => {
const now= new Date()
    const patientVoice= {
      made: req.user._id,
      date: new Date(),
      mood: req.body.mood,
      feelingsReasoning: req.body.feelingsReasoning,
      painQuestionOption:req.body.painQuestionOption,
      painLocation: req.body.painLocation,
      explainPain: req.body.explainPain,
      extraInfo: req.body.extraInfo,
      appt: req.body.appt,
    }
    // Text message feature
  if(req.body.appt === "Yes"){
    var client = require('twilio')(accountSid, authToken);
   let to = req.user.phoneNumber
    if(to.startsWith("+1")){
      console.log("perfect")
    }
    else{
      to = "+1"+ to
    }
 client.messages.create({
    body: 'Hello there! My name is Darlene Julien and I created this Patient Advocacy web app that allows the user to log their daily symptoms.Feel free to message me at darlenejuliendev@gmail.com',
    to: to,  // Text this number
    from: '+14242926283' // From a valid Twilio number
})
.then((message) => console.log(message.sid));
let messageEmployer = {
  body: 'Again, thank you for viewing my Demo Day project earlier! I would love to stay in contact with you,so here is my contact information: Email: darlenejuliendev@gmail.com. Looking forward to working on your team at your company!',
  to: to,  // Text this number
 from: '+14242926283' // "Thank you for viewing my demo day project. Here is my information:"
}
// THREE_HOURS
  setTimeout(()=> client.messages.create(messageEmployer), 10800000);
}



    db.collection('patientVoice').save(patientVoice, (err, result) => {
      console.log("Inserted Id here:", patientVoice);

      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/userEntries')
    })
  })

  // This updates our browser to retieve the user ID and the date and see if there is a macth. In this case, it will not create another document since our upsert is set to true.
  app.put('/userEntries', (req, res) => {
    db.collection('patientVoice')
    .findOneAndUpdate({made: req.user._id, date:req.body.date
}, {
      $set: {
        extraInfo: req.body.extraInfo,
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
    failureRedirect : '/', // redirect back to the signup page if there is an error
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
