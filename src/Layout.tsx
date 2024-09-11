import { Link, useOutlet } from "react-router-dom";

const Layout = () => {

  const outlet = useOutlet();

  return (
    <div className="flex flex-col items-center">

      <header className="flex flex-col justify-center items-center bg-gradient-to-b bg-zinc-950 w-full h-24">
        <Link to="/">
          <h1 className="font-cinzel text-4xl font-bold item-center">Chess Bot Arena</h1>
        </Link>
      </header>

      <div className="my-8">
        {outlet}
      </div>
    </div>
  );
}

export default Layout;
