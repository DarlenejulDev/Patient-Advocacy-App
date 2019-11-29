
let painLocation = document.getElementsByClassName('painLocation')
//
let del = document.getElementsByClassName('delete')
let update= document.getElementsByClassName('update')
let find= document.getElementsByClassName('find')

let mood = document.getElementById('mood')
let moodInherited = document.getElementById('moodInherited')


// mood.addEventListener('change', ()=>{
//   var userMood = mood.options[mood.selectedIndex].value;
//   moodInherited.textContent = userMood
// })


// Any user w/o accounts
// Array.from(find).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const userWord = this.parentNode.parentNode.childNodes[1].innerText
//         const userMeaning = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('profileEntry', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'userWord': userWord,
//             'userMeaning': userMeaning,
//
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           // window.location.reload(true)
//         })
//       });
// });


Array.from(update).forEach(function(element) {
      element.addEventListener('click', function(){
        alert('Are you sure you would like to update the meaning of this word?');
        const userWord = this.parentNode.parentNode.childNodes[1].innerText
        const userMeaning = this.parentNode.parentNode.childNodes[3].innerText
        fetch('patientVoice', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'painLocation':painLocation,
            'mood': mood,

          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          // window.location.reload(true)
        })
      });
});


Array.from(del).forEach(function(element) {
      element.addEventListener('click', function(){
        console.log(del)
        const userWord = this.parentNode.parentNode.childNodes[1].innerText
        const userMeaning = this.parentNode.parentNode.childNodes[3].innerText


// });
        fetch('profileEntry', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'userWord': userWord,
            'userMeaning': userMeaning,
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
