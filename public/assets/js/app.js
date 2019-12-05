
let painLocation = document.getElementById('painLocation')
let feelingsReasoning = document.getElementById('feelingsReasoning')
let extraInfo= document.querySelectorAll('.extraInfo')

let del = document.querySelectorAll('.delete')

let update =document.querySelectorAll('.update')


let btn = document.getElementById('button')
let painQuestionOption = document.getElementById('painQuestionOption')

console.log(btn);



for (let i=0; i< update.length; i++){
  update[i].addEventListener('click',(event)=>{
    alert('I work');
            // let body = {}
            // body[event.target.name] = event.target.innerText;
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

// painQuestionOption.addEventListener('change', (event) => {
  // event.target & event.currentTarget
  // event.target.value === "Yes I do", "No I don't"
//   console.log(event)
// })















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
