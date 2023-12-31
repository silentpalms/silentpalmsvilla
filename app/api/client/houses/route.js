import { NextResponse } from "next/server";
import House from "@/models/HouseModel";
import { connectMongoDB } from "@/lib/MongoConnect";



export async function GET(){
    try {
       await connectMongoDB()
       let houses;
       houses = await House.find({})
       return NextResponse.json({houses},{status:200}) 
    } catch (error) {
        return NextResponse.json({status:400},{message:"an error occured while trying to connect to the database"})
    }
}


export async function PUT(request) {
    const body = await request.json();
    const { details,
        images: requestImages, //Destructure the images array directly from req.body
        } =
      body;


    try {
      await connectMongoDB();
      let house;
      house = await House.findById(details.id);
      if (!house) {
        return res.status(404).json({ error: "House not found" });
      }
      //create a mapping of labels to URLs from the request body images
      const requestImagesMap = {};

      requestImages.forEach((image) => {
        requestImagesMap[image.label] = image.url;
      });

      house.images = house.images.map((image) => {
        if (requestImagesMap.hasOwnProperty(image.label)) {
          return { ...image, url: requestImagesMap[image.label] };
        }

        return image;
      });

      house.title = details.title ? details.title : house.title;
      house.amount = details.amount ? details.amount : house.amount;
      house.roomType = details.roomType ? details.roomType : house.roomType;
      house.description = details.description ? details.description : house.description;
      house.noOfGuests = details.noOfGuests ? details.noOfGuests : house.noOfGuests;

     

      await house.save()
  
      return NextResponse.json(
        { house },
        { headers: { "content-type": "application/json" } },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({message:"Error connecting to database"},{status:400})
     
    }
  }
  