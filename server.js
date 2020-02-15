const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('./api');
const appInfo = require('./credentials');


const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/weatherInfo/:city', (req, res) => {
    console.log(req.body);

    let city = req.params.city

    request.get(
        `${appInfo.baseURI}?location=${city}&format=json`,
        null,
        null,
        function (err, data, result) {
            if (err) {
                console.log(err);
                res.status(404).json({
                    success: false,
                    msg: "No match found!!"
                })
            } else {
                console.log("\n *******-------GET-------******** \n", data)
                res.send(data);
            }
        }
    );

    // res.send('Book is added to the database');
});

app.post('/weatherInfo', (req, res) => {

    console.log(req.body);
    let cities = req.body.cities;
    let p = fetchData(cities);
    p.then((response,error)=>{
        if (error) {
            console.log(error);
            res.status(404).json({
                success:false,
                msg:"Error while fetching Data!"
            })
        } else {
            console.log("\n *******------POST--------******** \n",response);
            let dataArray = [];
            for(let d of response){
                // console.log(JSON.parse(d));
                dataArray.push(JSON.parse(d));
            }
            res.send(dataArray);
            // res.status(200).json({
            //     success:true,
            //     data:response
            // })
        }
    })


    // request.get(
    //     `${appInfo.baseURI}?woeid=${cities[0]}&format=json`,
    //     null,
    //     null,
    //     function (err, data, result) {
    //         if (err) {
    //             console.log(err);
    //             res.status(404).json({
    //                 success:false,
    //                 msg:"No match found!!"
    //             })
    //         } else {
    //             console.log("\n *******------POST--------******** \n",data)
    //             res.send(data);
    //         }
    //     }
    // );

});

function asyncFunctionCall(cityId) {
    return new Promise(resolve => {
        request.get(
        `${appInfo.baseURI}?woeid=${cityId}&format=json`,
            null,
            null,
            function (error, response, body) {
                if(error){
                    console.log(`\n Response for ${cityId} \n ${error}`);
                }
                else if(typeof response !== 'undefined') {
                    console.log(`\n Response for ${cityId} \n ${response}`);
                        resolve(response);
                        return;
                    // }
                }
                resolve(false);
            }
        );

    });
  }

function fetchData(cities) { 
    const promises = [];
    for(var cityId of cities) {
        console.log(`------ ${cityId} ------`);
        promises.push(asyncFunctionCall(cityId)); 
    }
        return Promise.all(promises);
}

const port = process.env.PORT || 1506;

app.listen(port, () => console.log(`Server started on port: ${port}`))