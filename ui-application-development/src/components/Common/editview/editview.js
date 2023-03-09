import React, { useCallback, useRef, useState, useLayoutEffect } from 'react'
import back from '../../../assets/Images/back.svg'
import add from '../../../assets/Images/add.svg'
import Addwidget from '../addwidget/addwidget'
import { useDispatch, useSelector } from 'react-redux'
import { selectedAddView } from '../../../slices/viewslice'
import { useTranslation } from 'react-i18next';

function EditView({ viewhandle, edithandle, selectedView }) {
  const [addNewView, setAddNewview] = useState(false)
  const addViewhandle = () => {
    setAddNewview(!addNewView)
  }
  const addWidget = useSelector((state) => state?.view?.addWidget)
  const views = useSelector((select) => select.view.addWidget)
  const dispatch = useDispatch()
  const defaultAddWidget = useSelector(
    (state) => state?.view?.selectedAddView.title,
  )
  const selected = useSelector((state) => state.view.addWidget)
  const { t } = useTranslation(['label']);

  const [select, setSelect] = useState(selected)
  const handleProceed = () => {
    addViewhandle(false)
    dispatch(selectedAddView(select))
  }
  const handleClick = useCallback((view) => {
    setSelect(view)
  }, [])
  const changeHandler = (e) => {}
  return (
    <div>
      <div className="fixed right-0 top-0 h-[100vh] w-full bg-white rounded overflow-y-auto shadow-lg pl-9 pr-11 pt-9">
        <div className="flex justify-between flex-col h-full">
          <div>
            <div>
              <div className="flex items-center pb-10 cursor-pointer">
                <img src={back} alt="back" onClick={edithandle} />
                <h2 className="text-2xl font-bold font-Inter text-green ml-3">
                  {t("Edit View")}
                </h2>
              </div>
              <div className="flex flex-col mb-5">
                <label className="text-sm font-normal font-Inter mb-[11px]">
                  {t("View Name")}
                </label>
                <input
                  type="text"
                  // value={data.newView}
                  // onChange={handler}
                  placeholder={t("Enter a name for this view here", { ns : 'message'})}
                  className="bg-grey text-sm rounded-md py-3 px-[18px]  focus:outline-lightgreen focus:ring-lightgreen focus:bg-white focus:border-lightgreen font-Inter"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-normal font-Inter mb-[11px] ">
                  {t("Description")}
                </label>
                <input
                  // value={data.description}
                  // onChange={handler}
                  placeholder={t("Enter view description here", { ns : 'message'})}
                  className="bg-grey text-sm rounded-md pb-[60px] pt-3 px-[18px]  focus:outline-lightgreen focus:ring-lightgreen focus:bg-white focus:border-lightgreen font-Inter"
                  rows={3}
                />
              </div>
              <div className="flex pt-5">
                <button
                  onClick={addViewhandle}
                  className="flex justify-center items-center py-[10px] px-[22px] text-lightgreen font-bold text-sm font-Inter border border-lightgreen rounded-md"
                >
                  <img src={add} alt="add" className="mr-[10px]" />
                  {t("Add widgets")}
                </button>
              </div>
            </div>
            {addWidget.map((widget, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    defaultAddWidget === widget.title
                      ? " checked highirse flex items-start border mt-3 hover:shadow-lg  p-[5px] pl-4  py-3.5 rounded-lg shadow-xl relative after:absolute after-content-[''] after:rounded-l-[10px] after:h-full after:w-[9px] after:left-[-1px] after:top-0 after:bg-lightgreen"
                      : 'highirse flex items-start border mt-3 hover:shadow-lg  p-[5px] pl-4  py-3.5 rounded-lg shadow-xl relative '
                  } `}
                >
                  <div className="mr-[9px] absolute top-0 left-0">
                    <label className="checkmarkvalue">
                      <input
                        type="checkbox"
                        onChange={(e) => changeHandler(e)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="pl-9">
                    <h3 className="text-sm font-medium font-Inter text-black">
                      {widget.title}
                    </h3>
                    <p
                      className="text-xs font-normal text-lightgrey
                 font-Inter"
                    >
                      {widget.filters}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <div>
            <div>
              <div className="proceed">
                <div className="flex items-center pt-5 mx-[10px] sm:mx-[30px] pb-5">
                  <button
                    className="px-3 py-[10px] bg-lightgreen hover:bg-[#005D47] transition-all font-bold font-Inter text-sm rounded text-white"
                    onClick={addViewhandle}
                  >
                    Proceed
                  </button>
                  <button
                    className="border border-lightgreen hover:bg-[#CFDFD7] transition-all px-3 py-[10px] font-bold font-Inter text-sm ml-3 rounded text-lightgreen"
                    onClick={edithandle}
                  >
                    Cancel
                  </button>
                  {addNewView ? (
                    <Addwidget addViewhandle={addViewhandle} />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditView
