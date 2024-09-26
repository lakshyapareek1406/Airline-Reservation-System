import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { TbMessage } from "react-icons/tb";
import { TbMessageCircle } from "react-icons/tb";
import { AuthContext } from "../../Components/context/AuthContext";
import { VscFeedback } from "react-icons/vsc";
/*const FeedbackModal = ({ feedback, onClose }) => {
  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 w-1/2">
        <h1 className="text-xl font-bold mb-4">{feedback.name}</h1>
        <h2 className="text-xl font-bold mb-4">{feedback.subject}</h2>
        <p className="mb-4">{feedback.message}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};*/

const RePassengers = () => {
  const [feedback, setFeedback] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  //const [selectedFeedback, setSelectedFeedback] = useState(null);
  const itemsPerPage = 7;
  const { passenger } = useContext(AuthContext);
  const [feedbackReply, setfeedbackReply] = useState("");


  //add feedback reply
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (!feedbackReply ) {
      toast.error(<div> Feedback Reply is required</div>, { autoClose: 1000 });
    } else {
      toast.success(<div>  All fields are valid!</div>, { autoClose: 1000 });
      // Proceed with form submission if all fields are valid
      sendData();
    }
};


  const sendData = () => {
    const newfeedback = {
      userId: passenger && passenger._id,
      feedbackId: viewData && viewData._id,
      email: viewData && viewData.email,
      name: viewData && viewData.name,
      subject: viewData && viewData.subject,
      message: viewData && viewData.message,
      feedbackReply
      
    };

    //Axios
    axios
      .post("http://localhost:5000/feedbackReply/add", newfeedback)
      .then(() => {
        toast.success(<div>  Feedback Successful!</div>); 
        setfeedbackReply("");
      
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div>  Error Feedback Send</div>);
      });




    }




//get passenger feedback
  useEffect(() => {
    function getFeedback() {
      axios.get('http://localhost:5000/feedback/')
        .then((res) => {
          setFeedback(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error(<div>  Error loading User Feedback</div>);
        });
    }

    getFeedback();
  }, []);

  
  const filteredFeedback = feedback.filter((Feedback) =>
    Feedback.email && Feedback.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);

  const currentFeedback = filteredFeedback.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

//delete
  const deleteFeedback = (id, email) => {
    if (window.confirm(`Are you sure you want to delete feedback from ${email}`)) {
      axios
        .delete(`http://localhost:5000/feedback/delete/${id}`)
        .then(() => {
          toast.success(<div>  Feedback deleted successfully!</div>);
          setFeedback(feedback.filter(p => p._id !== id));
        })
        .catch((err) => {
          console.log(err);
          toast.error(<div>  Error deleting Feedback</div>);
        });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /*
  const handleViewClick = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const handleCloseModal = () => {
    setSelectedFeedback(null);
  }; */
  const [viewData, setViewData] = useState(null);


   // Handle view action
   const handleView = (feedback) => {
    setViewData(feedback);
   };
  return (
    <div className="">

      {/* Modal for viewing description */}
 {viewData && (
        <div className="fixed w-full  z-50 justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-200 p-6 rounded-md shadow-md w-[1680px] h-[1000px]  ">
          <div className='bg-gray-100 h-[600px] '>
            <h2 className="text-lg font-semibold mb-4 bg-[#1F3541] text-white text-center rounded-lg flex items-center justify-center">
            <TbMessageCircle className="w-6 h-6 mr-2" /> Reply Passenger Feedback
            </h2>
           
            <div className="mb-4">
            <p className="text-lg font-semibold mb-4 ml-6"> ⭕ Passenger Email : {viewData.email}</p>
            <p className="text-lg font-semibold mb-4 ml-6">⭕ Passenger Name : {viewData.name}</p>
            <p className="text-lg font-semibold mb-4 ml-6">⭕ Subject Name : {viewData.subject}</p>
            <span className="text-lg font-semibold ml-6">⭕ Passenger Message : {viewData.message}</span>
            </div>

      <form className="mt-20" onSubmit={handleSubmit}>
      <p className="text-lg font-semibold mb-4 ml-6"> Company Reply :</p>

        <textarea
           rows={6}
          placeholder="Write a reply..."
          className="w-[1600px] p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ml-6"
          value={feedbackReply}
         onChange={(e) => setfeedbackReply(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-6 ml-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 "
        >
          Reply
        </button>
        <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 ml-4"
              onClick={() => setViewData(null)}
            >
              Close
            </button>
      </form>
            
            </div>
            
            
          </div>
        </div>
      )}



      <div className="py-[25px] px-[25px] bg-slate-100 mt-2 ">
        
        <div className="py-[25px] px-[25px] bg-[#1F3541] border rounded-3xl   flex items-center  justify-center">
          <h1 className="text-white text-[28px] leading-[40px] cursor-pointer font-semibold  text-center flex ">
          <VscFeedback className="mr-2 w-9 h-9"/>User Feedback
          </h1>
        </div>
      </div>
      <div className='-mt-20'>
        <section className="">
          <div className="mt-[130px] mx-4 relative">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <div className="pb-4 bg-[#1F3541]">
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80  focus:ring-blue-500 focus:border-blue-500 bg-[#1F3541] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for items"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/*table*/}
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white shadow-2xl">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4"></th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      User Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Messages
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentFeedback.map((Feedback, index) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={Feedback._id}
                    >
                      <td className="w-4 p-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{Feedback.email}</td>
                      <td>{Feedback.name}</td>
                      <td>{Feedback.subject}</td>
                      <td>{Feedback.message}</td>
                      <td className="flex gap-6">
                       {/* <GrView
                          className="text-3xl px-1 py-1 cursor-pointer text-white bg-blue-600 hover:bg-blue-700 rounded-full mt-3 -mr-1"
                          onClick={() => handleViewClick(Feedback)}
                          title='view feedback'
                  />  */}
                        <TbMessage className="text-3xl px-1 py-1 cursor-pointer text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 mt-3 " 
                         onClick={() => handleView(Feedback)}
                        title='send feedback'
                        />
                       


                        <MdDelete
                          className="text-3xl px-1 py-1 cursor-pointer text-white bg-red-600 rounded-lg hover:bg-red-700 mt-3 mr-3"
                          onClick={() => deleteFeedback(Feedback._id, Feedback.email)}
                          title='delete feedback'
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 mx-1 border ${currentPage === index + 1 ? 'bg-blue-500 rounded-full text-white' : 'bg-gray-200'}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
     {/* {selectedFeedback && (
        <FeedbackModal feedback={selectedFeedback} onClose={handleCloseModal} />
      )} */}
    </div>
  );
};

export default RePassengers;