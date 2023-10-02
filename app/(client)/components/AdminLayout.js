import { Poppins } from "next/font/google";
import Nav from "./Nav";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
});
const AdminLayout = ({ children }) => {
  return (
    <div className={`${poppins.className}`}>
      <div>
        <Nav />
      </div>

      <div className=" pl-2">{children}</div>
    </div>
  );
};

export default AdminLayout;
