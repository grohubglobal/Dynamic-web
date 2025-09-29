import { Instagram, Linkedin, Mail, Phone, Twitter } from "react-feather";
import Logo from "../public/grohub-logo.png";
import Image from "next/image";
import Link from "next/link";

const userful = [
  { title: "Home", href: "#home" },
  { title: "About", href: "#about" },
  { title: "Vision", href: "#vision" },
  { title: "Events", href: "#events" },
  { title: "Interests", href: "#interests" },
  { title: "Resources", href: "#resources" },
];
const Footer = () => {
  return (
    <footer className=" bg-gradient-to-b from-gray-900 to-purple-900  ">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute top-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="  md:grid  grid-cols-2 place-items-center">
        
      {/* logo */}
      <div className="hidden md:block ">
        <Image  src={Logo} alt="footer logo" className="w-96" />
      </div>
      {/* content */}
      <div className="flex justify-between space-x-10 md:space-x-20">
        {/* useful links */}
        <div className="hidden md:block">
          <h1 className="font-semibold text-2xl text-center pb-5">
            Useful links
          </h1>
          <div className="border-l-4  border-white px-10 space-y-3 gap-5"> 
            {userful.map((item, index) => (
              <div key={index} className="cursor-pointer">
                <Link
                  href={item.href}
                  className="text-violet-500 hover:text-violet-800"
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* Get in touch */}
        <div>
          <h1 className="font-semibold text-2xl text-start pb-5">
            Get in touch
          </h1>
          <div className="border-l-4  border-white px-10 space-y-3">
            <p className="text-[12px] md:text-sm space-y-3">
              <span className="text-nowrap">
                Grohub{" "}
              </span>
              <br />
              Thrissur , Kerala 
            </p>

            <div className="email flex space-x-4">
              <Mail size={18} />{" "}
              <p className="text-[15px] md:text-sm">abc@gmail.com</p>
            </div>
            <div className="phone flex space-x-4">
              <Phone size={18} />{" "}
              <p className="text-[15px] md:text-sm">+91 00000000</p>
            </div>
            <p className="text-[15px] md:text-[18px] text-violet-400">
              Social media links
            </p>
            <div className="social-media-icons flex space-x-10">
              <Link href="/" target="_blank">
                <Instagram size={20} />{" "}
              </Link>
              <Link href="/" target="_blank">
                <Linkedin size={20} />
              </Link>
              <Link href="/" target="_blank">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
