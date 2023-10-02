import { NextResponse } from "next/server";
import Bookings from "@/models/BookingModel";
import { connectMongoDB } from "@/lib/MongoConnect";

export async function GET(){
 try {
    await connectMongoDB()
    let bookings;
    bookings = await Bookings.find({})
    return NextResponse.json({bookings}, {status:200})
 } catch (error) {
    return NextResponse.json({status:500}, {message:"Error connecting to the database"})
 }
}