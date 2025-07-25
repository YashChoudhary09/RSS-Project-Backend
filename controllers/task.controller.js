const Task = require("../models/task.model.js");

// task controller----
module.exports.taskHandle = async(req,res)=>{
   try{
     // checking admin
        if(req.user.role !== "admin"){
           return res.status(400).json({message:" Can not create Task !You are not Admin !",success:false})
        }

     let{title,description,shakhaaName} = req.body;

     if( !title || !description || !shakhaaName){
      return res.status(500).json({message:"Please Fill All Feilds..",success:false})
     }
   
    // saving task into db-----
    let newTask = await new Task({
        date:Date.now(),
        title:title,
        description:description,
        shakhaaName:shakhaaName,
       
    })
    console.log(newTask);
    await newTask.save();
    res.status(200).json({message:"task is added successfully !",success:true});
   }catch(err){
      res.status(500).json({message:"something went wrong when task is saved !",err:err.message,success:false});
   }
}

// show all tasks---
module.exports.showAllTasks = async(req,res) =>{
   try{
      let allTasks = await Task.find();
      if(!allTasks){
        return res.status(400).json({message:"No any task found !",success:false});
      } else{
         return res.status(200).json({allTasks});
      }

   } catch(err){
      console.log("error occur when fetching task data....",err);
       res.status(500).json({message:"something went wrong  !",err:err.message,success:false});
   }
}

// show specific task by id----
module.exports.findOneTask = async(req,res) =>{
   try{
         // checking admin
        if(req.user.role !== "admin"){
           return res.status(400).json({message:"You can not Update Task ! ",success:false})
        }

        let{id} = req.params;
        let foundedTask = await Task.findById(id);
        if(!foundedTask){
         return res.status(400).json({message:"No Any Task Found !....",success:false})
        }
        res.status(200).json({message:"Task is founded successfully..",success:true,foundedTask});

   }catch(err){
       console.log("error occur during fetching special task !.....",err);
         res.status(500).json({message:"something went wrong  !",err:err.message,success:false});
   }
}
// find task by title--
// ✅ New Route
module.exports.findTask = async (req, res) => {
  try {
    const { title,shakhaaName } = req.query;

    let query = [] ;
    if(title){
      query.push( { title: { $regex: title, $options: "i" }})
    }
      
     if(shakhaaName){
      query.push(  {shakhaaName:{$regex:shakhaaName,$options:"i"}})
    }

    const foundedTask = await Task.find(query.length ? {$or:query} : {});

    if (foundedTask.length === 0) {
      return res.status(404).json({ message: "No task found!", success: false });
    }

    res.status(200).json({ message: "task found!", success: true, foundedTask });
  } catch (err) {
    console.error("Error during task search:", err);
    res.status(500).json({ message: "Server Error!", success: false });
  }
};

// delete tasks----
module.exports.deleteTask = async(req,res) =>{
   try{
         // checking admin
        if(req.user.role !== "admin"){
           return res.status(400).json({message:" Can Not Delete The Task !You are not Admin !",success:false})
        }

        let{id} = req.params;
        let deletedTask = await Task.findByIdAndDelete(id);
        res.status(200).json({message:"Task Is Deleted Successfully !",success:true})
   }catch(err){
        console.log("error occur during deleting task !.....",err);
         res.status(500).json({message:"something went wrong  !",err:err.message,success:false});
   }
}


// edit task 
module.exports.editTask = async(req,res) =>{
   try{
          // checking admin
        if(req.user.role !== "admin"){
           return res.status(400).json({message:" Can Not Update The Task !You are not Admin !",success:false})
        }
        let{id} = req.params;
        let{input} = req.body;
        let updatedTask = await Task.findByIdAndUpdate(id,{
         title:input.title,
         description:input.description,
         shakhaaName:input.shakhaaName
        })
        res.status(200).json({message:"Task is updated successfully ! ....",success:true,updatedTask});
   }catch(err){
         console.log("error occur during updating task !.....",err);
         res.status(500).json({message:"something went wrong  !",err:err.message,success:false});
   }
}