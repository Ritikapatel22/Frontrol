import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

export default function Drawer({
  children,
  isOpen,
  newPopup,
  setIsOpen,
  showSmall = false,
}) {

  useEffect(()=>{
    isOpen ? document.querySelector('body').style.overflow = 'hidden':
    document.querySelector('body').style.overflow ='auto';
  },[isOpen])
  
  return (
    <>
      <main
        className={
          ' fixed overflow-hidden z-[100] bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
          (isOpen
            ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
            : ' transition-all delay-500 opacity-0 translate-x-full  ')
        }
      >
        <section
          className={
            'max-w-[40rem] right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
            (isOpen ? ' translate-x-0 ' : ' translate-x-full ') +
            (showSmall ? showSmall : 'w-screen')
          }
          id="viewContainer"
        >
          <article className="relative pb-10 flex flex-col space-y-6 overflow-y-auto h-full">
            {/* <header className="p-4 font-bold text-lg">Header</header> */}
            {children}
          </article>
        </section>
        <section
          className=" w-screen h-full cursor-pointer "
          onClick={() => setIsOpen(newPopup ? true : false)}
        ></section>
      </main>
    </>
  )
}

Drawer.prototype = {
  children: PropTypes.ReactNode,
  isOpen: PropTypes.boolean,
  diletpopup: PropTypes.boolean,
  newPopup : PropTypes.boolean
}
