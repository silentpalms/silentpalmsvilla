import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/MongoConnect";
import Bookings from "@/models/BookingModel";
import House from "@/models/HouseModel";
import moment from "moment";

export async function GET() {
return NextResponse.json({message:"This method is not allowed"},{status:405},{headers:"Allow: GET"})

}

export async function POST(request){
    const body = await request.json()
    console.log(body);


    const { fromDate, toDate, house, user, amount, totalDays, houseId, guests,reference } =
    body

    try {
        await connectMongoDB();
        const newBooking = new Bookings({
          fromDate,
          toDate,
          house,
          user,
          amount,
          totalDays,
          houseId,
          guests,
          referenceNumber:reference
        });
        const booking = await newBooking.save();

   
        let houseTemp;
    
        houseTemp = await House.findById(houseId);
    
        if (!houseTemp) {
          return NextResponse.json({ message: "House not found" }, {status:404});
        }
    
        const bookingAmount = amount;
        if (houseTemp) {
          let id = houseTemp._id.toString();
    
          if (id === "64cb76d7749814f1a4db72d6") {
            const month = moment(fromDate, "DD-MM-YYYY").format("MMMM");
            houseTemp.months.push({
              name: month,
              amount: bookingAmount,
              bookingStatus: booking.bookingStatus,
              bookingId: booking._id,
            });
            houseTemp.currentBookings.push({
              bookingId: booking._id,
              fromDate,
              toDate,
              status: booking.status,
            });

            await houseTemp.save(); 
    
            const house2 = await House.findById("64cb85de749814f1a4db72e0");
            if (house2) {
              house2.currentBookings.push({
                bookingId: booking._id,
                fromDate,
                toDate,
                status: booking.status,
              });
            }
            await house2.save();
            return NextResponse.json({message:"Booking confirmed "}, {status:200})
          } else if (id === "64cb85de749814f1a4db72e0") {
            const month = moment(fromDate, "DD-MM-YYYY").format("MMMM");
            houseTemp.months.push({
              name: month,
              amount: bookingAmount,
              bookingStatus: booking.bookingStatus,
              bookingId: booking._id,
            });
            houseTemp.currentBookings.push({
              bookingId: booking._id,
              fromDate,
              toDate,
              status: booking.status,
            });

            await houseTemp.save();
    
            const house2 = await House.findById("64cb76d7749814f1a4db72d6");
            if (house2) {
              house2.currentBookings.push({
                bookingId: booking._id,
                fromDate,
                toDate,
                status: booking.status,
              });
            }
            await house2.save();
            return NextResponse.json({message:"Booking confirmed "}, {status:200})
          } else if (id === "64cb781f749814f1a4db72da") {
            const month = moment(fromDate, "DD-MM-YYYY").format("MMMM");
      
            houseTemp.months.push({
              name: month,
              amount: bookingAmount,
              bookingStatus: booking.bookingStatus,
              bookingId: booking._id,
            });
            houseTemp.currentBookings.push({
              bookingId: booking._id,
              fromDate,
              toDate,
              status: booking.status,
            });

            await houseTemp.save();
    
            const house2 = await House.findById("64cb8590749814f1a4db72de");
            if (house2) {
              house2.currentBookings.push({
                bookingId: booking._id,
                fromDate,
                toDate,
                status: booking.status,
              });
            }
            await house2.save();
            return NextResponse.json({message:"Booking confirmed "}, {status:200})
          } else if (id === "64cb8590749814f1a4db72de") {
            const month = moment(fromDate, "DD-MM-YYYY").format("MMMM");
            houseTemp.months.push({
              name: month,
              amount: bookingAmount,
              bookingStatus: booking.bookingStatus,
              bookingId: booking._id,
            });
            houseTemp.currentBookings.push({
              bookingId: booking._id,
              fromDate,
              toDate,
              status: booking.status,
            });

            await houseTemp.save();
    
            const house2 = await House.findById("64cb781f749814f1a4db72da");
            if (house2) {
              house2.currentBookings.push({
                bookingId: booking._id,
                fromDate,
                toDate,
                status: booking.status,
              });
            }
            await house2.save();
            return NextResponse.json({message:"Booking confirmed "}, {status:200})
          } else {
            const month = moment(fromDate, "DD-MM-YYYY").format("MMMM");
            houseTemp.months.push({
              name: month,
              amount: bookingAmount,
              bookingStatus: booking.bookingStatus,
              bookingId: booking._id,
            });
            houseTemp.currentBookings.push({
              bookingId: booking._id,
              fromDate,
              toDate,
              status: booking.status,
            });
          }
          await houseTemp.save();
    
          return NextResponse.json({houseTemp}, {message:"Booking confirmed "}, {status:200})
        }
      } catch (err) {
        console.error(err);
        res.status(400).send({ err, msg: "Something went wrong" });
      }
}