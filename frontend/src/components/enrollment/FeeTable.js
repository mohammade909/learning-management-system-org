import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useSelector } from 'react-redux';

const FeeTable = ({ item, showHistory, parent }) => {
  
 const {auth} = useSelector((state)=>state.auth)
  const generatePDF = (fee) => {
    const doc = new jsPDF();

    // Customize the PDF content to match your slip design
    doc.addImage('/cyber.png', 'PNG', 10, 10, 50, 20); // Add your logo
    doc.setFontSize(12);
    doc.text("STUDENT FEES RECEIPT", 105, 40, null, null, 'center');
    doc.setFontSize(10);
    doc.text(`Regn. No: RG686349`, 14, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, 50);
    doc.text(`Name: ${auth.first_name} ${auth.last_name}`, 14, 60);
    doc.text(`Father’s Name:${parent?.first_name} ${parent?.first_name}`, 14, 70);
    doc.text(`Course: ${item.course.course_name}`, 14, 80);
    doc.text(`Duration: ${item.course.course_duration}`, 160, 80);

    // Fee details table
    doc.autoTable({
      startY: 90,
      head: [['Fee’s Details', 'Amount']],
      body: [
        ['Total Fee', fee.fee_amount],    
        ['Paid Fee', fee.paid],
        ['Balance Fee', (fee.fee_amount - fee.paid).toFixed(2)]
      ]
    });

    doc.text("Rupees", 14, doc.lastAutoTable.finalY + 10);
    doc.text("This is computer generated slip.", 14, doc.lastAutoTable.finalY + 20);
    doc.text("Sign. -", 160, doc.lastAutoTable.finalY + 30);

    doc.save(`fee_receipt_${fee.fee_id}.pdf`);
  };



  return (
    <div>
      {showHistory[item.course.course_id] && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {item.fees.map(fee => (
                <tr key={fee.fee_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.fee_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{fee.fee_amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(fee.due).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><span className="bg-green-600/10 px-2 text-green-500 rounded-full">₹{fee.paid}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><span className="bg-red-600/10 px-2 text-red-500 rounded-full">₹{(fee.fee_amount - fee.paid).toFixed(2)}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(fee.payment_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.payment_method}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={() => generatePDF(fee)} className="px-4 py-2 bg-blue-600 text-white rounded">Generate PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeeTable;
