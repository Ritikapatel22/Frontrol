import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeCurrency } from '../../slices/authslice'

export function CurrencySwitcher() {
  const dispatch = useDispatch()
  const currencyInfo = useSelector((state) => state?.loginAuth?.currencyInfo)
  const [color, setColor] = useState('USD')

  if (currencyInfo?.currency !== 'Multiple') {
    return ''
  }

  return (
    <div className="usdicon flex pl-6">
      <button
        onClick={() => {
          dispatch(changeCurrency('USD'))
          setColor('USD')
        }}
        className={`rounded-l font-bold  font-Inter text-[12px] shadow hover:shadow-xl py-[5px] px-[11px] border border-lightgreen defaultChecked ${
          color == 'USD' && 'bg-lightgreen text-white'
        }`}
      >
        USD
      </button>
      <button
        onClick={() => {
          dispatch(changeCurrency('PFC'))
          setColor('PFC')
        }}
        className={`bg-white rounded-r font-Inter font-bold shadow hover:shadow-xl text-[12px] py-[5px] px-[11px] border border-lightgreen ${
          color == 'PFC' && 'bg-lightgreen text-white'
        }`}
      >
        PFC
      </button>
    </div>
  )
}
