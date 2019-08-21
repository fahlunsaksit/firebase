var db = firebase.firestore();
// for delete before data
var e = document.querySelector(".ulTest");

db.collection("users")
    .onSnapshot(function (querySnapshot) {
        e.innerHTML = '';
        querySnapshot.forEach(function (doc) {
            $('.ulTest').append('<li>' + 'firstName : ' + doc.data().firstName + ' , ' + 'lastName : ' + doc.data().lastName + '</li>')
             console.log(doc.data());
        });

    });

function search() {
    var dataInputSearch = document.getElementById('inputSearch');
    var dataSelectSearch = document.getElementById('selectSearch');
    // console.log('dataInputSearch = ' + dataInputSearch + " " + "dataSelectSearch = " + dataSelectSearch);
    db.collection("users").where(dataSelectSearch.value, "==", dataInputSearch.value)
        .onSnapshot(function (querySnapshot) {
            e.innerHTML = '';
            querySnapshot.forEach(function (doc) {
                $('.ulTest').append('<li>' + 'firstName : ' + doc.data().firstName + ' , ' + 'lastName : ' + doc.data().lastName + '</li>')
                console.log(doc.data());
            });

        });
        dataInputSearch.value = '';
}

function saveData() {
    if (document.getElementById('inputName').value == "" || document.getElementById('inputLastName').value == "") {
        alert('กรุณาใส่ข้อมูล');
    } else {
        db.collection("users").add({
            firstName: document.getElementById('inputName').value,
            lastName: document.getElementById('inputLastName').value
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
        alert('save data in firebase');
        document.getElementById('inputName').value = '';
        document.getElementById('inputLastName').value = '';
    }

}
function readData() {
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data().firstName}`);
            console.log(doc);
            var node = document.createElement('p');
            var textNode = document.createTextNode('firstName: ' + doc.data().firstName + " " + 'lastName: ' + doc.data().lastName);
            //var textNode = document.createTextNode("fah");
            node.appendChild(textNode);
            document.getElementById('showData').appendChild(node);

        });
    });
}