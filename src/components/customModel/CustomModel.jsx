import React from 'react'
import "./CustomModel.css";
import { useSelector } from 'react-redux';

const CustomModel = ({id , showPopup , setShowPopup}) => {

    const allUsers = useSelector((state) => state.app.users)

    const singleUsers = allUsers.filter((ele) => ele.id === id)
    const user = singleUsers.length > 0 ? singleUsers[0] : null;
    


  return (
    <div className={`modal fade ${showPopup ? "show d-block" : ""}`} tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">User Details</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowPopup(false)}
          ></button>
        </div>
        <div className="modal-body">
          {user ? (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
            </>
          ) : (
            <p>No user found</p>
          )}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => setShowPopup(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CustomModel



