const mysql = require('mysql');
const request = require('request');
const express = require('express');
var listSt = ["fLpGIo62rJQ:APA91bHP25VfU6myS8NpD9UsfY0WosKO0MEvdTroRlQoJZaA-TYMTs7DCzAFw3nlOs4DXCMpkFpAxG0HKi0x44JfHhk6m2-f3ca87GD1LpWzbx94whI2c-GIfEkoyh3OJuhxZZliWrsa",
"ewXuL5MhByw:APA91bH9Uhqij-TRF9Wo44kXmku7uUyzR4YA4zVVuj9nFfhkid0WYzCWihjGOr3Y0in07RntXkP48Hzawpo8AYviC1qdBxutJIp5EvU3LH0v6CXCP5GWDiSsRJW4E27tLDqe6teSIxD1",
"cr1U030uHbg:APA91bHKcU9weLePHDpbE7namXl4ORM3PczrzOaLWQi5XzTXUrPDFD_EHfOFJZhV5IFWPSlZ4LUGzgHIFMmBm0AvtpSFF7Oxz1320FtjEBqc0f6Owhfm9fuSGR5B0ylJUiIYgB-GrY9e"
];
var hungFCM = "fAQJN3YM3vs:APA91bFrSYJmFycESuugoy4D9GTWdqMfGFAFR08AujPUfandw5nsC446kDGBq_b3RmUPJVL-4CtvswmnxY1W8vcIuxcriW3UwZCuEEROEg6rrgcSxySQqi4gv0stfs5pbMlDiDE9MgYo"
var trinhFCM = "fLpGIo62rJQ:APA91bHP25VfU6myS8NpD9UsfY0WosKO0MEvdTroRlQoJZaA-TYMTs7DCzAFw3nlOs4DXCMpkFpAxG0HKi0x44JfHhk6m2-f3ca87GD1LpWzbx94whI2c-GIfEkoyh3OJuhxZZliWrsa"
var giangFCM = "ewXuL5MhByw:APA91bH9Uhqij-TRF9Wo44kXmku7uUyzR4YA4zVVuj9nFfhkid0WYzCWihjGOr3Y0in07RntXkP48Hzawpo8AYviC1qdBxutJIp5EvU3LH0v6CXCP5GWDiSsRJW4E27tLDqe6teSIxD1"
var vinhFCM = "enHsHDzNSkc:APA91bGfLhy5euwkkeeAuLv5TQ40xO4I0EbG2Oz7oRpLOSk9FrgTIn1FADpUZ_60LsSwAQHFaqtnolGj49yv2S8UtDQxbKZGQPx2_-DFO4U0rBYzgmFuWYdyIRZK54aaXTIU72imhURb"
var hieuFCM ="cr1U030uHbg:APA91bHKcU9weLePHDpbE7namXl4ORM3PczrzOaLWQi5XzTXUrPDFD_EHfOFJZhV5IFWPSlZ4LUGzgHIFMmBm0AvtpSFF7Oxz1320FtjEBqc0f6Owhfm9fuSGR5B0ylJUiIYgB-GrY9e"
var FCM;

var app = express(); // khởi tạo express
const bodyparser = require('body-parser');

app.use(bodyparser.json());// format định dạn in ra là JSON

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'fakeData'

});

// connect to Firebase 
// ham Post du lieu len firebase


// Connect to Database
mysqlConnection.connect(
    (error) => {
        if (!error) {
            console.log("DB connection succed !");
        }
        else {
            console.log('DB connection failed \n Error :' + JSON.stringify(error, undefined, 2));
        }
    }
);
// query FCM from DB
mysqlConnection.query('SELECT keyFCM  FROM Employee WHERE EmpID = 3',(error,response,body)=>{
    if (!error) {
           console.log("respone",(response[0].keyFCM))
           console.log("JSON",JSON.stringify((response[0].keyFCM)))
           FCM = (response[0].keyFCM);
           console.log("FCM :"+FCM)
        //    console.log("body",body)
    }
    else {
        console.log(error);
        return error;
    }
});

setInterval(() => {
    // truy van de DB 
    mysqlConnection.query('SELECT Name FROM Employee', (error, response, body) => {
        if (!error) {
            console.log("getDB ", JSON.stringify(response));
            sendMessage(JSON.stringify(response));
            // lay dc du lieu roi thi goi ham sendMessage
        }
        else {
            console.log(error);
            return error;
        }

    });

}, 10000)


//xét cổng port 3000 cho server
//app.listen(3000,()=>(console.log('Express server is running at port no : 3000')));




function sendMessage(message, title = "Revo") {
    let body = {
        notification: {

            "title": title,
            "body": message // message la data lay duoc tu DB
        },
        "data": {

            "node_id": "25",
            "node_name": "FCM test",
            "node_status": "1",
            "is_electric": false
        },
        registration_ids:listSt
        //to:hieuFCM
    }
 
    let options = {
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAAaACZOo8:APA91bEZk08HqAdYA1KEp72JguuEQMB6N-dZxQzTttdEjET7PhSHZmG6y-cKBIyvFWsOaTn9pFnd2lXWrb_IuiE0Bcve66mfiGT-1QGS-0oUCw1uukC6GtD2-NMEcUyix-O51heoF970'
            
        },
        project_id:446686640783,
        body: JSON.stringify(body)// chuyen object js -> string
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

