import { NextResponse } from "next/server";
import User from "@/models/UsersModel";
import { connectMongoDB } from "@/lib/MongoConnect";
import { hash } from "bcrypt";



export async function GET(){
    try {
       await connectMongoDB()
       let users;
       users = await User.find({})
       return NextResponse.json({users},{status:200}) 
    } catch (error) {
        return NextResponse.json({status:400},{message:"an error occured while trying to connect to the database"})
    }
}


export async function POST(request) {
    const body = await request.json();
    let statusCode;
  
    // Assuming passed data is in JSON format: { fullName, email, mobile, password }
    const {username,email, roles } = body;

    const password = "diani1234"

  
    if (
      username == "" ||
      email == ""
    ) {
      statusCode = 400; // error status code
      return NextResponse.json(
        { message: "Fill in all fields" },
        { status: statusCode }
      );
    } else {
      try {
        await connectMongoDB();
        let userExist;
  
        userExist = await User.findOne({ email: email });

        if(userExist){
            statusCode = 409; // error status code
          return NextResponse.json(
            { message: "This email has been taken" },
            { status: statusCode }
          );
        }

        const hashedPassword = await hash(password, 10);
  
          const newUser = new User({
            username,
            password: hashedPassword,
            email,
            roles
           
          });

          userExist = newUser
  
          await userExist.save();
          statusCode = 201; // created status code
  
          return NextResponse.json(
            {userExist},
            { message: "User created successfully" },
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




  export async function DELETE(request){
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id')
  
    if(!id){
      return NextResponse.json({"message":"Id is required"}, {status:400})
    }
  
    try{
      await connectMongoDB();
      let user;
      user = await User.findByIdAndDelete(id)
      return NextResponse.json({"message":"User Deleted Successfully"}, {status:200})
    }catch(error){
      return NextResponse.json({"message":"Error occured while connecting "}, {status:500})
    }
  
  
  }
  