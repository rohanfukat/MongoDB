const express = require("express")
const app = express();
const mongoose = require("mongoose");
const validator = require("validator")
const mongoDb = "mongodb://0.0.0.0:27017/MyDb"


mongoose.set('strictQuery',false)

mongoose.connect(mongoDb,(err)=>{
    if(err) console.log(`unable to connect to server : ${err}`)
    else
    console.log("Connected Successfully to Database");
})

app.listen(5000,()=>{
    console.log("Server is listening on port : 5000")
})

//defining the schema . schema is the structure of the documents

const mySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollno: {
        type: Number,
        validate(value) {
            if (value.length < 0)
                console.log("Please Enter valid Roll No");
        }
    },
    department: {
        type: String,
        enum: ["TYCO", "FYCO"], //adding validation  refer mongoose docs for more
    },
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email ID");
            }
        }
    },
    status: Boolean,
    date: {
        type: Date,
        default: Date.now()
    },
    token: String,
    createdAt: { type: Date, default: Date.now(), index: { expires: 10 } },
    datearr: {
        type: Array
    }
})

//Model  is a wrapper of Mongoose Schema
//Mongoose model provides an interface to the database for creating , querying , updating , deleting records,etd

//collection creation
// const main = async() =>
// {
// const Myschema = new mongoose.model("MySchema",mySchema)
// //the 1st param in model should be singular it will automatically converted to plural by mongoose


// let data = new Myschema({name:"Rohan G. Fukat",rollno:1846,department:"TYCO",status:true})
// const result = await data.save();
// console.log(result);
// }

//Model Name Myschema
const Myschema =  new mongoose.model("MySchema",mySchema)

//create document or insert
//Insert Mulitple documents
const FDocs = async() =>{
    try{
            const data = await new Myschema({
            name:"Rohan Fukat",
            rollno : 1846,
            department : "TYCO-1",
            status : true,
            //no need of data as it is set by default
                                    })

        const data1 = new Myschema({
            name:"Vedant Chaudhary",
            rollno : -1833,
            department : "TYCO-1",
            status : true,
                                    })

        const data2 = new Myschema({
            name:"Hiren Darji",
            rollno : 1859,
            department : "TYCO-1",
            status : true,
                                    })
                                    
        const data3 = new Myschema({
            name:"Kulsum Khan",
            rollno : 1860,
            department : "TYCO-1",
            status : true,
                                    })

        const result = await Myschema.insertMany([data,data1,data2,data3]);
        //if single docs then then use the const na
        console.log(result);
    }
        catch(error)
        {
            console.log(error)
        }
    }

//FDocs()


//For Single docs
const stud1 = async() => {

    try{
            var fdata = new Myschema({
            name:"Demo student",
            rollno : 1855, //rollno validation it is saved to db as exception is not handled
            department : "TYCO",// It throws error as  department is validated for TYCO,FYCO only
            status : true,
            email:"rohanfukat@email.co.in",
            token : "rohandf uasdfklasd fs"
                                    })

        const result1 = fdata.save();
        console.log(result1);
        }
        catch(error)
        {
            console.log(error)
        }
}
stud1()




//Reading Query
const getDocs = async() =>{
    try{
        var a = "Rohan Fukat"
        const result = await Myschema
        .find({$and : [{rollno : { $gt : 1800}}]}).sort({name:-1});
        //the $gt is greater than , $lt for less than , $and for and operation and so on...
        //.find({department : { $in : ["TYCO-1",TYCO-2]}})
        //.find({name: a})
        //.select({rollno:1})
        //.limit(1);
        //count is used to display how many numbers
        //sort is used for sorting the data based on key
        console.log(result);
    }
    catch(error)
    {
        console.log(error)
    }   
    //To find a particular query use key value pair of the docs you need to searchd
    //To read all the data don't pass any query in find ()
    //To show only particular data use select() 
    //limit is used to display how many data 
}
// getDocs()

//update documents
const updateDocs = async(id)=>{
    try{
        const result = await Myschema.updateOne({_id : id},{
                $set:{
                    name : "ROHAN G. FUKAT"
                }
        });
        console.log(result) ; //here result defines only the no.of documents that are updated
        //findByIdAndUpdate is used to dipslay data in the database before updation, it is used instead of updateOne
    }
    catch(err)
    {
        console.log(err)
    }
}
//updateDocs("63dded45104e2a7f339e26cc")


const deleteDocs = async(id)=>{
    try{
        const result = await Myschema.deleteOne({_id : id})
        console.log(result);
        //deleteMany and findByIdAndDelete is used to display the docs instead of deleteOne()
    
    }catch(e)
    {
        console.log(e)
    }
}


//deleteDocs("63dded45104e2a7f339e26cc") 

//display json to html table function 



const jsontoarray = async(id)=>{
    try{
        const studjson= await Myschema.find({_id: id})
        const studarr = studjson;
        console.log(studarr);
    }
    catch(e)
    {
        console.log(e)
    }
}

// jsontoarray("63dded45104e2a7f339e26c9");












