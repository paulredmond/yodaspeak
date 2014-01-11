var express = require('express'),
    app = express(),
    swig = require('swig'),
    request = require('request'),
    config = require('./config/config');


//
// App settings
//
app.engine('html', swig.renderFile);
app.settings.env = 'development';
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

//
// Routes
//

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/yodaspeak', function (req, res) {
    res.set({
        "Content-Type": "application/json"
    });

    if (!req.query.say) {
        return res.json({ error: 'Say something you must!'});
    }

    request({
        url: 'https://yoda.p.mashape.com/yoda',
        qs: {
            sentence: req.query.say
        },
        headers: {
            'X-Mashape-Authorization': config.mashape.key
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json({
                sentance: req.query.say,
                yodaspeak: unescape(response.body)
            });
        } else {
            res.json({
                error: "An issue there was. Know what to do about it, I don't."
            })
        }
    })
});

app.listen(3000);
