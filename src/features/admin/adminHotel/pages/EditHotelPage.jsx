import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useHotels } from "../hooks";
import { CircularProgress } from "@mui/material";
import { EditHotelForm } from "../components";
import { HotelPreview } from "../../adminPage/components";

export const EditHotelPage = () => {

  const { hotelId } = useParams();
  const { hotelData, isLoading, error, loadHotelData, editHotel } = useHotels();

  const [editHotelInitValues, setEditHotelInitValues] = useState(null);
  const [hotelDto, setHotelDto] = useState(null);

  useEffect(() => {
    loadHotelData(hotelId);
    setEditHotelInitValues(hotelData?.data);
    setHotelDto(hotelData?.data)
  }, [hotelId])


  useEffect(() => {
    if (hotelData?.data) {
      setEditHotelInitValues({
        name: hotelData.data.name,
        address: hotelData.data.address,
        starsMichelin: hotelData.data.starsMichelin,
        numberPhone: hotelData.data.numberPhone,
        overview: hotelData.data.overview,
        description: hotelData.data.description,
        imageUrl: hotelData.data.imageUrl,
      });
      // setHotelDto(hotelData.data);
      setHotelDto(editHotelInitValues);
    }
  }, [hotelData]);

  // console.log(hotelData);    //objeto vacio y luego si tiene data
  // console.log(editHotelInitValues);   //nulo, undefined y luego tiene data
  // console.log(hotelDto);    //nulo, undefined y luego tiene data
  
  if (isLoading || !editHotelInitValues || !hotelDto) {
    return (
      <div className="flex flex-auto justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <EditHotelForm setHotelDto={setHotelDto} hotelDto={hotelDto} editHotelInitValues={editHotelInitValues}
        isLoading={isLoading} error={error} editHotel={editHotel} hotelId={hotelId}
      />
      {hotelDto && <HotelPreview hotelDto={hotelDto} />}
    </div>
  )
}
