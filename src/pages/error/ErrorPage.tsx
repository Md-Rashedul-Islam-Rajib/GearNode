import Lottie from "lottie-react"
import error from "../../../public/assets/loaders/error.json"


const ErrorPage = () => {
  return (
    <div className="h-screen w-screen">
      <Lottie animationData={error} loop={true} />
    </div>
  )
}

export default ErrorPage
