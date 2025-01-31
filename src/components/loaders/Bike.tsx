import Lottie from "lottie-react"
import bike from "../../../public/assets/loaders/bike.json";

const Bike = () => {
  return (
    <div>
      <Lottie animationData={bike} loop={true} />
    </div>
  )
}

export default Bike
