import { Button, Navbar } from "flowbite-react";
import { FaGithub } from "react-icons/fa";
import { useSelector } from "react-redux";
const Header = () => {
  const { pdfName } = useSelector((state) => state.dataSlice);
  return (
    <Navbar>
      <div>
        <a href="/" className="text-sm md:text-xl">
          <span className="py-1 px-2 rounded-md text-white bg-gradient-to-r to-blue-500 from-gray-800 via-green-900">
            PDF
          </span>
          Reader
        </a>
      </div>
      <div className="w-2/4 text-center">{pdfName}</div>
      <a
        href="https://github.com/TasnimAnas/PDF-Reader"
        target="_blank"
        className="hidden"
      >
        <Button color="transparent">
          <FaGithub size={19} className="mr-2" />
          GitHub
        </Button>
      </a>
      <Navbar.Toggle className="border md:hidden" />
      <Navbar.Collapse>
        <a
          href="https://github.com/TasnimAnas/PDF-Reader"
          target="_blank"
          className="flex items-center cursor-pointer hover:bg-slate-200 p-2"
        >
          <FaGithub size={19} className="mr-2" />
          GitHub
        </a>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
