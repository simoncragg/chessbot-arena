import { useOutlet } from "react-router-dom";

const Layout = () => {

  const outlet = useOutlet();

  return (
    <div className="flex flex-col items-center mt-16 mx-4">
      {outlet}
    </div>
  );
}

export default Layout;
