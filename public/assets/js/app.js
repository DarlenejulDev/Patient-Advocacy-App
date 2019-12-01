
// let painLocation = document.getElementsByClassName('painLocation')
let painLocation = document.querySelectorAll('.painLocation')
console.log(painLocation);
// let extraInfo =document.getElementsByClassName('extraInfo')
let extraInfo= document.querySelectorAll('.extraInfo')
console.log(extraInfo);

// let del = document.getElementsByClassName('delete')
// let update= document.getElementsByClassName('update')
let update =document.querySelectorAll('.update')
console.log(update);
// let find= document.getElementsByClassName('find')
//
// let mood = document.getElementById('mood')
// let moodInherited = document.getElementById('moodInherited')


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


// Array.from(update).forEach(function(element) {
//       element.addEventListener('click', function(){
//         console.log('I clicked')
//
//       //     var txt;
//       //     if (confirm("Are you sure you would like to update this?")) {
//       //       txt = "Update was successful!";
//       //     } else {
//       //       txt = "No changes made!";
//       //     }
//       // document.getElementById("demo").innerHTML = txt;
// // })
//         const painLocation =
//         this.parentNode.childNodes[1].childNodes[0].innerText
//          // this.parentNode.childNodes[9].childNodes[1].childNodes[0]
//         const extraInfo =
//         this.parentNode.childNodes[13].childNodes[1].childNodes[0].innerText
//         fetch('/mood', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json','Accept': 'application/json'},
//           body: JSON.stringify({
//             'painLocation':painLocation,
//             'extraInfo': extraInfo
//
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//       });
// });
for (let i=0; i< update.length; i++){
  update[i].addEventListener('click',( )=>{
    alert('I work');
            fetch('userEntries', {
              method: 'put',
              headers: {'Content-Type': 'application/json','Accept': 'application/json'},
              body: JSON.stringify({
                'painLocation':painLocation[i].innerText,
                'extraInfo': extraInfo[i].innerHTML

              })
            })
            .then(response => {
              if (response.ok) return response.json()
            })
          });
    }


//   })
// }
//
//
// Array.from(del).forEach(function(element) {
//       element.addEventListener('click', function(){
//         console.log(del)
//         const painLocation = this.parentNode.childNodes[9].childNodes[1].childNodes[0]
//         const extraInfo =     this.parentNode.childNodes[13].childNodes[1].childNodes[0]
//
//
//         fetch('/mood', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'painLocation': painLocation,
//             'extraInfo': extraInfo
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
