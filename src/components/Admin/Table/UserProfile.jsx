import { mdiEye, mdiPencil } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import Button from '../Button'
import Buttons from '../Buttons'
import _ from 'lodash';
import moment from 'moment';
import SectionTitleLineWithButton from '@/components/Admin/Section/TitleLineWithButton'
import CardBoxComponentEmpty from '@/components/Admin/CardBox/Component/Empty'

const UserProfileTable = ({data}) => {

  const [allTenders, setAllTenders] = useState([])

  useEffect(() =>{
    setAllTenders(data)
  },[data])

  console.log(data)

  return (
    <div className="mt-8">
      <SectionTitleLineWithButton title="Applied Tenders"/>
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            allTenders.length > 0
            ?
              allTenders.map((tender, index) => (
                <tr key={index}>
                  <td className="border-b-0 lg:w-6 before:hidden">
                    {index+1}
                  </td>
                  <td data-label="Tender Id" className=''>{tender.tender.apna_tender_id}</td>
                  <td data-label="Ref Id" className=''>{tender.tender.tender_no}</td>
                  <td data-label="Title" className=''>{tender.tender.title}</td>
                  <td data-label="Est Val." className=''>{tender.tender.estimated_value}</td>
                  <td data-label="Opening dt." className=''>{moment.utc(tender.tender.opening_date).format("DD-MM-YYYY hh:mm A")}</td>
                  <td data-label="Closing dt." className=''>{moment.utc(tender.tender.closing_date).format("DD-MM-YYYY hh:mm A")}</td>
                  <td data-label="Scraped from" className='text-gray-500 capitalize'>{tender.status}</td>
                </tr>
              ))
              :
              <tr>
                <td colSpan="10">
                  <CardBoxComponentEmpty/>
                </td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserProfileTable
