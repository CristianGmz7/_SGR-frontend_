import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes/AppRouter"
import { useEffect, useState } from "react"
import { useAuthStore } from "./features/security/store"
import { CircularProgress } from "@mui/material"

export const App = () => {

  const [isLoading, setIsLoading] = useState(true)

  const validateAuthentication = useAuthStore(
    (state) => state.validateAuthentication
  );
  const user = useAuthStore(
    (state) => state.user
  );

  useEffect(() => {
    if(isLoading){
      validateAuthentication();
      setIsLoading(false);
    }
  }, [validateAuthentication, user])

  if(isLoading){
    return <CircularProgress />
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
