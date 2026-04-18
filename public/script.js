let ul = document.querySelector('ol')
let addTask = document.querySelector('.addTask')
let input = document.querySelector('input')
let btns = document.querySelector(".btns")



addTask.addEventListener("click", async(e)=>{
    

    console.log(input.value)

    let task = (input.value)

    input.value="";

    const data = await axios.post("/addTask",{task})

    console.log(data.data) //WHY data.data. ???

    display()
})

btns.addEventListener("click",(e)=>{
      let newActive = (e.target);

      let oldActive = document.querySelector(".active")

      oldActive.classList.remove('active')

      newActive.classList.add('active')

      display()
})



function display(){ 

    let active = document.querySelector('.active')

    let type = active.innerText;

    if(type==="ALL"){

        axios.get('/allTask')
        .then((data)=>{
            console.log(data.data)
            attach(data.data) //attach is the function created here
        })
    }

    else if(type==="Pending"){
        axios.get('/pendingTask')
        .then(({data})=>{
            attach(data)
        })
    }

    else if(type==="Completed"){
        axios.get('completedTask')
        .then(({data})=>{
            attach(data)
        })
    }
}

function attach(data){
    ul.innerHTML=''

    for(let i=0; i<data.length; i++){
       let li = document.createElement('li')

       li.innerHTML=`<span ">${data[i].task}</span>

            <div style="float:right" >
            <button>❌</button>
            <button>${data[i].status?"↩️":"✔️"}</button>
             </div>`


            //  li.style.backgroundColor = data[i].status? "green":""
             ul.appendChild(li)
    }
}

ul.addEventListener("click", async(e)=>{
    let btn = e.target

    let liText = btn.parentElement.previousElementSibling
    liText=liText.innerText

    if( btn.innerText==="✔️" ){
        await axios.post('updatedTask',({task:liText}))
        display()       
    }

    else if(btn.innerText==="↩️"){
        await axios.post('updatedTask',({task:liText}))
        display()
    }

    else if(btn.innerText==="❌"){
        await axios.post('deleteTask',({task:liText}))
        display()
    }
})

display()