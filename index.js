window.addEventListener("message", msgHandler);

let myArray = {};


function msgHandler(msg) {


    let data = msg.data;
    console.log(data);
    const newItem = {
        title: data
    };
    if (myArray[data] == undefined) {
        addData(newItem);
        myArray[data] = 1;
    }
}

function readFile(file) {

    const urls = file.split('\n');


    var i = 0;
    let win;
    var id = setInterval(function () {
        // win.close();
        if (i == urls.length) {
            clearInterval(id)
        } else {

            window.open(urls[i]);
            i++;
        }
    }, 15000)


}










let db;

const openRequest = window.indexedDB.open('notes_db', 1);









openRequest.addEventListener('error', () => console.error('Database failed to open'));


openRequest.addEventListener('success', () => {
    console.log('Database opened successfully');


    db = openRequest.result;


    displayData();
});


openRequest.addEventListener('upgradeneeded', e => {


    db = e.target.result;



    const objectStore = db.createObjectStore('notes_os', {
        keyPath: 'id',
        autoIncrement: true
    });


    objectStore.createIndex('title', 'title', {
        unique: false
    });




    console.log('Database setup complete');
});





function addData(newItem) {






    const transaction = db.transaction(['notes_os'], 'readwrite');


    const objectStore = transaction.objectStore('notes_os');



    const addRequest = objectStore.add(newItem);

    addRequest.addEventListener('success', () => {

        console.log("new url addedd to DB successfuly ! ");
    });


    transaction.addEventListener('complete', () => {
        console.log('Transaction completed: database modification finished.');


        displayData();
    });

    transaction.addEventListener('error', () => console.log('Transaction not opened due to error'));
}


let list = document.getElementById('list');

function displayData() {



    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }



    const objectStore = db.transaction('notes_os').objectStore('notes_os');
    objectStore.openCursor().addEventListener('success', e => {

        const cursor = e.target.result;


        if (cursor) {

            const listItem = document.createElement('li');
            const link = document.createElement('a');


            listItem.appendChild(link);
            list.appendChild(listItem);


            link.innerHTML = cursor.value.title + "<br>";
            link.setAttribute("href", cursor.value.title);




            listItem.setAttribute('data-note-id', cursor.value.id);

            cursor.continue();
            console.log('Notes all displayed');
        }
    });
}

function removeDB() {
    const transaction = db.transaction(['notes_os'], 'readwrite');


    const objectStore = transaction.objectStore('notes_os');

    objectStore.clear();
    displayData();
}
