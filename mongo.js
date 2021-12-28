let mongoUrl = 'mongodb+srv://gyeongguplay:rkdskarudrn@cluster0.b07dw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let db;
//let regexUrl = /\b(http|https):\/\/((?:[a-z\d-]*\.)*[a-z\d-]*\.[a-z\d-]*)\/([\S]*)/;

mongodb.connect(mongoUrl, (err, client) => {
  if (err) return console.log(err);
  db = client.db('backlink');
  console.log('mongo...');

});

server.post('/', async (req, res) => {

  let _url = '';
  let _list = [{
    addUrl: 'aaaaa',
    date: '2021-20-20'
  }, {
    addUrl: 'aaaa',
    date: '2021-20-20'
  }];



  await db.collection('dofollow').find({
    refUrl: ref
  }).toArray((err, rst) => {
    console.log(rst);
    _list = rst;
  });



  console.log('fff', _list);
  res.render('index.ejs', {
    url: _url,
    list: _list
  });


}


});