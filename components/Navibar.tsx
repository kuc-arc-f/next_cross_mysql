import Link from 'next/link';
import Head from 'next/head';
//
export default function Navibar(){
  return (
  <nav className="navbar navbar-expand-sm navbar-light bg-light">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link href="/">
              <a className="nav-link active" aria-current="page" >Home</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/apollo/tasks">
              <a className="nav-link active" aria-current="page" >Task</a>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item">
            <Link href="/login">
              <a className="nav-link active" aria-current="page" >Login</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
}
