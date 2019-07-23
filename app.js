var POSTS      = require('./db/post');
const XLSX = require('xlsx');
const mongoose = require('mongoose');
var port = process.env.PORT || 8080;
//connect
const uri = 'mongodb://localhost:27017/postCustomer'
mongoose.connect(uri);
mongoose.connection.once('open', () => {
    insertPosts();
})
//
var arr = XLSX.readFile('./test3.xlsx', {type: 'array'});
var dataExcel = arr.Sheets.Sheet1;
const rowExcel = Number(dataExcel['!ref'].slice(5));

async function insertPosts() {
    for (let i = 2; i < rowExcel ; i++){//start form col 2 because col 1 is the title 
        let colB = 'B'+i;//Title
        let colC = 'C'+i;//Content
        let colD = 'D'+i;//Excerpt
        let colH = 'H'+i;//URL
        let colO ='O'+i;//_yoast_wpseo_title
        let colP ='P'+i;//_yoast_wpseo_metadesc
        let colR ='R'+i;//_yoast_wpseo_focuskw
        let colV ='V'+i;//Status
        let colAA ='AA'+i;//Slug
        let colAD ='AD'+i;//PostModifiedDate
        const POST  = {
            "Title" : dataExcel[colB].v,
            "Content" : dataExcel[colC].v,
            'Excerpt' : dataExcel[colD].v,
            '_yoast_wpseo_title': dataExcel[colO].v,
            '_yoast_wpseo_metadesc': dataExcel[colP].v,
            '_yoast_wpseo_focuskw': dataExcel[colR].v,
            'Status': dataExcel[colV].v,
            'Slug': dataExcel[colAA].v,
            'PostModifiedDate': dataExcel[colAD].v,
            "URL" : dataExcel[colH].v.split('|', 1)[0]
        }
       await POSTS.insertMany(POST)//Hàm insert
    }
}

