import Lottie from "lottie-react";
import gear from "../../../public/assets/loaders/Gear.json"

const Gear = () => {
  return (
    <div>
      <Lottie className="w-6 h-6" animationData={gear} loop={true} />
    </div>
  );
};

export default Gear;
