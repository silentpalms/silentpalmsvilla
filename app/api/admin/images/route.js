import { NextResponse } from "next/server";
import Image from "@/models/ImagesModel";
import { connectMongoDB } from "@/lib/MongoConnect";

export async function GET() {
  try {
    await connectMongoDB();
    let images;
    images = await Image.find({});
    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: 400 },
      { message: "an error occured while trying to connect to the database" }
    );
  }
}

export async function POST(request) {
  const body = await request.json();

  let statusCode;

  const { name, imageUrls } = body;

  if (name == "" || imageUrls == "") {
    statusCode = 400; // error status code
    return NextResponse.json(
      { message: "Fill in all fields" },
      { status: statusCode }
    );
  } else {
    try {
      await connectMongoDB();

      let imageExist = await Image.findOne({ "imageDetails.name": name });

      if (imageExist) {
        imageExist.imageDetails
          .find((detail) => detail.name === name)
          .imageUrls.push({ imageUrls });
        await imageExist.save();
        statusCode = 200; // success status code
        return NextResponse.json(
          {
            message: `Added imageUrl to existing document with name: ${name}`,
          },
          { status: statusCode }
        );
      } else {
        const newImage = new Image({
          imageDetails: [
            {
              name,
              imageUrls: [{ imageUrls }],
            },
          ],
        });
        await newImage.save();
        return NextResponse.json(
          { message: "Image added successfully" },
          { status: 200 }
        );
      }
    } catch (error) {
      console.error(error);
      statusCode = 400; // error status code
      return NextResponse.json(
        { message: "Error connecting to database", error },
        { status: statusCode }
      );
    }
  }
}

// export async function DELETE(request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");

//   if (!id) {
//     return NextResponse.json({ message: "Id is required" }, { status: 400 });
//   }

//   try {
//     await connectMongoDB();
//     let user;
//     user = await User.findByIdAndDelete(id);
//     return NextResponse.json(
//       { message: "User Deleted Successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error occured while connecting " },
//       { status: 500 }
//     );
//   }
// }
