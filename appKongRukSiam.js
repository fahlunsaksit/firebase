const db = firebase.firestore();

db.collection('users').get().then((snapshot)=>{
    console.log(snapshot.docs);
    snapshot.forEach(doc=>{
      dataInTable(doc.data());
    });
});

function dataInTable(data) {
  var table = document.getElementById('table');
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = data.firstName;
  cell2.innerHTML = data.lastName;
  console.log(data);
}
