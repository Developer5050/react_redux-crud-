import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../features/userDetailsSlice";

const Navbar = () => {

  const allUsers = useSelector((state) => state.app.users)

  const [searchData , setSearchData] = useState("")

  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(searchUser(searchData));
  },[searchData])

  return (
    <div>
      <nav className="navbar navbar-expand-xl navbar-light bg-light w-100">
        <div className="container-fluid">
          <h4 className="navbar-brand fs-6">
            RTK
          </h4>

          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                >
                  Create Post
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/read"
                >
                  All Posts ({allUsers.length})
                </Link>
              </li>
            </ul>

            <form className="d-flex w-50">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e)=> setSearchData(e.target.value)}
              />
              {/* <button className="btn btn-outline-success" type="submit">
                Search
              </button> */}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
