import React from "react";
import { Modal, useRadioGroup } from "@mui/material";

const EditProfile = ({
  isEditProfileModalOpen,
  handleCloseEditProfileModal,
  userDetails
}) => {
  return (
    <Modal open={isEditProfileModalOpen} onClose={handleCloseEditProfileModal}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[25rem] w-[70vw] bg-violet-800 shadow-lg p-5 rounded-lg">
        <p>{userDetails.firstName}</p>
        <p>{userDetails.lastName}</p>
        <p>salu</p>
        <p>salu</p>
        <p>salu</p>
        <p>salu</p>
      </div>
    </Modal>
  );
};

export default EditProfile;


// import React, { useState } from 'react';
// import { Modal } from '@mui/material';

// const EditProfile = ({ isEditProfileModalOpen, handleCloseEditProfileModal, userDetails }) => {
//   const [formValues, setFormValues] = useState({
//     name: userDetails.firstName || '',
//     lastName: userDetails.lastName || '',
//     phone: '',
//     country: '',
//     idCode: '',
//     file: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({
//       ...formValues,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormValues({
//       ...formValues,
//       file: e.target.files[0],
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formValues);
//     // Add logic to handle form submission
//   };

//   return (
//     <Modal open={isEditProfileModalOpen} onClose={handleCloseEditProfileModal}>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[25rem] w-[70vw] bg-purple-800 shadow-lg p-5 rounded-lg">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="First Name"
//             value={formValues.firstName}
//             onChange={handleInputChange}
//             className="mb-4"
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={formValues.lastName}
//             onChange={handleInputChange}
//             className="mb-4"
//           />
//           {/* Add other input fields (phone, country, idCode) similar to the previous code */}
//           <button type="submit" className="bg-white-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//             Save
//           </button>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default EditProfile;
