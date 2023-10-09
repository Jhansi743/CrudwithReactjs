import * as React from "react";
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import blogImage from '../assets/images/blog-icon.png'
import Modal from "./Model";

const Header = () => {

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('home/list')
  };

  return (
    <div>
      <h1 className="bg-header p-3">Address Book</h1>
      <div className="Navbar navbar-dark bg-dark p-2">
        <NavLink className="navLink" to="home/list">
          Home
        </NavLink>
        <span
          className="navLink"
          onClick={openModal}
        >
          +Add
        </span>
        <img src={blogImage} className="float-right px-3" alt='blogImage' />
      </div>
      <div>
        <Outlet />
      </div>

      {showModal && (
        <Modal
          showModal={showModal}
          handleClose={closeModal}
          setSingleData={undefined}
          data={undefined}
          isEditing={false}
          setData={undefined}
        />
      )}
    </div>
  );
}
export default Header;
