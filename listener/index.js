const express=require('express');
const app=express();


app.listen(3000,()=>{
   
})

app.set('view engine','ejs')
app.get('*',(req,res)=>{
    

    console.dir(req.query.url)
    // res.set('Content-Type', 'text/html')
    res.render(`closer.ejs`)
})