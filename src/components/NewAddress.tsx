import { ErrorMessage, Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
const NewAddress = ({ singleData, isEditing, handleClose, setData }: any) => {
  const intialValues = {
    name: "",
    email: "",
    mobile: "",
    landline: "",
    website: "",
    address: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      ),
    mobile: Yup.string()
      .required("Mobile Number is required")
      .matches(/[0-9]{10}/, "Mobile Number must have 10 digits"),
    landline: Yup.string(),
    website: Yup.string(),
    address: Yup.string(),
  });
  const navigate = useNavigate();
  const savePost = (values: any) => {
    if (!isEditing) {
      // Add a new post
      fetch("http://localhost:4000/contacts", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          landline: values.landline,
          website: values.website,
          address: values.address,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((newRecord) => {
          if (newRecord) {
            handleClose();
            setData((prevData: any) => [...prevData, newRecord]);
          }
        })
        .catch((error) => {
          console.error("Error adding record:", error);
        });
    } else {
      // Update an existing post
      fetch(`http://localhost:4000/contacts/${values.id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: values.id,
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          landline: values.landline,
          website: values.website,
          address: values.address,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            handleClose();
            setData((prevData: any) =>
              prevData.map((record: any) =>
                record.id === values.id ? values : record
              )
            );
          }
        })
        .catch((error) => {
          console.error("Error updating record:", error);
        });
    }
  };

  if (!isEditing) {
    singleData = { ...intialValues };
  }
  const keyPress = (e: any) => {
    const digitRegex = /^\d$/; 
    if (!digitRegex.test(e.key)) {
      e.preventDefault();
    }
    const input = e.target;
    if (input.value.length >= 10) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Formik
        initialValues={singleData}
        validationSchema={validationSchema}
        onSubmit={savePost}
        enableReinitialize={true}
      >
        {({ handleSubmit }) => (
          <form className="container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
              />
              <ErrorMessage
                name="name"
                component="span"
                className="text-danger"
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              />
              <ErrorMessage
                name="email"
                component="span"
                className="text-danger"
              />
            </div>

            <div>
              <div className="form-group mt-3">
                <label htmlFor="mobile">Mobile</label>
                <Field
                  type="text"
                  className="form-control"
                  id="mobile"
                  required
                  name="mobile"
                  onKeyPress={keyPress}
                />
                <ErrorMessage
                  name="mobile"
                  component="span"
                  className="text-danger"
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="landline">Landline</label>
                <Field
                  type="text"
                  className="form-control"
                  id="landline"
                  name="landline"
                />
                <ErrorMessage
                  name="landline"
                  component="span"
                  className="text-danger"
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="website">Website</label>
              <Field
                type="text"
                className="form-control"
                id="website"
                name="website"
              />
              <ErrorMessage
                name="website"
                component="span"
                className="text-danger"
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="address">Address</label>
              <Field
                as="textarea"
                className="form-control"
                id="address"
                name="address"
              />
              <ErrorMessage
                name="address"
                component="span"
                className="text-danger"
              />
            </div>

            <button type="submit" className="btn btn-success mt-3 float-right">
              {isEditing ? "Update" : "Add"}
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default NewAddress;
