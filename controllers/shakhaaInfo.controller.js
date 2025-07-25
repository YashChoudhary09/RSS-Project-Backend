const Shakhaa = require("../models/shakhaaInfo.model.js");
const Image = require("../models/shakhaaimage.model.js");

// save shakhaa info -----
module.exports. saveShakhaaInfo = async(req,res)=>{
    try{
     // checking admin
        if(req.user.role !== "admin"){
           return res.status(400).json({message:" Can not create Shakhaa !You are not Admin !",success:false})
        }

        let {vibhaag,jila,nagar,basti,shakhaaName,adminName,address,contactNumber,role} = req.body;  
    // checking previous shakhaa --
        let previousInfo = await Shakhaa.findOne({shakhaaName});
        if(previousInfo){
           return res.status(400).json({message:"Shakhaa has already saved",success:false});
        }

        if(!shakhaaName){
         return res.status(400).json({message:"Please Fill ShakhaaName !",success:false})
        }
    // saving shakhaa in db--
       let newShakhaa = await new Shakhaa({
          vibhaag:vibhaag,
          jila:jila,
          nagar:nagar,
          basti:basti,
          shakhaaName:shakhaaName,
          adminName:adminName,
          address:address,
          contactNumber:contactNumber,
          role:role,
       })
       console.log(newShakhaa);
       await newShakhaa.save();
       res.status(200).json({message:"shakhaa successfully saved !",success:true})
    }catch(err){
      console.log("error occur during save shakhaa :",err);
        res.status(500).json({message:"some error occur during saving shakhaa",success:false});
    }
}

// save images---
module.exports.saveShakhaaImages = async(req,res)=>{
  try{
      // checking admin
        if(req.user.role !== "admin"){
           return res.status(400).json({message:" Can not create Shakhaa !You are not Admin !",success:false})
        }

        let{url,date} = req.body;
        if(!url){
         return res.status(500).json({message:"Please Select Picture !",success:false})
        }
        const saveImage = await new Image({
         url:url,date:Date.now(),
        });
       
        await saveImage.save();
        res.status(200).json({message:"Image Is Saved Successfully...!",success:true});
  }catch(err){
        console.log("error occur during save images -- ",err);
        res.status(500).json({message:"Server Error !",success:false});
  }
}

// show all shakhaa info----
module.exports.allShakhaaInfo = async(req,res)=>{
 try{
     let allShakhaa = await Shakhaa.find();

     if(!allShakhaa){
      return res.status(400).json({message:"No any shakhaa found !",success:false});
     } else{
      return res.status(200).json({message:"SuccessFully found Shakhaas",success:true,allShakhaa});
     }

     
   }   catch(err){
         console.log(err);
         res.status(500).json({message:"Server Error !",success:false});
      }
  
}

// show individual shakhaa info by id----
module.exports.findOneShakhaa = async(req,res) =>{
   try{
         // checking admin
        if(req.user.role !== "admin"){
           return res.status(400).json({message:"You can not Update Shakhaa ! ",success:false})
        }
         let{id} = req.params;
        let foundedShakhaa = await Shakhaa.findById(id);
        res.status(200).json({message:"Shakhaa is founded successfully!",foundedShakhaa});
       
   }catch(err){
      console.log("error occur during accessing shakhaa : ",err);
        res.status(500).json({message:"Server Error !",success:false});
   }
}
// found shakhaa by name---
module.exports.findShakhaaByName = async (req, res) => {
  try {
    const { name } = req.params;

    // Admin check (optional if you want only admins to search)
    if (req.user.role !== "admin") {
      return res.status(400).json({ message: "Not authorized!", success: false });
    }

    const foundedShakhaa = await Shakhaa.find({ shakhaaName: { $regex: name, $options: "i" } });

    if (foundedShakhaa.length === 0) {
      return res.status(404).json({ message: "No shakhaa found!", success: false });
    }

    res.status(200).json({ message: "Shakhaa found!", success: true, foundedShakhaa });
  } catch (err) {
    console.error("Error during shakhaa search:", err);
    res.status(500).json({ message: "Server Error!", success: false });
  }
};

// show images--
module.exports.allShakhaaImages = async(req,res) =>{
   try{
        let images = await Image.find();
         if(!images || images.length === 0){
      return res.status(400).json({message:"No any picture found !",success:false});
     } else{
         return res.status(200).json({images,success:true});
     }
      
   }catch(err){
        console.log(err);
         res.status(500).json({message:"Server Error !",success:false});
   }
}

// delete shakhaa--
module.exports.deleteShakhaa = async(req,res) =>{
   try{
           // checking admin
        if(req.user.role !== "admin"){
           return res.status(400).json({message:"You can not delete Shakhaa ! ",success:false})
        }

        let{id} = req.params;
        let deleteShakhaa = await Shakhaa.findByIdAndDelete(id);
        res.status(200).json({message:"Shakhaa is deleted successfully!",success:true});
      //   checking shakhaa---
        if(!deleteShakhaa){
         return res.status(400).json({message:"Shakhaa is not found !",success:false});
        }

   } catch(err){
       console.log("error occur during deleting shakhaa ! :",err);
       re.status(500).json({message:"Server Error !",success:false});
   }
}





// delet shakhaa images--
module.exports.deleteShakhaaImage = async(req,res) =>{
   try{
           // checking admin
        if(req.user.role !== "admin"){
           return res.status(400).json({message:"You can not delete Shakhaa ! ",access:false})
        }

        let{id} = req.params;
        let deleteImage = await Image.findByIdAndDelete(id);
        res.json({ message: "Image removed successfully", deleteImage });
   } catch(err){
       console.log("error occur during deleting image! :",err);
      res.status(500).json({ message: "Error deleting image", error: err });
   }
}

// edit shakhaa---
module.exports.editShakhaa = async (req, res) => {
  try {
    // checking admin
    if (req.user.role !== "admin") {
      return res.status(400).json({
        message: "You can not edit Shakhaa!",
        access: false
      });
    }

    let { id } = req.params;
    let { input } = req.body;

    // Check for shakhaaName
    if (!input.shakhaaName || input.shakhaaName.trim() === "") {
      return res.status(400).json({
        message: "Please Fill ShakhaaName !",
        success: false
      });
    }

    let updateShakhaa = await Shakhaa.findByIdAndUpdate(
      id,
      {
        vibhaag: input.vibhaag,
        jila: input.jila,
        nagar: input.nagar,
        basti: input.basti,
        shakhaaName: input.shakhaaName,
        adminName: input.adminName,
        contactNumber: input.contactNumber,
        address: input.address,
        role: input.role,
      },
      { new: true } // returns updated doc
    );

    if (!updateShakhaa) {
      return res.status(404).json({ message: "Shakhaa not found", success: false });
    }

    res.status(200).json({
      message: "Shakhaa Updated Successfully...",
      success: true
    });

  } catch (err) {
    console.log("Error during update shakhaa:", err);
    res.status(500).json({ message: "Server Error !" });
  }
};

// found individual shakhaa----
