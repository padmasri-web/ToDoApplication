const express= require('express');
const app=express();
const uuidv4 = require('uuid').v4;
const path = require('path')

app.use(express.static(path.join(__dirname,'public')))

//  uuidv4()
app.use(express.json())
app.use(express.urlencoded({extended:true}));
//data will be stored in Array
// {
// task,
// id,
// //date,
//status=>false ->pending , true->completed
// }

let arr=[];

// app.get('/',(req,res)=>{

//     res.send("hello world")
// })

//allTask = get
//addTask => post
//addMultipleTask => post
//pendingTask => get
//completeTask => get
//updatedTask => post
//delete => post


app.get('/xyz',(req,res)=>{
    res.send("started")
})

app.get('/allTask',(req,res)=>{
    res.send(arr);
})

app.post('/addTask',(req,res)=>{
    let {task} = req.body;
    
    for(let i of arr){
        if(task===i.task){
            res.send("the task already exist")
            return;
    }
        }
            


    let obj= {
        task,
        id :  uuidv4(),
        date: new Date().toDateString(),
        status:false
    }

    arr.push(obj);

    console.log(obj);
    res.send({
        ans:"the task has been added",
    obj})
})

// app.post('/addMultipleTask',)

app.post('/updatedTask',(req,res)=>{
    const {task}= req.body;
    let idx=-1;
    for(let i=0; i< arr.length;i++){
        if(arr[i].task===task){
           arr[i].status = !arr[i].status;
            idx=i;
            break;
        }

        
    }

    res.send({
       val: arr[idx],
 update:"updated successfully"})
})

app.get('/pendingTask',(req,res)=>{

    let pending = arr.filter((i)=> i.status==false)

    res.send(pending);
})

app.get('/completedTask',(req,res)=>{
     let completed= arr.filter((i)=> i.status==true)

    res.send(completed);
})

app.post('/deleteTask',(req,res)=>{
     const {task}= req.body;
     let newTask= arr.filter((i)=>task!=i.task)
     arr=newTask
     res.send(arr);
})


app.listen(4000,()=>{
    console.log("your port hve been started to 4000")
})