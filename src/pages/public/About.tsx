import about from "../../../public/assets/about--page.jpeg";

const About = () => {
  return (
    <div className="relative min-h-screen bg-[url('/assets/about.jpg')] bg-cover bg-center flex justify-center items-center text-white px-6">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-950/70"></div>

      <div className="relative z-10 my-6 md:my-0 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full items-center">
        {/* Text Section */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg leading-relaxed">
            We at <span className="font-semibold">GearNode</span> dream of a
            better world where people, technology, and the environment live as
            one. Our products and processes are designed to provide safe,
            efficient, and eco-friendly technology that serves both people and
            the community. At our Batangas plant, a dream that has turned into a
            20-hectare reality, we continue our mission to offer life-building
            technology.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={about}
            alt="About GearNode"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
