window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};

if (!window.indexedDB) {
    window.alert("Can not opening database");
}

var request = window.indexedDB.open("Database5");
var db;
let clientsTable = document.getElementById("clients-table-body");

request.onsuccess = function (event) {
    db = request.result;
    updateTable();
}


window.onload = () => {
    w = new Worker('demo_workers.js');
    const button = document.getElementById('startWorker');
    button.addEventListener('click', (e) => {
        var data_name = document.getElementById('nameInput').value;
        var data_surname = document.getElementById('surnameInput').value;
        var data_email = document.getElementById('emailInput').value;
        var data_phone = document.getElementById('phoneInput').value;
        var data_nip = document.getElementById('nip').value;
        var data_idNumber = document.getElementById('idNumber').value;
        var data_city = document.getElementById('city').value;
        var data_street = document.getElementById('street').value;
        var data_number = document.getElementById('number').value;
        var data_zip = document.getElementById('zip').value;


        var jsonobject = [];
        var item = {};
        item["nameInput"] = data_name;
        item["surnameInput"] = data_surname;
        item["emailInput"] = data_email;
        item["phoneInput"] = data_phone;
        item["nip"] = data_nip;
        item["idNumber"] = data_idNumber;
        item["city"] = data_city;
        item["street"] = data_street;
        item["number"] = data_number;
        item["zip"] = data_zip;
        jsonobject.push(item);

        w.postMessage(JSON.stringify(jsonobject))

        w.onmessage = function(e) {console.log(e.data);

            document.getElementById('nameInput').value = e.data[0]["nameInput"];
            document.getElementById('surnameInput').value = e.data[0]["surnameInput"];
            document.getElementById('emailInput').value = e.data[0]["emailInput"];
            document.getElementById('phoneInput').value = e.data[0]["phoneInput"];
            document.getElementById('nip').value = e.data[0]["nip"];
            document.getElementById('idNumber').value = e.data[0]["idNumber"];
            document.getElementById('city').value = e.data[0]["city"];
            document.getElementById('street').value = e.data[0]["street"];
            document.getElementById('number').value = e.data[0]["number"];
            document.getElementById('zip').value = e.data[0]["zip"];
        };
    });


    w2 = new Worker('photo_worker.js');
    const photoButton = document.getElementById('photoWorker');
    photoButton.addEventListener('click', (e) => {
        var text = document.getElementById('nameInput').value;
        text += document.getElementById('surnameInput').value;
        text += document.getElementById('emailInput').value;
        text += document.getElementById('phoneInput').value;
        text += document.getElementById('nip').value;
        text += document.getElementById('idNumber').value;
        text += document.getElementById('city').value;
        text += document.getElementById('street').value;
        text += document.getElementById('number').value;
        text += document.getElementById('zip').value;
        text += document.getElementById('photo').value;
        //console.log(text);

        document.getElementById('readyPhoto').src = document.getElementById('photo').value;

        var jsonobject = [];
        var item = {};
        item["text"] = text;
        jsonobject.push(item);

        //console.log(jsonobject);
        w2.postMessage(JSON.stringify(jsonobject));

    });


    w2.onmessage = function(e) {
        var data = JSON.parse(e.data);
        var r = data[0]["r"];
        var g = data[0]["g"];
        var b = data[0]["b"];
        //console.log(r, g, b);

        var filtr = document.getElementById('filtr');
        filtr.style.backgroundColor ="rgba("+r+","+g+","+b+",0.5)";

    };

    //w.onmessage = function(event) {document.getElementById("result").innerHTML = event.data;};

}


request.onupgradeneeded = function (event) {

    var object = request.result.createObjectStore("users", { keyPath: "id", autoIncrement: true,unique: true });
    object.createIndex("name", "name", {unique:false});
    object.createIndex("surname", "surname", {unique:false});
    object.createIndex("email", "email", {unique:false});
    object.createIndex("phone", "phone", {unique:false});
    object.createIndex("nip", "nip", {unique:false});
    object.createIndex("idNumber", "idNumber", {unique:false});
    object.createIndex("city", "city", {unique:false});
    object.createIndex("street", "street", {unique:false});
    object.createIndex("number", "number", {unique:false});
    object.createIndex("zip", "zip", {unique:false});

};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


function generate()
{
    var random_names = ["Wojciech", "Adam", "Jan", "Ala", "Katarzyna", "Magdalena"];
    var random_surnames = ["Lesiak", "Nowak", "Krawczyk","Woźniak", "Domagała", "Sęk"]
    var random_id = ["ABC", "DBF", "WPY", "XYZ"]
    var random_cities = ["Warszawa", "Kraków", "Łódź", "Poznań", "Lublin"]
    var random_street = ["Polna", "Zielona", "Wojskowa", "Malownicza", "Radwańska"]

    var data_name = random_names[getRandomInt(0, random_names.length)]+getRandomInt(0,99);
    var data_surname = random_surnames[getRandomInt(0, random_surnames.length)]+getRandomInt(0,99);
    var data_email = data_name+"@gmail.com";
    var data_phone = getRandomInt(100,999)+""+ getRandomInt(100,999)+""+getRandomInt(100,999);
    var data_nip = getRandomInt(100,999)+"-"+ getRandomInt(100,999)+"-"+getRandomInt(10,99)+"-"+getRandomInt(10,99);
    var data_idNumber = random_id[getRandomInt(0, random_id.length)]+" "+getRandomInt(100,999)+""+ getRandomInt(100,999);
    var data_city = random_cities[getRandomInt(0, random_cities.length)];
    var data_street = random_street[getRandomInt(0, random_street.length)];
    var data_number = getRandomInt(1,99)
    var data_zip = getRandomInt(10,99)+"-"+getRandomInt(100,999);

    var transaction = db.transaction(["users"], "readwrite");
    var objectStore = transaction.objectStore("users");

    var request = objectStore.add({
        name: data_name,
        surname: data_surname,
        email: data_email,
        phone: data_phone,
        nip: data_nip,
        idNumber: data_idNumber,
        city: data_city,
        street: data_street,
        number: data_number,
        zip: data_zip
    });

    updateTable();
}

function add() {
    var data_name = document.getElementById('nameInput').value;
    var data_surname = document.getElementById('surnameInput').value;
    var data_email = document.getElementById('emailInput').value;
    var data_phone = document.getElementById('phoneInput').value;
    var data_nip = document.getElementById('nip').value;
    var data_idNumber = document.getElementById('idNumber').value;
    var data_city = document.getElementById('city').value;
    var data_street = document.getElementById('street').value;
    var data_number = document.getElementById('number').value;
    var data_zip = document.getElementById('zip').value;

    var transaction = db.transaction(["users"], "readwrite");
    var objectStore = transaction.objectStore("users");
    var request = objectStore.add({
        name: data_name,
        surname: data_surname,
        email: data_email,
        phone: data_phone,
        nip: data_nip,
        idNumber: data_idNumber,
        city: data_city,
        street: data_street,
        number: data_number,
        zip: data_zip
    });

    updateTable();
}


function deleteButton(user_ID) {
    var transaction = db.transaction(["users"], "readwrite");
    var objectStore = transaction.objectStore("users");
    var request = objectStore.delete(user_ID);
    request.onsuccess = function (event) {
        updateTable();
    };
}

function editButton(user_ID) {
    var transaction = db.transaction(["users"], "readwrite");
    var objectStore = transaction.objectStore("users");

    var data = objectStore.get(user_ID);

    data.onsuccess = function (event) {
    document.getElementById('nameInput').value = data.result.name;
    document.getElementById('surnameInput').value = data.result.surname;
    document.getElementById('emailInput').value = data.result.email;
    document.getElementById('phoneInput').value = data.result.phone;
    document.getElementById('nip').value = data.result.nip;
    document.getElementById('idNumber').value = data.result.idNumber;
    document.getElementById('city').value = data.result.city;
    document.getElementById('street').value = data.result.street;
    document.getElementById('number').value = data.result.number;
    document.getElementById('zip').value = data.result.zip;
    }

    var request = objectStore.delete(user_ID);
    request.onsuccess = function (event) {
        updateTable();
    };
}

function updateTable() {
    var clientsTable = document.getElementById("clients-table-body");
    var objectStore = db.transaction(["users"]).objectStore("users");
    clientsTable.innerHTML = "";
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            clientsTable.innerHTML +=
                "<tr><td>"  + cursor.key + "</td><td>" + cursor.value.name + "</td><td>"
                + cursor.value.surname + "</td><td>" + cursor.value.email + "</td><td>" + cursor.value.phone + "</td><td>" + cursor.value.nip + "</td><td>" + cursor.value.idNumber + "</td><td>"
                + cursor.value.city + "</td><td>" + cursor.value.street + "</td><td>" + cursor.value.number +"</td><td>" + cursor.value.zip + "</td>"
                + "<td><button type=\"button\" onClick=\"deleteButton(" + cursor.value.id + ")\">Usuń</button></td>"
                + "<td><button type=\"button\" onClick=\"editButton(" + cursor.value.id + ")\">Edytuj</button></td></tr>"
            cursor.continue();
        }
    }
}

function search() {
    var value = document.getElementById("search").value;
    if (value != "") {
        var clientsTable = document.getElementById("clients-table-body");
        clientsTable.innerHTML = "";

        var objectStore = db.transaction(["users"]).objectStore("users");
        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                if (
                    cursor.value.name === value || cursor.value.surname === value ||  cursor.value.email === value ||
                    cursor.value.phone  === value || cursor.value.nip === value || cursor.value.idNumber === value ||
                    cursor.value.city === value || cursor.value.street === value ||  cursor.value.number === value ||
                    cursor.value.zip === value
                ){
                    clientsTable.innerHTML +=
                    "<tr><td>"  + cursor.key + "</td><td>" + cursor.value.name + "</td><td>"
                    + cursor.value.surname + "</td><td>" + cursor.value.email + "</td><td>" + cursor.value.phone + "</td><td>" + cursor.value.nip + "</td><td>" + cursor.value.idNumber + "</td><td>"
                    + cursor.value.city + "</td><td>" + cursor.value.street + "</td><td>" + cursor.value.number +"</td><td>" + cursor.value.zip + "</td>"
                    + "<td><button type=\"button\" onClick=\"deleteButton(" + cursor.value.id + ")\">Usuń</button></td>"
                    + "<td><button type=\"button\" onClick=\"editButton(" + cursor.value.id + ")\">Edytuj</button></td></tr>"
                    cursor.continue();
                }
                else{
                    cursor.continue();
                }
            }
        }
    }
}
