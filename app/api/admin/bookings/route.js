import { NextResponse } from "next/server";
import Bookings from "@/models/BookingModel";
import { connectMongoDB } from "@/lib/MongoConnect";

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
  const {_id,house,
    houseId,
    user,
    fromDate,
    toDate,
    amount,
    totalDays,
    bookingStatus,
    guests,
    status,
    ApprovedBy,
    month} = body;

    console.log(body);

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
    booking.amount=amount
    booking.bookingStatus=bookingStatus
    await booking.save()
    return NextResponse.json({booking}, {status:200})
  }catch(error){
    console.log("Error connexting to the database");
    return NextResponse.json({  'message':"An error occured while trying to connect to the database"})
  }


 
}

