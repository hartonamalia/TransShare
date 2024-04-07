// import React, { useState } from "react";

// const FindCarForm = () => {
//   const [enterFromAddress, setEnterFromAddress] = useState("");
//   const [enterToAddress, setEnterToAddress] = useState("");
//   const [enterJourneyDate, setEnterJourneyDate] = useState("");
//   const [enterJourneyTime, setEnterJourneyTime] = useState("");
//   const submitHandler = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <form className="p-4 bg-white" onSubmit={submitHandler}>
//       <div className="flex flex-wrap items-center justify-between">
//         <div className="w-1/3 mb-0 p-2">
//           <input
//             className="appearance-none border border-gray-300 p-2 w-full text-gray-700 leading-tight focus:outline-none"
//             placeholder="City, airport, address or hotel"
//             type="text"
//             required
//             value={enterFromAddress}
//             onChange={(e) => setEnterFromAddress(e.target.value)}
//           />
//         </div>
//         <div className="w-1/3 mb-0 p-2">
//           <input
//             className="appearance-none border border-gray-300 p-2 w-full text-gray-700 leading-tight focus:outline-none"
//             placeholder="Journey Date"
//             type="date"
//             required
//             value={enterJourneyDate}
//             onChange={(e) => setEnterJourneyDate(e.target.value)}
//           />
//         </div>

//         <div className="w-1/3 mb-0 p-2">
//           <input
//             className="appearance-none border border-gray-300 p-2 w-full text-gray-700 leading-tight focus:outline-none time__picker"
//             placeholder="Journey Time"
//             type="time"
//             required
//             value={enterJourneyTime}
//             onChange={(e) => setEnterJourneyTime(e.target.value)}
//           />
//         </div>
//         <div className="w-full p-2">
//           <button className="w-full bg-violet-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//             Find Car
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default FindCarForm;



import React, { useState } from "react";

const FindCarForm = () => {
  const [enterFromAddress, setEnterFromAddress] = useState("");
  const [enterJourneyDate, setEnterJourneyDate] = useState("");
  const [enterJourneyTime, setEnterJourneyTime] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form className="p-4 bg-white" onSubmit={submitHandler}>
      <div className="flex flex-wrap items-center justify-between">
        <div className="w-1/3 mb-0 p-2">
          <input
            className="appearance-none border border-gray-300 p-2 w-full text-gray-700 leading-tight focus:outline-none"
            placeholder="City, airport, address or hotel"
            type="text"
            required
            value={enterFromAddress}
            onChange={(e) => setEnterFromAddress(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-0 p-2">
          <div className="relative flex items-center border rounded-md">
            <input
              className="appearance-none border-r border-gray-300 p-2 text-gray-700 leading-tight focus:outline-none"
              placeholder="Journey Date"
              type="date"
              required
              value={enterJourneyDate}
              onChange={(e) => setEnterJourneyDate(e.target.value)}
            />
            <span className="px-2 text-gray-500">
              <i className="fa fa-chevron-down"></i>
            </span>
            <input
              className="appearance-none p-2 text-gray-700 leading-tight focus:outline-none"
              placeholder="Journey Time"
              type="time"
              required
              value={enterJourneyTime}
              onChange={(e) => setEnterJourneyTime(e.target.value)}
            />
            <span className="px-2 text-gray-500">
              <i className="fa fa-chevron-down"></i> 
            </span>
          </div>
        </div>
        <div className="w-full p-2">
          <button className="w-1/3 bg-violet-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Find Car
          </button>
        </div>
      </div>
    </form>
  );
};

export default FindCarForm;
