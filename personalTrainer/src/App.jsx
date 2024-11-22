import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <Link to={"/"}></Link>
        <Link to={"/customers"}></Link>
        <Link to={"/training"}></Link>
        <Link to={"/calendar"}></Link>
        <Link to={"/statistics"}></Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;