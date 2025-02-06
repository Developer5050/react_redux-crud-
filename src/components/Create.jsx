import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailsSlice";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [users, setUsers] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getUsersDetails = (e) => {
    const { name, value } = e.target;
    setUsers((prevUsers) => {
      const updateUsers = { ...prevUsers, [name]: value };
    //   console.log(updateUsers);
      return updateUsers;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Users....", users);
    dispatch(createUser(users));

    navigate("/read");
  };

  return (
    <div>
      <form className="w-25 mx-auto my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={users.name}
            onChange={getUsersDetails}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={users.email}
            onChange={getUsersDetails}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            name="age"
            className="form-control"
            value={users.age}
            onChange={getUsersDetails}
          />
        </div>
        <div className="d-flex">
          <div class="mb-3">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              value="Male"
              checked={users.gender === "Male"}
              onChange={getUsersDetails}
            />
            <label class="form-check-label ml-2">Male</label>
          </div>
          <div class="mb-3 ml-5">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              value="Female"
              checked={users.gender === "Female"}
              onChange={getUsersDetails}
            />
            <label class="form-check-label ml-2">Female</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary d-flex">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
