import { NextResponse } from "next/server";
import Reviews from "@/models/ReviewsModel";
import { connectMongoDB } from "@/lib/MongoConnect";



export async function GET(){
    try {
       await connectMongoDB()
       let reviews;
       reviews = await Reviews.find({})
       return NextResponse.json({reviews},{status:200}) 
    } catch (error) {
        return NextResponse.json({status:400},{message:"an error occured while trying to connect to the database"})
    }
}



  