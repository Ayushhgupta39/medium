import { Auth, SignUpQuote } from "./components";

const Signup = () => {
  return (
    <div className="flex h-screen">
      {/* Left section: Signup Form */}
      <div className="w-full md:w-1/2">
        <Auth type={"signup"} />
      </div>

      {/* Right section: Testimonial */}
      <div className="w-1/2 hidden bg-slate-100 md:flex flex-col justify-center items-center p-8">
        <SignUpQuote
          quote={
            "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
          }
        />
      </div>
    </div>
  );
};

export default Signup;
