const express = require('express');
const app = express();
const hostName = 'localhost';
const port = 8080;
const RouterController = require('./Router/RouterController')

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('views', __dirname, 'views');
app.set('view engine', 'ejs');

app.use('/machineload', RouterController);

app.get('/', function(req, res){
    res.redirect(`http://${hostName}:${port}/machineload/`);
});

app.listen(port, function(){
    console.log(`app online in http://${hostName}:${port}/machineload/`)
})