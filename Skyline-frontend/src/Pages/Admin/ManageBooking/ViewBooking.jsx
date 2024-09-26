import React,{useRef} from "react";
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
const ViewBooking = (booking) => {
    const pdfRef=useRef()
    
    
const{
    _id,
    from,
    to,
    tripType,
    flight,
    title,
    firstName,
    lastName,
    dateOfBirth,
    country,
    address,
    passportNo,
    email,
    phone,
    Additionalpassengers,
    passengers,
    departureDate,
    returnDate,
    classtype,
    totalPrice,
    status,
    payment_status,}=booking;

    const downloadPDF=()=>{
        const input=pdfRef.current;
        html2canvas(input).then((canvas)=>{
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('landscape','mm','a3',true);
          pdf.addImage(imgData, 'JPEG', 0, 0);
          pdf.save("bookinginfo.pdf");
        })
      }
  return (
    <div>

<div className=" h-[550px] mx-auto p-6 bg-white shadow-md rounded-lg">
<div ref={pdfRef}>
      <div className="grid grid-cols-4 -gap-3">
        {/* Tour Details */}
        
        <div>
          <h2 className="text-3xl font-bold mb-4">Tour Details</h2>
          <p className='text-base mb-2'><span className="font-semibold text-lg">From:</span> {from}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">To:</span> {to}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">Trip Type:</span> {tripType}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">Flight:</span> {flight}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">Passengers:</span> {passengers}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">Class Type:</span> {classtype}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">Dearture Date:</span> {departureDate}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">Return Date:</span> {returnDate}</p>
        </div>
     
        {/* Client Details */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Client Details</h2>
          <p className='text-base mb-2'><span className="font-semibold text-lg">Title:</span> {title}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">First Name:</span> {firstName}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">Last Name:</span> {lastName}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">Date Of Birth:</span> {dateOfBirth}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">Country:</span> {country}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">Address:</span> {address}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">Passport Nunmber:</span> {passportNo}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">Email:</span> {email}</p>
          <p className='text-base mb-2'><span className="font-semibold text-lg">Phone Number:</span> {phone}</p>
          
        </div>
        <div>
              <h3 className="font-bold text-3xl mb-8 mt-4">Additional Passengers</h3>
              {Additionalpassengers && Additionalpassengers.length > 1 ? (
                Additionalpassengers.slice(1).map((passenger, index) => (
                  <div key={index} className="text-sm ">
                    <p className='text-base mb-2'><span  className="font-semibold text-lg">Title:</span> {passenger.title}</p>
                    <p className='text-base mb-2'><span className="font-semibold text-lg">First Name:</span> {passenger.firstName}</p>
                    <p className='text-base mb-2'><span className="font-semibold text-lg">Last Name:</span> {passenger.lastName}</p>
                    <p className='text-base mb-2'><span className="font-semibold text-lg">Passport Number:</span> {passenger.passportNo}</p>
                    <p className='text-base mb-2'><span className="font-semibold text-lg">Phone:</span> {passenger.phone}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm">No additional passengers.</p>
              )}
            </div>
        {/* Booking Status */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Booking Status</h2>
          <p className='text-xl mb-4'><span className="font-semibold text-xl">Total Amount:</span> <span className="text-green-500">$ {totalPrice}</span></p>
          <p className='text-xl mb-2'><span className="font-semibold text-xl">Payment Status:</span> <span className="text-red-500">{payment_status}</span></p>
          <p className='text-2xl mb-2'><span className="font-semibold text-2xl">Tour Status:</span> <span className="text-red-500">{status}</span></p>
        </div>
      </div>
      </div>



      <div className="mt-6 flex justify-start space-x-4">
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={downloadPDF}>Download As Pdf</button>
      </div>
      
    </div>


    </div>
  )
}

export default ViewBooking