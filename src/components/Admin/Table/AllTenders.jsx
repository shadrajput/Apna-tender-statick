import { mdiEye, mdiPencil } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import Button from '../Button'
import Buttons from '../Buttons'
import _ from 'lodash';
import moment from 'moment';
import {toast} from 'react-toastify';
import TenderAdditionalDetailsModal from '../Modals/TenderAdditionalDetailsModal';

const AllTendersTable = ({data, itemsPerPage, setPageNo, pageCount}) => {

  const [allTenders, setAllTenders] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [viewSelectedTender, setViewSelectedTender] = useState({})

  useEffect(() =>{
    setAllTenders(data)
  },[data])
  
  useEffect(() =>{
    setPageNo(currentPage+1)
  },[currentPage])  

  return (
    <>
      <table className='text-sm'>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Tender Id</th>
            <th>Ref Id</th>
            <th>Title</th>
            <th>Est Val.</th>
            <th>Opening dt.</th>
            <th>Closing dt.</th>
            <th>Scraped from</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {allTenders.map((tender, index) => (
            <tr key={index}>
              <td className="border-b-0 lg:w-6 before:hidden">
                {(currentPage * itemsPerPage) + (index+1)}
              </td>
              <td data-label="Tender Id" className=''>{tender.apna_tender_id}</td>
              <td data-label="Ref Id" className=''>{tender.tender_no}</td>
              <td data-label="Title" className=''>{tender.title}</td>
              <td data-label="Est Val." className=''>{tender.estimated_value}</td>
              <td data-label="Opening dt." className=''>{moment.utc(tender.opening_date).format("DD-MM-YYYY hh:mm A")}</td>
              <td data-label="Closing dt." className=''>{moment.utc(tender.closing_date).format("DD-MM-YYYY hh:mm A")}</td>
              <td data-label="Scraped from" className='uppercase text-gray-500'>{tender.scraped_from}</td>
              <td  className="before:hidden lg:w-28 whitespace-nowrap">
                {
                  <Buttons>
                    <Button
                      className='bg-blue-600 text-white'
                      icon={mdiEye}
                      onClick={() => {setShowModal(true); setViewSelectedTender(tender)}}
                      small
                    />
                  
                    {/* <Button
                      className='bg-slate-800 text-white'
                      icon={mdiPencil}
                      onClick={() => console.log('')}
                      small
                    /> */}
                  </Buttons>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {_.times(pageCount).map((page, index) => (

              <Button
                key={index}
                active={index === currentPage}
                label={index + 1}
                className={index === currentPage ? 'bg-slate-700 text-white' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {pageCount}
          </small>
        </div>
      </div>
      <TenderAdditionalDetailsModal showModal={showModal} handleShowModal={setShowModal} viewSelectedTender={viewSelectedTender} setViewSelectedTender={setViewSelectedTender}/>
    </>
  )
}

export default AllTendersTable
