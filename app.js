//imports
const express = require('express');
const app = express();
const port = 3000;

//static files
app.use('/js',express.static(__dirname+'/js'));

//Set Views
app.set('views','./views')
app.set('view engine','ejs');

app.get('',(req,res)=>{
    res.render('index')
})

//Listen on port 3000
app.listen(port,() => console.info('Listening on port 3000'));