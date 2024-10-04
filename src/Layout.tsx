import { useOutlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

const Layout = () => {

  const outlet = useOutlet();

  return (
    <div className="flex flex-col items-center max-w-full gap-4 md:gap-8">
      <Header />
      {outlet}
      <Footer />
    </div>
  );
}

export default Layout;
