import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams , useNavigate} from "react-router-dom";
import { updateUser } from "../features/userDetailsSlice";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  // State to store user data
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  // Fetch all users from Redux store
  const allUsers = useSelector((state) => state.app.users);
//   console.log("All Users from Store:", allUsers);

  useEffect(() => {
    if (id) {
      const singleUser = allUsers.find((ele) => ele.id === id);
      if (singleUser) {
        setUpdateData(singleUser);
        // console.log("User Data to Update:", singleUser);
      } else {
        console.warn(`User with ID ${id} not found.`);
      }
    }
  }, [id, allUsers]);

  // Handle input change
  const newData = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(`Updated Field: ${name} -> ${value}`);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Submitting Updated Data:", updateData);
    dispatch(updateUser(updateData)).then(() => {
        // console.log("User updated successfully. Navigating to Read page...");
        navigate("/read"); 
      });
  };

  return (
    <div>
      <h2 className="text-center mt-3">Update User</h2>
      <form className="w-25 mx-auto my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={updateData.name}
            required
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={updateData.email}
            required
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            name="age"
            className="form-control"
            value={updateData.age}
            required
            onChange={newData}
          />
        </div>
        <div className="d-flex">
          <div className="mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Male"
              checked={updateData.gender === "Male"}
              onChange={newData}
            />
            <label className="form-check-label ml-2">Male</label>
          </div>
          <div className="mb-3 ml-5">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Female"
              checked={updateData.gender === "Female"}
              onChange={newData}
            />
            <label className="form-check-label ml-2">Female</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary d-flex">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
