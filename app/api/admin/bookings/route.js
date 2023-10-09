import { NextResponse } from "next/server";
import Bookings from "@/models/BookingModel";
import { connectMongoDB } from "@/lib/MongoConnect";
import House from "@/models/HouseModel";

export async function GET(){
 try {
    await connectMongoDB()
    let bookings;
    bookings = await Bookings.find({})
    if(bookings){
      return NextResponse.json({bookings}, {status:200})
    }

    else{
      return NextResponse.json({message:"No bookings found"}, {status:404})
    }
   
 } catch (error) {
    return NextResponse.json({status:500}, {message:"Error connecting to the database"})
 }
}

export async function PUT(request) {
  const body = await request.json();
  const {_id,   
    amount,
    bookingStatus,  
    ApprovedBy} = body;



  if(!_id) {
    console.log("Please insert a booking id");
    return NextResponse.json({  'message':"booking id required"})
  }

  try{
    await connectMongoDB()

    let booking;
    booking= await Bookings.findById(_id)

    if(!booking){
      return NextResponse.json({  'message':"no such booking"})
    }
    booking.amount += amount
    booking.bookingStatus=bookingStatus
    booking.ApprovedBy=ApprovedBy
    await booking.save()
    return NextResponse.json({booking}, {status:200})
  }catch(error){
    console.log("Error connexting to the database");
    return NextResponse.json({  'message':"An error occured while trying to connect to the database"})
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
    let booking;
    booking = await Bookings.findByIdAndDelete(id)
    return NextResponse.json({"message":"Booking Deleted Successfully"}, {status:200})
  }catch(error){
    return NextResponse.json({"message":"Error occured while connecting "}, {status:500})
  }


}

