const mqtt=require("mqtt")
const pub=mqtt.connect("mqtt://broker.hivemq.com")
const topic="client1"
const subtopic="pub-topic"
pub.on("connect",()=>{
    console.log("pub connected");
})
const sub=mqtt.connect("mqtt://broker.hivemq.com")
sub.on("connect",()=>{
    sub.subscribe(subtopic)
    console.log("sub connected");
})
const express=require('express')
const app=express()
app.use(express.json())
app.listen(3000,()=>{
    console.log("Listening");
})
app.use(express.static('public'));

var recive_data="hello 2"

app.get("/pub2",(req,res)=>{
    res.sendFile(__dirname+"/pub.html")
    
})

app.get("/recive2",(req,res)=>{
    res.json({"message":recive_data})
})

app.post("/pub-post2",(req,res)=>{
    console.log(req.body.name)
    let data1=req.body.name
    let data2=req.body.data
    pub.publish(topic,data1.toString()+": "+data2.toString())
    res.json({"message":req.body})
})
 
sub.on("message",(topic,message)=>{
    console.log(message.toString());
    recive_data=message.toString()
})

