import React from 'react'
import { CSVLink } from 'react-csv'
import Button from 'react-bootstrap/Button';

export const ExportReactCSV = () => {
    const csvData = [
        ["firstName", "lastName", "emailAddress","title","country","city"],
      ];
    return (

        
        <CSVLink data={csvData} filename='Ring_Menbers_Report.csv' >
            <i class="fa fa-download icon-members_export" aria-hidden="true" style={{ minWidth: "175px", fontSize: "18px" }}>
                <span className='members_export font-size-20px' style={{ paddingLeft: "3px", fontFamily: "font-light" }}>Sample</span>
            </i>
                
            </CSVLink>
         
        
    )
}