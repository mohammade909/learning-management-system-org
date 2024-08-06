import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CertificateDrawers from './CertificateDrawers';
import MegaNavbar from '../../components/MegaNavbar';
import Footer from '../../components/Footer';

const Certificates = () => {
    const certificates = [
        {
          id: 1,
          bgColor: 'bg-purple-50',
          imgSrc: 'https://www.shutterstock.com/image-photo/young-woman-learning-language-during-600nw-2200684015.jpg',
          alt: 'Certificate 1',
          btn: "Apply for Certificate",
          to: "/CertificateDrawers",
          act:"apply"
        },
        {
          id: 2,
          bgColor: 'bg-green-50',
          imgSrc: 'https://media.istockphoto.com/id/1290864946/photo/e-learning-education-concept-learning-online.jpg?s=612x612&w=0&k=20&c=y1fQ-3wbsvdDaMn-cuHPibcgozOxKQS99mIgz6DFcVA=',
          alt: 'Certificate 2',
          btn: "Download Certificate ",
          act:"download"
        },
        {
          id: 3,
          bgColor: 'bg-red-50',
          imgSrc: 'https://www.ciit.edu.ph/wp-content/uploads/2022/07/businessman-using-computer-laptop-to-connect-scaled-e1658386739658.jpg',
          alt: 'Certificate 3',
          btn: "Verify Certificate",
          to: "/DownloadCertificate",
          act:"Verify"
        }, 
        // Add more certificates as needed
      ];
      
     const [drawer, setDrawer] = useState(false);
     const [action, setAction] = useState(false);
     function handleDrawer(act){
        setDrawer(!drawer)
        setAction(act)
     }
  return (
   <>
   <MegaNavbar/>
   <section className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
      <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 items-start">
        {certificates.map((certificate) => (
          <section key={certificate.id} className={`p-5 py-10 ${certificate.bgColor} text-center transform duration-500 hover:-translate-y-2 cursor-pointer`}>
            <img src={certificate.imgSrc} alt={certificate.alt} />
            {/* <Link to={certificate.to}> */}
            <button
              onClick={() => handleDrawer(certificate.act)}
              className="p-2 px-6 mt-5 bg-gray-800 text-white rounded-md hover:bg-gray-900 w-full"
            >
             {certificate.btn}
            </button>
            {/* </Link> */}
          </section>
        ))}
      </section>
    </section>
  {drawer && <CertificateDrawers action={action} isClose={()=>setDrawer(false)}/>}
  <Footer/>
   </>
  );
}
export default Certificates;
