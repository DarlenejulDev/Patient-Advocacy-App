
let painLocation = document.getElementById('painLocation')
let feelingsReasoning = document.getElementById('feelingsReasoning')
let extraInfo= document.querySelectorAll('.extraInfo')
let formQuestions = document.getElementsByClassName("question");

let update =document.querySelectorAll('.update')
let docNotes =document.querySelectorAll('.docNotes')

let btn = document.getElementById('button')
let painQuestionOption = document.getElementById('painQuestionOption')
let doctor = document.querySelector('.doctor')

if (doctor != null || doctor != undefined) {
  doctor.addEventListener('change', (a)=>{
    if (a.target.value === "false") {
      a.target.value = "true";
    }else{
      a.target.value = "false"
    }
  })
}



for (let i=0; i< update.length; i++){
  update[i].addEventListener('click',(event)=>{
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
    // for (let i=0; i< docNotes.length; i++){
    //   docNotes[i].addEventListener('click',(event)=> {
    //     alert('it works')
    //             fetch('message', {
    //               method: 'put',
    //               headers: {'Content-Type': 'application/json','Accept': 'application/json'},
    //               body: JSON.stringify({
    //
    //                 'doctorNotes':doctorNotes[i].innerText
    //
    //               })
    //             })
    //             .then(response => {
    //               if (response.ok) return response.json()
    //             })
    //           });
    //     }
    //
    //       })
        // }

document.querySelector("#datePick").addEventListener("submit",(e)=>{
  e.preventDefault()
  let query = document.querySelector("#queryVal").value
  let logDate = document.querySelector("#logDate").value
  fetch('datePick', {
    method: 'put',
    headers: {'Content-Type': 'application/json','Accept': 'application/json'},
    body: JSON.stringify({

      'query': query,
      'logDate': logDate

    })
  })
  .then(response => {
    window.location.reload()
  })
});














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
