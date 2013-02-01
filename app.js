//setup Dependencies
var connect = require('connect')
    , express = require('express')
    , port = (process.env.PORT || 3000)
    , googleAnalyticsID = 'UA-37452335-1'
    , nodemailer = require('nodemailer');

//Setup Express
var server = express.createServer();
server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret: "shhhhhhhhh!"}));
    server.use(connect.static(__dirname + '/static'));
    server.use(server.router);
});

//setup the errors
server.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.render('404.jade', { locals: { 
                  title : '404 - Not Found'
                 ,description: ''
                 ,author: ''
                 ,analyticssiteid: 'UA-37452335-1'
                },status: 404 });
    } else {
        res.render('500.jade', { locals: { 
                  title : 'The Server Encountered an Error'
                 ,description: ''
                 ,author: ''
                 ,analyticssiteid: 'UA-37452335-1'
                 ,error: err 
                },status: 500 });
    }
});
server.listen( port);

///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////

server.get('/', function(req,res){
  res.render('index.jade', {
    locals : { 
              title : 'The Campbell Law Practice, LLC'
             ,description: 'Atlanta Attorney'
             ,author: 'Keith Elliott'
             ,analyticssiteid: 'UA-37452335-1'
            }
  });
});

server.get('/attorney', function(req,res){
   res.render('attorney_profile.jade', {
       locals : {
           title : 'The Campbell Law Practice, LLC'
           ,description: 'Atlanta Attorney'
           ,author: 'Keith Elliott'
           ,analyticssiteid: 'UA-37452335-1'
       }
   })
});

server.get('/practice', function(req,res){
    res.render('practice.jade', {
        locals : {
            title : 'The Campbell Law Practice, LLC'
            ,description: 'Atlanta Attorney'
            ,author: 'Keith Elliott'
            ,analyticssiteid: 'UA-37452335-1'
        }
    })
});

server.get('/contact', function(req,res){
    res.render('contact.jade', {
        locals : {
            title : 'The Campbell Law Practice, LLC'
            ,description: 'Atlanta Attorney'
            ,author: 'Keith Elliott'
            ,analyticssiteid: 'UA-37452335-1'
        }
    })
});

server.get('/workerscomp', function(req,res){
    res.render('workers_comp.jade', {
        locals : {
            title : 'The Campbell Law Practice, LLC'
            ,description: 'Atlanta Attorney'
            ,author: 'Keith Elliott'
            ,analyticssiteid: 'UA-37452335-1'
        }
    })
});

server.get('/adoptions', function(req,res){
    res.render('adoptions.jade', {
        locals : {
            title : 'The Campbell Law Practice, LLC'
            ,description: 'Atlanta Attorney'
            ,author: 'Keith Elliott'
            ,analyticssiteid: 'UA-37452335-1'
        }
    })
});

server.get('/guardian_ad_litem', function(req,res){
    res.render('guardadlitem.jade', {
        locals : {
            title : 'The Campbell Law Practice, LLC'
            ,description: 'Atlanta Attorney'
            ,author: 'Keith Elliott'
            ,analyticssiteid: 'UA-37452335-1'
        }
    })
});

server.post('/sendcontact', function(req, res){
    console.log(req.body);
    if(req.body.name === ''){
        res.send({'message':'please provide your name', 'error': 'name'});
    }
    else if(req.body.phone === ''){
        res.send({'message':'please provide a phone number', 'error': 'phone'});
    }
    else if(req.body.message === ''){
        res.send({'message':'please provide a message', 'error': 'message'});
    }

    else{
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: "information@campbelllawpractice.com", // sender address
            to: "Christina Campbell <christina@campbelllawpractice.com>", // list of receivers
            subject: "New Contact Request (" + req.body.name + ")", // Subject line
            html: "<b>Hello Christina</b></br></br><p>You received a new contact request.</p></br>" +
                "<table>" +
                "<tr><td>Name</td><td>" + req.body.name +"</td></tr>" +
                "<tr><td>Email</td><td>" + req.body.email +"</td></tr>"+
                "<tr><td>Phone</td><td>" + req.body.phone +"</td></tr>"+
                "<tr><td>Message</td><td>" + req.body.message + "</td></tr>"+
                "</table>" // html body
        }

        var smtpTransport = nodemailer.createTransport("SMTP",{
            service: "Gmail",
            auth: {
                user: "information@campbelllawpractice.com",
                pass: "malia&moriah"
            }
        });

        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }

            // if you don't want to use this transport object anymore, uncomment following line
            //smtpTransport.close(); // shut down the connection pool, no more messages
        });

        res.send({'message':'Thank you for contacting me.  I will contact you shortly.'});
    }
});

//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res){
    throw new NotFound;
});

function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


console.log('Listening on http://0.0.0.0:' + port );
