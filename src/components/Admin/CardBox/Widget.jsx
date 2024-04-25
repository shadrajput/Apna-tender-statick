import React from 'react'
import Icon from '../Icon'
import CardBox from '.'
import NumberDynamic from '../NumberDynamic'

const CardBoxWidget = (props) => {
  return (
    <CardBox>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg leading-tight text-gray-500 dark:text-slate-400">{props.label}</h3>
          <h1 className="text-3xl leading-tight font-semibold">
            <NumberDynamic
              value={props.number}
              prefix={props.numberPrefix}
              suffix={props.numberSuffix}
            />
          </h1>
        </div>
        {props.icon && (
          <Icon path={props.icon} size="48" w="" h="h-16" className={props.iconColor} />
        )}
      </div>
    </CardBox>
  )
}

export default CardBoxWidget
