var db = firebase.firestore();

function saveData() {

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

function readData() {
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().firstName}`);
            var node = document.createElement('p');
            var textNode = document.createTextNode('firstName: ' + doc.data().firstName + " " + 'lastName: ' + doc.data().lastName);
            //var textNode = document.createTextNode("fah");
            node.appendChild(textNode);
            document.getElementById('showData').appendChild(node);

        });
    });
}