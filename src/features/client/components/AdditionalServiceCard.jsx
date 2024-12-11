import { Checkbox } from "@mui/material";

export const AdditionalServiceCard = ({ id, name, price ,checked,toggleService}) => (
  <div
    className="bg-blue-100 rounded-lg p-4 shadow-lg hover:bg-blue-200 transition-colors"
  >
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        sx={{
          color: "#007bff",
          "&.Mui-checked": {
            color: "#007bff",
          },
        }}
        checked={checked}
        onChange={() => {
          toggleService?.({ id, name, price ,checked});
        }}
      />
      <label
        htmlFor={name}
        className="text-blue-600 flex justify-between w-full"
      >
        {name}
        <span className="text-end text-lime-600">${price}</span>
      </label>
    </div>
  </div>
)