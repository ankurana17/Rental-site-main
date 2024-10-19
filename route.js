const express=require('express')
const router=express.Router()
const mysql_connect=require('./mysql_connector')
const connection=require('./mysql_connector')
router.get("/",(req,res)=>
{
    res.render("index")
    res.end()
})
router.use("/register",(req,res)=>{
    if(req.method==='GET'){
        res.render("register")
        res.end()
    }
    else
    {
    mysql_connect.getConnection((err,connection)=>
        {
        if(err){
            connection.release()
            res.send(err)
            res.end()
        }
        else{
            var name=req.body.name
            var email=req.body.email
            var password=req.body.password
            var confirmpassword=req.body.confirmpassword

            const q=`insert into register(name,email,password,confirmpassword)values('${name}','${email}','${password}','${confirmpassword}')`
            connection.query(q,(err)=>
            {
                if(err){
                    connection.release()
                    res.render()
                    res.end()
                }
                else{
                    res.render('index',{message:email+"added successfully"})
                    res.end()
                }
            })
        }
    })
    }
})

router.use("/login",(req,res)=>
    {
        if(req.method==='GET'){
            res.render("login")
            res.end()
        }
        else{
            mysql_connect.getConnection((err,connection)=>
            {
                if(err){
                    connection.release()
                    res.send(err)
                    res.end()
                }
                else{
                    var email=req.body.email
                    var password=req.body.password
                    const q=`select * from register where email='${email}' and password='${password}'`
                    connection.query(q,(err,data)=>
                {
        if(err){
            connection.release()
                    res.render(err)
                    res.end()
        }
        else{
                if(data.length>0)
                {
                    res.render("index")
                    res.end()
                }
                else
                {
                res.render('login',{message:"  incorrect password"})
                }
        }
    })
                    }
            })
        }
    }
    )
router.use("/about",(req,res)=>{
        res.render("about")
        res.end()
})
router.use("/apartment_rooms",(req,res)=>{
    res.render("apartment_rooms")
    res.end()
})
router.use("/blog",(req,res)=>{
    res.render("blog")
    res.end()
})
router.use("/contact",(req,res)=>{
    res.render("contact")
    res.end()
}
)
module.exports=router
