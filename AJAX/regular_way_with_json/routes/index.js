var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ajax_info.txt', (req, res) => {
  // res.sendFile("./ajax_info.txt")
  const obj = {
    name: "huakun",
    age: 20
  };
  res.send(obj);
});


module.exports = router;
