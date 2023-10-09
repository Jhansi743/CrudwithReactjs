import { useEffect, useState } from "react";
import "../App.css";
import editIcon from "../assets/images/Edit-icon.png";
import deleteIcon from "../assets/images/delete2.png";
import { useNavigate } from "react-router-dom";
import Modal from "./Model";

const Home = () => {
  const [data, setData]: any = useState([]);
  const [singleData, setSingleData]: any = useState({});
  const [showModal, setShowModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [activeRecordIndex, setActiveRecordIndex]: any = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:4000/contacts").then((response) =>
      response.json().then((json: any) => {
        setData(json);
      })
    );
  }, [data]);

  const handleViewById = (id: number) => {
    fetch(`http://localhost:4000/contacts/${id}`)
      .then((response) => response.json())
      .then((json: any) => {
        setActiveRecordIndex(id);
        setSingleData(json);
        navigate(`/home/list/id=${id}`);
      })
      .catch((error) => {});
  };

  const handleEdit = (id: number) => {
    fetch(`http://localhost:4000/contacts/${id}`).then((response) =>
      response.json().then((json: any) => {
        if (response && response.status === 200) {
          setSingleData(json);
          setOpenModal(true);
          setTimeout(() => {
            setShowModal(true);
          }, 500);
        }
      })
    );
  };
  const handleDelete = (id: number) => {
    fetch(`http://localhost:4000/contacts/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        // Remove the deleted item from the data array
        setData((prevData: any) =>
          prevData.filter((item: any) => item.id !== id)
        );
        setSingleData({});
        setActiveRecordIndex(null);
      }
    });
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <h4 className="contacts">CONTACTS</h4>
      <div className="d-flex">
        {data && data.length > 0 && (
          <div className=" w-25 m-0">
            <div>
              <ul>
                {data &&
                  data.map((item: any) => (
                    <div
                      key={item.id}
                      className={`border-box ${
                        item.id === activeRecordIndex ? "active-record" : ""
                      }`}
                      onClick={() => handleViewById(item.id)}
                    >
                      <li className="list p-2">
                        <h1>{item.name}</h1>
                      </li>
                      <li className="list p-2">
                        <p>{item.email}</p>
                      </li>
                      <li className="list p-2">
                        <p>{item.mobile}</p>
                      </li>
                    </div>
                  ))}
              </ul>
            </div>
          </div>
        )}
        {singleData && Object.keys(singleData).length > 0 && (
          <div className="ml-100">
            <ul>
              <div>
                <li className="list p-2 d-flex justify-content-between align-items-center">
                  <h1>{singleData.name}</h1>
                  <div>
                    <span
                      className="cursor mx-5"
                      onClick={() => handleEdit(singleData.id)}
                    >
                      <img src={editIcon} alt="editIcon" className="icons" />{" "}
                      Edit
                    </span>
                    <span
                      className="cursor mx-2 icons"
                      onClick={() => handleDelete(singleData.id)}
                    >
                      <img alt="deleteIcon" src={deleteIcon} />
                      Delete
                    </span>
                  </div>
                </li>
                <li className="list p-2">
                  <p>Email: {singleData.email}</p>
                </li>
                <li className="list p-2">
                  <p>Mobile: {singleData.mobile}</p>
                </li>
                <li className="list p-2">
                  <p>Landline: {singleData.landline}</p>
                </li>
                <li className="list p-2">
                  <p>Website: {singleData.website}</p>
                </li>
                <li className="list p-2">
                  <p>Address: {singleData.address}</p>
                </li>
              </div>
            </ul>
          </div>
        )}
      </div>
      {openModal && (
        <Modal
          showModal={showModal}
          handleClose={handleCloseModal}
          setSingleData={setSingleData}
          singleData={singleData}
          setData={setData}
          isEditing={true}
        />
      )}
    </>
  );
};

export default Home;
