"use client"
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
    const data = monthNames.map((month) => {
      const matchingMonths = house.months.filter(
        (monthData) => monthData.name === month && monthData.bookingStatus === "Confirmed"
      );

      if (matchingMonths.length > 0) {
       
        const totalAmount = matchingMonths.reduce((total, monthData) => total + monthData.amount,0);

      
    
        return totalAmount
      } else {
       
        return 0; // Set the total amount to 0 if there are no matching months.
      }
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
      name: monthName,
    };


  
    datasets.forEach((dataset) => {
      const houseTitle = dataset.title;
      const houseSplit = houseTitle.split(" ");
      const modifiedHouseTitle =
        houseSplit[2] + " " + houseSplit[houseSplit.length - 1].slice(-2);

      const data = dataset.data[index];
 
 
     

      dataObj[modifiedHouseTitle] = data ? data : 0;
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
          index="name"
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