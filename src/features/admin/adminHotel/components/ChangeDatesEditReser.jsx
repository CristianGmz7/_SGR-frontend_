import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import esMx from "dayjs/locale/es-mx";

export const ChangeDatesEditReser = ({
  reservation,
  onChange,
  state: { startDate, finishDate },
}) => {
 
  console.info({startDate})
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
              value={typeof startDate === "string" ? dayjs(startDate) : dayjs(startDate)}
              // cuando se cambie la fecha se setean en el estado de fecha inicial
              onChange={(newDate) => {
                console.info(newDate.toISOString())
                onChange({
                  startDate: newDate.toISOString(),
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
              value={typeof finishDate === "string" ? dayjs(finishDate) : finishDate}
              minDate={typeof startDate === "string" ? dayjs(startDate) : startDate}
              onChange={(newDate) => {
                onChange({
                  startDate: startDate,
                  finishDate: newDate.toISOString(),
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
