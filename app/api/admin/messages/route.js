import { NextResponse } from "next/server";
import Message from "@/models/MessageModel";
import { connectMongoDB } from "@/lib/MongoConnect";



export async function GET(){
    try {
       await connectMongoDB()
       let messages;
       messages = await Message.find({})
       if(messages){
        return NextResponse.json({messages},{status:200}) 
       }

       else{
        return NextResponse.json({message:"No messages found"},{status:404}) 
       }

      
       
    } catch (error) {
        return NextResponse.json({status:400},{message:"an error occured while trying to connect to the database"})
    }
}
export async function DELETE(request){
    const {id} = await request.json()
  
    if(!id){
      return NextResponse.json({"message":"Id is required"}, {status:400})
    }
  
    try{
      await connectMongoDB();
      let message;
      message = await Message.findByIdAndDelete(id)
      return NextResponse.json({"message":"Message Deleted Successfully"}, {status:200})
    }catch(error){
      return NextResponse.json({"message":"Error occured while connecting "}, {status:500})
    }
  
  
  }


  