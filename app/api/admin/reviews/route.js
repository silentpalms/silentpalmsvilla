import { NextResponse } from "next/server";
import Reviews from "@/models/ReviewsModel";
import { connectMongoDB } from "@/lib/MongoConnect";



export async function GET(){
    try {
       await connectMongoDB()
       let reviews;
       reviews = await Reviews.find({})
       if(reviews){
        return NextResponse.json({reviews},{status:200}) 
       }

       else{
        return NextResponse.json({message:"No reviews found"},{status:404}) 
       }
    } catch (error) {
        return NextResponse.json({status:400},{message:"an error occured while trying to connect to the database"})
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
      let review;
      review = await Reviews.findByIdAndDelete(id)
      return NextResponse.json({"message":"Review Deleted Successfully"}, {status:200})
    }catch(error){
      return NextResponse.json({"message":"Error occured while connecting "}, {status:500})
    }
  
  
  }