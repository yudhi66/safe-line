import formSchema  from "../../common/index.js"


const validateForm =(req,res,next)=>{
    const formData=req.body;
    formSchema.validate(formData).catch(err=>{
        res.status(422).send(); 
    }).then(valid =>{
          if(valid){
             console.log("Form is good");
             next();
          }else{
            res.status(422).send(); 
            
          }
    });
}

export default  validateForm;