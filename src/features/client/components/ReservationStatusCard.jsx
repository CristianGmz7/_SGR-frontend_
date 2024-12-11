import { Button } from "@mui/material"

export const ReservationStatusCard = ({ reservation }) => {
  return (
    <div className="flex items-center justify-between text-blue-600 mb-6">
    <p className="font-bold">Estado:</p>
    <div className="flex items-center">
      <Button
        variant="outlined"
        sx={{
          color: `${reservation.condition === 'CONFIRMADA' ? '#fff' : '#00acee'}`,
          backgroundColor: `${reservation.condition === 'CONFIRMADA' ? '#00a135' : 'transparent'}`,
          borderColor: "#00acee",
          cursor: 'default',
          borderWidth: 2,
          borderStyle: 'solid',
          borderRadius: 1,
          marginRight: 1,
          '&:hover': {
            backgroundColor: `${reservation.condition === 'CONFIRMADA' ? '#00a135' : 'transparent'}`, // Keep the background color on hover
          },
        }}
      >
        Confirmado
      </Button>
      <Button
        variant="outlined"
        sx={{
          color: `${reservation.condition === 'COMPLETADA' ? '#fff' : '#00acee'}`,
          backgroundColor: `${reservation.condition === 'COMPLETADA' ? '#00a135' : 'transparent'}`,
          borderColor: "#00acee",
          cursor: 'default',
          borderWidth: 2,
          borderStyle: 'solid',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: `${reservation.condition === 'COMPLETADA' ? '#00a135' : 'transparent'}`, // Keep the background color on hover
          },
        }}
      >
        Completado
      </Button>
    </div>
  </div>
  )
}
