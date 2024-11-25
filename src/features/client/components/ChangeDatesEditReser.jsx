import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import esMx from "dayjs/locale/es-mx";

export const ChangeDatesEditReser = ({
  reservation,
  onChange,
  state: { startDate, finishDate },
}) => {
 
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esMx}>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          {/* Inicio Campo de check-in */}
          <div className="flex flex-col gap-2">
            <label htmlFor="check-in" className="text-sm font-medium">
              Nueva fecha de inicio
            </label>
            <DatePicker
              value={startDate}
              // cuando se cambie la fecha se setean en el estado de fecha inicial
              onChange={(newDate) => {
                //COMO SE TENIA ANTES
                // onChange({
                //   reservationStartDate: newDate,
                //   reservationFinishDate: finishDate,
                // });
                onChange({
                  startDate: newDate,
                  finishDate: finishDate,
                });
              }}
              // se le coloca una fecha minima y un formato a mostrar
              minDate={dayjs()}
              format="DD/MM/YYYY"
            />
          </div>
          {/* Fin Campo de check-in */}
          {/* Inicio Campo de check-out */}
          <div className="flex flex-col gap-2">
            <label htmlFor="check-out" className="text-sm font-medium">
              Nueva fecha de fin
            </label>
            <DatePicker
              format="DD/MM/YYYY"
              value={finishDate}
              minDate={startDate}
              onChange={(newDate) => {
                onChange({
                  startDate: startDate,
                  finishDate: newDate,
                });
              }}
            />
          </div>
          {/* Fin Campo de check-out */}
        </div>
      </LocalizationProvider>
    </>
  );
};
