import axios from "axios"
import { useEffect } from "react"

function App() {

  const testAPI = async () => {
    const response = await axios.get("/api")
    console.log(response.data)
  }

  useEffect(() => {
    testAPI()
  }, [])

  return (
    <>
      <h1 className="text-red-500">FINAL PROJECT</h1>
    </>
  ) 
}

export default App
