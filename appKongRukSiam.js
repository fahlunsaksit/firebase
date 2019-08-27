const db = firebase.firestore();
const form = document.querySelector('#formAdd');

db.collection('users').get().then((snapshot) => {
  console.log(snapshot.docs);
  snapshot.forEach(doc => {
    dataInTable(doc);
  });
});

function dataInTable(doc) {
  var table = document.getElementById('table');
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell2.innerHTML = doc.data().lastName;
  cell1.innerHTML = doc.data().firstName;
  let btn = document.createElement('button');
  // btn.innerHTML = "<button class='btn btn-warning'>delete</button>";
  btn.textContent = 'delete';
  btn.setAttribute('class','btn btn-danger');
  btn.setAttribute('data-id',doc.id);
  cell3.appendChild(btn);

  btn.addEventListener('click',(e)=>{
    let id = e.target.getAttribute("data-id");

    db.collection('users').doc(id).delete();
  });
  // console.log(data);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(form.inputName.value + ' ' +form.inputLastName.value);
  db.collection('users').add({
    firstName:form.inputName.value,
    lastName:form.inputLastName.value
  });
  form.inputName.innerHTML = '';
  form.inputLastName.innerHTML = '';
});
