import React from "react";
// import { Button } from "@nextui-org/react";
import Button from '@/components/admin/Button';
import Buttons from '@/components/admin/Buttons';

function ConfirmationTooltip({itemId, title = 'Confirm', description, actionButtonText = 'Yes', handleSubmitClick}) {
  return (
   <div className="grid rounded-[14px] p-[0.75rem] max-w-[330px] bg-slate-800 shadow-md"
    >
      <div className="flex justify-center items-center">
        <span className="font-bold text-white">{title}</span>
      </div>
      <div>
        <span className="text-gray-200">
          {description}
        </span>
      </div>
      <div className="my-3 flex justify-center">
        <Buttons>
          <Button 
            label={actionButtonText}
            className='bg-emerald-600 text-white border-0 hover:opacity-80'
            small 
            onClick={()=>{handleSubmitClick(itemId)}}
            />
        </Buttons>
      </div>
    </div>
  )
}

export default ConfirmationTooltip