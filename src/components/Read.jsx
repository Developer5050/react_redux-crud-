import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailsSlice";
import CustomModel from "./customModel/CustomModel";
import { Link } from "react-router-dom";

const Read = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);

  const [selectedGender, setSelectedGender] = useState("");

  const { users, loading, searchData } = useSelector((state) => state.app); // app bascially store used

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const filteredUsers = users?.filter((ele) => {
    const matchesSearch =
      searchData.length === 0 ||
      ele.name.toLowerCase().includes(searchData.toLowerCase());
    const matchesGender =
      selectedGender === "" || ele.gender === selectedGender;
    return matchesSearch && matchesGender;
  });

  return (
    <>
      {showPopup && (
        <CustomModel
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <div className="container">
        <h2 className="mt-3 mb-3 fw-bold fs-4 text-center">All Data</h2>

        <div className="mb-3 text-center">
          <label className="me-2 fw-bold">Filter by Gender:</label>
          <select
            className="p-1 rounded-3"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users && filteredUsers.length > 0 ? (
                filteredUsers.map((ele, index) => (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.gender}</td>
                    <td>
                      <button
                        href="#"
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => [setId(ele.id), setShowPopup(true)]}
                      >
                        View
                      </button>
                      <Link
                        to={`/edit/${ele.id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </Link>
                      <Link
                        onClick={() => dispatch(deleteUser(ele.id))}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No Data Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Read;
