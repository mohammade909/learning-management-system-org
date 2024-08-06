import React,{useState,  useEffect} from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux"

import { Link } from "react-router-dom";
import axios from 'axios';
import { BASEURL } from '../../baseurl';
const Certificate = () => {
  const { auth } = useSelector((state) => state.auth);
  const [information, setInformation] = useState()
  const printCertificate = () => {
    window.print();
  };
  const fetchChildrenAndUserInfo = async (childId) => {
    try {
      const response = await axios.get(`${BASEURL}/api/v1/users/parents/${childId}`); // Adjust the endpoint as needed
      console.log(response.data);
      
      setInformation(response.data);
    } catch (error) {
      console.error("Error fetching children and user info:", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchChildrenAndUserInfo(auth.user_id);
  }, [auth.user_id]);

  const downloadPDF = () => {
    const input = document.getElementById("certificate");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("certificate.pdf");
    });
  };

  return (
    <>
      <div className="mt-4 text-center">
        <button
          onClick={printCertificate}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Print Certificate
        </button>
        <Link
          to='certificate'
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Print Certificate
        </Link>
        <button
          onClick={downloadPDF}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>

      <div className="relative w-[800px] h-[600px] bg-[#618597] p-[30px] text-[#333] font-sans shadow-md m-auto mt-10">
        <style>
          {`
          @import url('https://fonts.googleapis.com/css?family=Pinyon+Script|Open+Sans');

          .cursive {
            font-family: 'Pinyon Script', cursive;
          }

          .sans {
            font-family: 'Open Sans', sans-serif;
          }
        `}
        </style>

        <div
          id="certificate"
          className="absolute w-[794px] h-[594px] left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 border-2 border-white"
        >
          <div className="absolute w-[730px] h-[530px] left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 border-2 border-white"></div>
       

          <div className="relative w-[720px] h-[520px] p-0 border border-[#E1E5F0] bg-white left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
          <div className="absolute top-1 left-0 right-0 flex justify-between px-8">
            <span className="tracking-wider font-mono font-semibold text-sm">
              Reg.No-{"CS9067834"}
            </span>
            <span className="tracking-wider font-semibold text-sm font-mono">ID: {information?.child?.id}</span>
          </div>
            <div className="mb-2">
              <div className="relative top-10 text-center cursive">
                <h2 className="text-[40px] tracking-widest">
                  Certificate of Completion
                </h2>
              </div>
            </div>

            <div className="p-4">
              <div className="w-[650px] h-[200px] relative left-1/2 transform -translate-x-1/2 top-[70px]">
                <div className="mb-4">
                  <div className="inline-block w-1/6"></div>
                  <div className="inline-block w-2/3 text-center underline">
                    <span className="font-bold text-[20px]">
                      This certificate awarded to
                    </span>
                  </div>
                  <div className="inline-block w-1/6"></div>
                </div>

                <div className="mb-4">
                  <div className="inline-block w-1/6"></div>
                  <div className="inline-block w-2/3 text-center">
                    <span className="block text-md font-sans tracking-wider font-semibold capitalize">
                      {auth?.first_name}-{auth?.last_name}
                    </span>
                  </div>
                  <div className="inline-block w-1/6"></div>
                </div>

                <div className="mb-4">
                  <div className="inline-block w-1/6"></div>
                  <div className="inline-block w-full text-center">
                    <span className="block text-2xl font-semibold cursive tracking wider">
                      This is to certify {auth?.first_name}-{auth?.last_name}{" "}
                      has successfully completed the Full Stack Development course
                      offered by Cybersolvings
                    </span>
                  </div>
                  <div className="inline-block w-1/6"></div>
                </div>

                <div className="mb-4">
                  <div className="inline-block w-1/6"></div>
                  <div className="inline-block w-2/3 text-center underline">
                    <span className="block font-bold text-[15px]">
                      BPS PGS Initial PLO for Principals at Cluster Meetings
                    </span>
                  </div>
                  <div className="inline-block w-1/6"></div>
                </div>
              </div>

              <div className="flex justify-between mt-8 w-[650px] h-[100px] relative left-1/2 transform -translate-x-1/2 -bottom-[105px]">
                <div className="w-1/3 text-center">
                  <span className="block">Cybersolvings PVT.LTD</span>
                  <span className="block mt-1 border-b border-gray-400"></span>
                  <span className="block font-bold">
                    Crystal Benton Instructional Specialist II, Staff
                    Development
                  </span>
                </div>
                <div className="w-1/3"></div>
                <div className="w-1/3 text-center">
                  <span className="block">Date Completed</span>
                  <span className="block mt-1 border-b border-gray-400"></span>
                  <span className="block font-bold">DOB: {information?.child?.date_of_birth} </span>
                  <span className="block font-bold">
                    Social Security # (last 4 digits)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Certificate;
