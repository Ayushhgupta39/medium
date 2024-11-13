import { Auth, SignUpQuote } from "./components";

const Signin = () => {
  return (
    <div className="flex h-screen">
      {/* Left section: Login Form */}
      <div className="w-full lg:w-1/2">
        <Auth type={"signin"} />
      </div>

      {/* Right section: Testimonial */}
      <div className="w-1/2 hidden bg-slate-100 lg:flex flex-col justify-center items-center p-8">
        <SignUpQuote
          quote={
            "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
          }
        />
      </div>
    </div>
  );
};

export default Signin;
