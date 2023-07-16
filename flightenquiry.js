var express=require('express')
var router=express.Router()
var pool=require('./pool')
var upload=require('./multer')
router.get('/flightinterface',function(req,res){
 res.render('flightinterface',{message:''})
})

router.get('/displayallflights',function(req,res){
    pool.query("select * from flightsdetails",function(error,result){
        if(error)
        {   console.log(error) 
            res.render('displayallflights',{'data':[],'message':'Server Error'})
        }
        else
        {
            res.render('displayallflights',{'data':result,'message':'Success'})
        }
    
    
    
    })
    
   })

router.post('/flightsubmit',upload.single('logo'),function(req,res){
    console.log("BODY",req.body)
    console.log("FILE",req.file)
    var days=(""+req.body.days).replaceAll("'",'"')

   
pool.query("insert into flightsdetails (flightname, types, totalseats, days, sourcecity, departuretime, dsetinationcity, arrivaltime, company, logo)values(?,?,?,?,?,?,?,?,?,?)",[req.body.flightname,req.body.flighttype,req.body.noofseats,days,req.body.sourcecity,req.body.deptime,req.body.destinationcity,req.body.arrtime,req.body.company,req.file.originalname],function(error,result){
if(error)
{   console.log(error) 
    res.render('flightinterface',{'message':'Server Error'})
}
else
{
    res.render('flightinterface',{'message':'Record Submitted Successfully'})
}
})

})


router.get('/fetchallcities',function(req,res){
    pool.query("select * from cities",function(error,result){
    if(error)
    {
        res.status(500).json({result:[],message:error})
    }
    else
    {
        res.status(200).json({result:result,message:'Success'})

    }

    })

   })
   


module.exports = router;