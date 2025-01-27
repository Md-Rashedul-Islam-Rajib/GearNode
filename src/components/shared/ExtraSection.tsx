import warranty from "../../../public/assets/Warranty-Banner.6a476a83.png";
import advRed from "../../../public/assets/ADV-red.jpg";
import { CardContent } from "../ui/card";
import { TextAnimate } from "../ui/text-animate";

const ExtraSection = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-8">
      {/* Warranty Image */}
      <img
        src={warranty}
        alt="Warranty details"
        className="w-full max-w-7xl mx-auto mb-8"
      />

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center my-8">
        GET ADV 160
      </h1>

      <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8 mx-auto">
        {/* ADV Image */}
        <img
          src={advRed}
          alt="Honda ADV 160"
          className="lg:w-[850px] h-auto"
        />

        {/* Specifications */}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold my-4 text-center">
            <span className="bg-slate-600 text-white rounded-xl px-4 py-2">
              Specifications
            </span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CardContent className="bg-slate-200 rounded-xl mt-1">
              {" "}
              <strong>
                <TextAnimate>Engine Type :</TextAnimate>
              </strong>{" "}
              <TextAnimate>
                4-Stroke, 4-Valve, SOHC, Liquid-Cooled, eSP+
              </TextAnimate>
            </CardContent>
            <CardContent className="bg-slate-200 rounded-xl mt-1">
              {" "}
              <strong>
                <TextAnimate>Displacement :</TextAnimate>
              </strong>{" "}
              <TextAnimate>157cc</TextAnimate>
            </CardContent>
            <CardContent className="bg-slate-200 rounded-xl mt-1">
              {" "}
              <strong>
                <TextAnimate>Starting System :</TextAnimate>
              </strong>
              <TextAnimate>Electric</TextAnimate>
            </CardContent>
            <CardContent className="bg-slate-200 rounded-xl mt-1">
              {" "}
              <strong>
                <TextAnimate>Break Type :</TextAnimate>
              </strong>{" "}
              <TextAnimate>
                Hydraulic Disc with ABS both front and rear
              </TextAnimate>
            </CardContent>
            <CardContent className="bg-slate-200 rounded-xl mt-1">
              {" "}
              <strong>
                <TextAnimate>Ignition System :</TextAnimate>{" "}
              </strong>
              <TextAnimate>Full Transisterized</TextAnimate>
            </CardContent>
            <CardContent className="bg-slate-200 rounded-xl mt-1">
              {" "}
              <strong>
                <TextAnimate>Tire Size (Front):</TextAnimate>
              </strong>
              <TextAnimate> 110/80-14M/C 53P (Tubeless)</TextAnimate>
            </CardContent>
            <CardContent className="bg-slate-200 rounded-xl mt-1">
              {" "}
              <strong>
                <TextAnimate>Tire Size (Rear):</TextAnimate>
              </strong>{" "}
              <TextAnimate>130/70-13M/C 57P (Tubeless)</TextAnimate>
            </CardContent>
            <CardContent className="bg-slate-200 rounded-xl mt-1">
              {" "}
              <strong>
                <TextAnimate>Seat Height:</TextAnimate>
              </strong>{" "}
              <TextAnimate>780 mm</TextAnimate>
            </CardContent>
            <CardContent className="bg-slate-200 rounded-xl mt-1">
              {" "}
              <strong>
                <TextAnimate>Ground Clearance:</TextAnimate>
              </strong>{" "}
              <TextAnimate>165 mm</TextAnimate>
            </CardContent>
            <CardContent className="bg-slate-200 rounded-xl mt-1">
              {" "}
              <strong>
                <TextAnimate>Maximum Torque:</TextAnimate>
              </strong>{" "}
              <TextAnimate>14.7 Nm @6500 rpm</TextAnimate>
            </CardContent>
            <CardContent className="bg-slate-200 rounded-xl mt-1">
              {" "}
              <strong>
                <TextAnimate>Maximum Power :</TextAnimate>
              </strong>{" "}
              <TextAnimate>11.8 kW @8500 rpm</TextAnimate>
            </CardContent>
            <CardContent className="bg-slate-200 rounded-xl mt-1">
              {" "}
              <strong>
                <TextAnimate>Overall Dimensions (L x W x H) :</TextAnimate>
              </strong>{" "}
              <TextAnimate>1,950 x 763 x 1,196 (mm)</TextAnimate>
            </CardContent>
            <CardContent className="bg-slate-200 rounded-xl mt-1">
              {" "}
              <strong>
                <TextAnimate>Fuel Tank Capacity :</TextAnimate>
              </strong>{" "}
              <TextAnimate>8 L</TextAnimate>
            </CardContent>
            <CardContent className="bg-slate-200 rounded-xl mt-1">
              {" "}
              <strong>
                <TextAnimate>Fuel Consumption :</TextAnimate>
              </strong>{" "}
              <TextAnimate>45.0 km/L</TextAnimate>
            </CardContent>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-8 text-justify leading-relaxed text-sm sm:text-base lg:px-8">
        The ADV160 is now equipped with a new generation 157cc, 4-Valve,
        Liquid-Cooled, eSP+ Engine, offering advanced technology with 4-valve
        mechanism and low friction technologies to provide excellent power
        output and environmental performance (Fuel Efficient). It delivers a
        maximum power of 11.8 kW @ 8,500 rpm and a top torque of 14.7 Nm @ 6,500
        rpm, which proves more than enough for a reliable ride that takes you
        from daily commuting to leisure trips. The ADV160 also comes packed with
        exciting features from riding safety to everyday convenience. <br />{" "}
        <br /> One is the new{" "}
        <strong>Honda Selectable Torque Control (HSTC)</strong>, an advanced
        feature that helps balance the work of the wheel rotation. This prevents
        the slipping of the rear tires, especially on wet and slippery roads.
        Also set to prevent wheel locking and increase stability in case of
        sudden braking is the <strong>Anti-lock Braking System (ABS)</strong>{" "}
        with Wavy Disc Brakes. The system provides better braking ability as
        well as an aggressive look. Also, for long-distance riders, the new USB
        charging port is a convenient addition to this latest model. <br />{" "}
        <br /> The ADV160 is available in three color variants:{" "}
        <strong>Matte Gunpowder Black Metallic</strong>,{" "}
        <strong>Matte Solar Red Metallic</strong>, and{" "}
        <strong>Matte Pearl Crater White</strong> with a suggested retail price
        of <strong>BDT 565000</strong>.
      </p>
    </div>
  );
};

export default ExtraSection;
