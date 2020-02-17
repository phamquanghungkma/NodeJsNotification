const mysql = require('mysql');
const request = require('request');
const express = require('express');
var listSt = ["fLpGIo62rJQ:APA91bHP25VfU6myS8NpD9UsfY0WosKO0MEvdTroRlQoJZaA-TYMTs7DCzAFw3nlOs4DXCMpkFpAxG0HKi0x44JfHhk6m2-f3ca87GD1LpWzbx94whI2c-GIfEkoyh3OJuhxZZliWrsa",
"ewXuL5MhByw:APA91bH9Uhqij-TRF9Wo44kXmku7uUyzR4YA4zVVuj9nFfhkid0WYzCWihjGOr3Y0in07RntXkP48Hzawpo8AYviC1qdBxutJIp5EvU3LH0v6CXCP5GWDiSsRJW4E27tLDqe6teSIxD1",
"cr1U030uHbg:APA91bHKcU9weLePHDpbE7namXl4ORM3PczrzOaLWQi5XzTXUrPDFD_EHfOFJZhV5IFWPSlZ4LUGzgHIFMmBm0AvtpSFF7Oxz1320FtjEBqc0f6Owhfm9fuSGR5B0ylJUiIYgB-GrY9e"
];
var hungFCM = "enNd7URzP-E:APA91bGseGuYwrlyU9GoRDQVKvyYl4QqK8ZMrwHhahTzc5pVTUxPGgYN2XCJelHWozsOAQBhQ744vJ6LA2vzm5SZcKOSmRiy9SYTgFIAZEBLY0vzR5zHdNNK4UphM0IsSNNQSLbx7BrF"
var trinhFCM = "fLpGIo62rJQ:APA91bHP25VfU6myS8NpD9UsfY0WosKO0MEvdTroRlQoJZaA-TYMTs7DCzAFw3nlOs4DXCMpkFpAxG0HKi0x44JfHhk6m2-f3ca87GD1LpWzbx94whI2c-GIfEkoyh3OJuhxZZliWrsa"
var giangFCM = "de2okUE1o34:APA91bGZdXcbqxqgqcu3zapLhCBgdvsQVUIehmtDEjbkDBwU0UxFNrMOPN2llMsKBkK95Cig5S6gm_WuldFJ0eowsqm-xzRhO8QqDH5Z3SVfgawivns4QTElhIf433p8l9gcM-AYL8Nc"
var vinhFCM = "enHsHDzNSkc:APA91bGfLhy5euwkkeeAuLv5TQ40xO4I0EbG2Oz7oRpLOSk9FrgTIn1FADpUZ_60LsSwAQHFaqtnolGj49yv2S8UtDQxbKZGQPx2_-DFO4U0rBYzgmFuWYdyIRZK54aaXTIU72imhURb"
var hieuFCM ="cr1U030uHbg:APA91bHKcU9weLePHDpbE7namXl4ORM3PczrzOaLWQi5XzTXUrPDFD_EHfOFJZhV5IFWPSlZ4LUGzgHIFMmBm0AvtpSFF7Oxz1320FtjEBqc0f6Owhfm9fuSGR5B0ylJUiIYgB-GrY9e"
var FCM;

var app = express(); 
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'API_test'

});




// mysqlConnection.connect(
//     (error) => {
//         if (!error) {
//             console.log("DB connection succed !");
//         }
//         else {
//             console.log('DB connection failed \n Error :' + JSON.stringify(error, undefined, 2));
//         }
//     }
// );

// mysqlConnection.query('SELECT keyFCM  FROM Employee WHERE EmpID = 3',(error,response,body)=>{
//     if (!error) {
//            console.log("respone",(response[0].keyFCM))
//            console.log("JSON",JSON.stringify((response[0].keyFCM)))
//            FCM = (response[0].keyFCM);
//            console.log("FCM :"+FCM)
//         //    console.log("body",body)
//     }
//     else {
//         console.log(error);
//         return error;
//     }
// });

setInterval(() => {
    mysqlConnection.query('SELECT name FROM Movies', (error, response, body) => {
        if (!error) {
            console.log("getDB ", JSON.stringify(response));
           // sendMessage(JSON.stringify(response));
            
        }
        else {
            console.log(error);
            return error;
        }

    });

    sendMessage("Thong Bao Tu Server")
}, 10000)






function sendMessage(message, title = "Revo") {
    let body = {
        notification: {

            "title": title,
            "body": message 
        },
        "data": {

            "node_id": "25",
            "node_name": "FCM test",
            "node_status": "1",
            "is_electric": false
        },
      
        to:giangFCM
    }
 
    let options = {
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAAj6TBQkM:APA91bGnKLZNe294LskjK49GIsf6leqFQvuLCKUsuWET3JtL-uq59-qAH8ECZ7J1xwY5GWEaL4MBOuW_h3NcYqHTVyN5f9zPe775xVAnW3-5H1Kn-67i0AHvW3n5zDBwr3i5ef8zYIMa'
            
        },
        project_id:616944452163,
        body: JSON.stringify(body)
    };
    request(options, (err, respon, body) => {
        let json = JSON.parse(body);
        if (json.success == 1) {
            console.log("Gui thanh Cong", " message id ", JSON.stringify(json.results))
        } else {
            console.log("Gui that bai")
        }

    });
}

