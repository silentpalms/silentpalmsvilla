import { NextResponse } from "next/server";
import Message from "@/models/MessageModel";
import { connectMongoDB } from "@/lib/MongoConnect";



export async function POST(request){

    const body = await request.json()
    let statusCode

    const {user_name,user_email, user_phone, user_message} = body;
    if (
        user_message == ""    
      ) {
        statusCode = 400; // error status code
        return NextResponse.json(
          { message: "Please add a message" },
          { status: statusCode }
        );
      } else {
        try {
          await connectMongoDB();
         let newMessage
         newMessage = new Message({
              user_name,
              user_message,
              user_phone,
              user_email           
            });
  
    
            await newMessage.save();
            statusCode = 201; // created status code
    
            return NextResponse.json(
              {newMessage},
              { message: "message posted successfully" },
              { status: statusCode },
             
            );
           
        } catch (error) {
          statusCode = 400; // error status code
          return NextResponse.json(
            { message: "Error connecting to database", error },
            { status: statusCode }
          );
        }
      }
}



  