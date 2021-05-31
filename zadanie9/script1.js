window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};

if (!window.indexedDB) {
    window.alert("Can not opening database");
}

var request = window.indexedDB.open("Database5");
var db;
let clientsTable = document.getElementById("table-body");

request.onsuccess = function (event) {
    db = request.result;
    showData();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


var current_client = -1;
function  invoice(){
    document.getElementById("error_message").innerHTML =""

    var products = [ { id : 1 , nazwa : "Monitor Samsung 27 cale" , cena: 1200.00},
                     { id : 2 , nazwa : "Telewizor Sony 55 cali" , cena: 3499.99},
                     { id : 3 , nazwa : "iPhone 12 Pro 128GB" , cena: 5299.99},
                     { id : 4 , nazwa : "Konsola Sony Play Station 5 1TB" , cena: 3299.99},
                    ];

    selected = document.getElementById("product_id").value;
    found = products.find((i) => i.id == selected);
    console.log(found);

    if (current_client==-1 || found == null)
    {
        document.getElementById("error_message").innerHTML = "Aby wsytawić faturę nalezy wybrać porodukt i klienta z bazy";
    }else{
        window.open("invoice.html?product="+selected+"&client="+current_client)
    }
  }



function generateValuesInForms()
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

    document.getElementById('nameInput').value = data_name;
    document.getElementById('surnameInput').value = data_surname;
    document.getElementById('emailInput').value = data_email;
    document.getElementById('phoneInput').value = data_phone;
    document.getElementById('nip').value = data_nip;
    document.getElementById('idNumber').value = data_idNumber;
    document.getElementById('city').value = data_city;
    document.getElementById('street').value = data_street;
    document.getElementById('number').value = data_number;
    document.getElementById('zip').value = data_zip;
}

function add() {

    var allForms = document.getElementById('all-forms');

    if(allForms.checkValidity())
    {
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

        showData();
    }

}

function getClientId(user_ID) {
    console.log("wybrano");
    var transaction = db.transaction(["users"], "readwrite");
    var objectStore = transaction.objectStore("users");
    var data = objectStore.get(user_ID);

    data.onsuccess = function (event) {
        document.getElementById("client").innerHTML = "Imię:" + data.result.name + " Nazwisko: " + data.result.surname + " email: "+ data.result.email;
        current_client = user_ID;
    }
}

function deleteButton(user_ID) {
    var transaction = db.transaction(["users"], "readwrite");
    var objectStore = transaction.objectStore("users");
    var request = objectStore.delete(user_ID);
    request.onsuccess = function (event) {
        showData();
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
        showData();
    };
}

function showData() {
    var clientsTable = document.getElementById("table-body");
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
                + "<td><button type=\"button\" onClick=\"editButton(" + cursor.value.id + ")\">Edytuj</button></td>"
                + "<td><button type=\"button\" onClick=\"getClientId(" + cursor.value.id + ")\">Wybierz</button></td></tr>"
            cursor.continue();
        }
    }
}


function searchInDatabase() {
    var input = document.getElementById("searchInput").value;

    if(input=="") {
        showData();
    }

    if (input != "") {

        var clientsTable = document.getElementById("table-body");
        clientsTable.innerHTML = "";

        var objectStore = db.transaction(["users"]).objectStore("users");
        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;

            var values = input.trim().split(' ');
            console.log(values);

            var counter = 0;
            if(cursor){
                for(var i in values){
                    for(var j in cursor.value)
                    {
                        if( cursor.value[j].toString().toLowerCase().includes(values[i].toLowerCase() ) )  {
                            counter++;
                            break;
                        }
                    }
                }

                if(counter >= values.length){
                    clientsTable.innerHTML +=
                    "<tr><td>"  + cursor.key + "</td><td>" + cursor.value.name + "</td><td>"
                    + cursor.value.surname + "</td><td>" + cursor.value.email + "</td><td>" + cursor.value.phone + "</td><td>" + cursor.value.nip + "</td><td>" + cursor.value.idNumber + "</td><td>"
                    + cursor.value.city + "</td><td>" + cursor.value.street + "</td><td>" + cursor.value.number +"</td><td>" + cursor.value.zip + "</td>"
                    + "<td><button type=\"button\" onClick=\"deleteButton(" + cursor.value.id + ")\">Usuń</button></td>"
                    + "<td><button type=\"button\" onClick=\"editButton(" + cursor.value.id + ")\">Edytuj</button></td>"
                    + "<td><button type=\"button\" onClick=\"getClientId(" + cursor.value.id + ")\">Wybierz</button></td></tr>"
                }

                cursor.continue();
            }
        }
    }
}
