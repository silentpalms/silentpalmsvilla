import { useEffect, useState } from "react";
import { Card, Title, BarChart, Subtitle } from "@tremor/react";
import axios from "axios";
import { format } from "date-fns";

const dataFormatter = (number) => {
  return "Kshs " + Intl.NumberFormat("us").format(number).toString();
};

const currentDate = new Date();


const currentMonth = format(currentDate, "MMMM");


export default function SimpleCharts() {
  const [housesArray, setHousesArray] = useState([]);
  const [monthArray, setMonthArray] = useState([currentMonth]);


  const monthNames = [currentMonth];



 

  // Create datasets for each house
  const datasets = housesArray.map((house, index) => {

   
    const data = monthArray.map((monthArray) => {
      const monthData = house.months.find(
        (month) =>
          month.name === monthArray && month.bookingStatus === "Confirmed"
      );

     

      return monthData && monthData.name !== ""
        ? { name: monthData.name, amount: monthData.amount }
        : null;
    });

    

    return {
      title: house.title,
      
      data,
    };
  });



  const houseTitles = datasets.map((dataset) => {
    const houseTitle = dataset.title;

    const houseSplit = houseTitle.split(" ");

    const modifiedHouseTitle =
      houseSplit[2] + " " + houseSplit[houseSplit.length - 1].slice(-2);

    return modifiedHouseTitle;
  });

  const chartdata = monthNames.map((monthName, index) => {
    const dataObj = {
      month: monthName,
    };

   

    datasets.forEach((dataset) => {
      const houseTitle = dataset.title;
      const houseSplit = houseTitle.split(" ");
      const modifiedHouseTitle =
        houseSplit[2] + " " + houseSplit[houseSplit.length - 1].slice(-2);

    

      const data = dataset.data[index];
     

      dataObj[modifiedHouseTitle] = data ? data.amount : 0;
    });

    return dataObj;
  });

 

  useEffect(() => {
    async function getHouses() {
      try {
        const response = await axios.get("/api/admin/houses");
        

        setHousesArray(response.data.houses);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    getHouses();
  }, []);
  return (
    <div className="">
      <Card >
        <Title className="text-black">MONTHLY REVENUE</Title>
        <BarChart
          className="pt-2"
          data={chartdata}
          index="month"
          categories={houseTitles}
          colors={[
            "red",
            "teal",
            "blue",
            "green",
            "black",
            "purple",
            "stone",
            "yellow",
          ]}
          valueFormatter={dataFormatter}
          yAxisWidth={80}
        />
      </Card>
    </div>
  );
}
