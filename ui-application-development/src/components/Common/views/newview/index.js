import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { showToast } from '@frontrolinc/pace-ui-framework'

// utils
import { chunkArray, getSelectedView, uid } from '../../../../helpers/utils'

//components
import Addwidget from '../addwidget'

// assests
import back from '../../../../assets/Images/back.svg'
import add from '../../../../assets/Images/add.svg'
import WidgetCard from '../addwidget/widget_card'
import {
  handleViewOperation,
  selectedView,
  changeView,
} from '../../../../slices/viewslice'
import useOnClickOutside from '../../../../hooks/useOutside'
import { CreateView, SavedView } from '../../toast'
import {
  useCustomization,
  usePersonalization,
  withErrorHandler,
  showConfirmation,
} from '@frontrolinc/pace-ui-framework'
import ProceedButton from '../../button/proceedButton'
import Input from '../../textField'
import { useTranslation } from 'react-i18next'

function NewView({
  viewhandle,
  viewData,
  setViewData,
  formIntialdata,
  handleAddView,
  widget,
  setCurrent,
  setViewOpen,
  setNewview,
  addNewView,
  setAddNewview,
  setSelect,
  select,
  viewType,
}) {
  const dispatch = useDispatch()

  const { t } = useTranslation(['label', 'message'])

  // const [addNewView, setAddNewView] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
    clearErrors,
  } = useForm({ defaultValues: viewData })
  const [widgets, setWidgets] = useState(
    viewData?.json_data?.widgets ? viewData?.json_data?.widgets : [],
  )
  const [currentWidget, setCurrentWidget] = useState(widgets)
  const [list, setList] = useState(widgets)
  const [moveIndex, setMoveIndex] = useState(false)
  const [hoverId, setHoverId] = useState()
  const [startHoverId, setStartHoverId] = useState(true)
  const [cursor, setCursor] = useState('cursor-grab')
  const [viewName, setViewName] = useState(viewData.view_name)
  const dragItem = useRef()
  const dragOverItem = useRef()
  const refFrom = useRef()
  const ref = useRef(null)
  const refExpt = useRef(null)

  const { syncToDataBase } = useCustomization()

  const personalizationContext = usePersonalization()
  // { syncToDataBase , personalizationData }
  useOnClickOutside(ref, () => {
    // viewData.view_id
    //   ? (setNewview(false), setAddNewview(false))
    //   : (setNewview(false),
    setViewData(formIntialdata),
      // setAddNewview(false),
      setViewOpen(false)
  })
  useOnClickOutside(refExpt, () => {})

  const selected = useSelector((state) => state.view.selectedView)

  const widgetsChunks = useMemo(() => {
    if (widgets && widgets?.length > 0) {
      return chunkArray(widgets)
    }
    return []
  }, [widgets])

  const views = useSelector((state) => state.view.views)

  const dragStart = (e, position) => {
    dragItem.current = position
    setStartHoverId(position)
    setMoveIndex(true)
    setCursor('cursor-grabbing')
  }

  const dragEnter = (e, position) => {
    dragOverItem.current = position
    setHoverId(position)
    setMoveIndex(true)
    setCursor('cursor-grabbing')
  }

  const drop = () => {
    const copyListItems = [...list]
    const dragItemContent = copyListItems[dragItem.current]
    copyListItems.splice(dragItem.current, 1)
    copyListItems.splice(dragOverItem.current, 0, dragItemContent)
    dragItem.current = null
    dragOverItem.current = null
    setMoveIndex(false)
    setStartHoverId(false)
    setList(copyListItems)
    setCursor('cursor-grab')
  }

  const changeHandler = (e, widget) => {
    if (e.target.checked) {
      const newWidget = { ...widget }
      newWidget.instanceId = uid()
      setWidgets([...widgets, newWidget])
      setCurrentWidget([...widgets, newWidget])
    } else {
      const filteredPersonalizationData = personalizationContext.personalizationData.current.find(
        (e) => e.document_name.includes(widget.instanceId),
      )
      if (filteredPersonalizationData) {
        personalizationContext.syncToDataBase(
          selected.view_id +
            '_' +
            widget.instanceId +
            '_' +
            filteredPersonalizationData.document_name.split('_')[2],
          filteredPersonalizationData.payload,
          'D',
        )
      }
      if (e.type === 'change') {
        const findIndex = widgets.findIndex((wid) => wid.name == widget.name)
        if (findIndex >= 0) {
          showConfirmation({
            title: t('remove widget', { ns: 'message' }),
            msg: t('delete warning widget', { ns: 'message' }),
            onConfirm: () => {
              console.log('Confirmation result: confirmed')
              setWidgets([
                ...widgets.filter((wid) => wid.instanceId != widget.instanceId),
              ])
            },
            onClose: () => {
              console.log('close view popup')
            },
            confirmLabel: t('Yes'),
            cancelLabel: t('No'),
          })
        }
      }
    }
  }

  useEffect(() => {
    setValue('json_data.widgets', widgets)
    setList(widgets)
  }, [widgets])

  const onSubmit = (data) => {
    if (data?.json_data?.widgets?.length === 0) {
      setAddNewview(true)
      return
    }
    const newData = JSON.parse(JSON.stringify(data))
    let newView = false
    let CRUD = 'U'
    if (!newData?.view_id) {
      delete newData.view_id
      newView = true
      CRUD = 'C'
    }
    newData.json_data.widgets = list
    handleAddView({ data: newData, newView, list })

    setAddNewview(false)
    setCurrent(false)
    setSelect(viewData.created_from_view_id ? viewData : select)

    setViewOpen(true)

    syncToDataBase(newData, CRUD)
  }

  const changeData = (e) => {
    if (e.target.value) {
      clearErrors()
    } else {
      errors
    }
  }

  const handleAddWidget = async (e) => {
    // const resultName = await trigger('view_name')
    // const resultDesc = await trigger('description')
    setCurrentWidget(widgets)
    // if(viewName === ""){
    //   return showToast('error', "Please enter value for the require field", 'drawer')
    // }
    // if (!resultName) {
    //   return
    // }
    setAddNewview(true)
  }

  const handleBackButton = () => {
    setNewview(false)
    setViewData(formIntialdata)
    handleAddView({})
  }

  const handleCancelButton = () => {
    viewhandle
    handleBackButton()
  }

  const handleProcced = () => {
    // dispatch(selectedView(select));
  }

  useEffect(() => {
    if (widget) {
      setAddNewview(true)
    } else {
      setAddNewview(false)
    }
  }, [widget])

  const disable =
    viewData?.created_from_view_id || viewData?.global === 'Y' ? true : false

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} ref={refFrom}>
        <div className="fixed right-0 top-0 h-[100vh] w-full bg-white rounded overflow-y-auto shadow-lg z-[999]">
          <div className="flex flex-col h-full">
            <div className="h-[60vh] lg:h-[60vh] xl:h-[70vh] 2xl:h-[70vh] pl-9 pr-11 pt-5">
              <div className="flex items-center pb-6 cursor-pointer">
                <div className="w-[32px] h-[32px] ml-[-8px]">
                  <img
                    src={back}
                    alt="back"
                    className="w-full h-full"
                    onClick={() => handleBackButton()}
                  />
                </div>
                <h2 className="text-2xl font-bold font-Inter text-green ml-3 ">
                  {viewData?.view_id ? t('Edit view') : t('New view')}
                </h2>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
                  {t("View name")} <span className="text-red">*</span>
                </label>
                <Input
                  type={disable ? 'disable' : 'normal'}
                  fieldName="view_name"
                  register={register}
                  placeHolder={t('view name', { ns: 'message' })}
                  isRequired={true}
                  disable={disable ? true : false}
                  errors={errors}
                  handleClick={(e) => {
                    changeData(e), setViewName(e.target.value)
                  }}
                  maxLength="60"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-normal leading-[16.38px] font-Inter mb-[11px]">
                  {t('Description')}
                </label>
                <Input
                  type={disable ? 'disable' : 'normal'}
                  fieldName="description"
                  register={register}
                  placeHolder={t('view description', { ns: 'message' })}
                  isRequired={false}
                  errors={errors}
                  disable={disable ? true : false}
                  maxLength="60"
                />
              </div>

              <div className="flex pt-5 mb-3">
                <button
                  type="button"
                  onClick={handleAddWidget}
                  className="border border-lightgreen h-[36px] hover:bg-[#CFDFD7] transition-all px-3 flex justify-center items-center font-bold font-Inter text-sm ml-1 rounded text-lightgreen"
                >
                  <img src={add} alt="add" className="mr-[10px]" />
                  {t('Add widgets')}
                </button>
              </div>
              <div className="aged_trend overflow-x-auto h-[40vh] lg:h-[47vh] xl:h-[45vh] 2xl:h-[50vh]">
                {list.map((widget, index) => {
                  const checked = widgets.find(
                    (wid) => wid.component == widget.component,
                  )
                  return (
                    <div
                      key={index}
                      className={`${
                        checked && widget.name
                          ? `${
                              moveIndex && index === hoverId
                                ? `${
                                    hoverId === startHoverId
                                      ? `checked highirse flex items-start border mb-3 hover:shadow-lg ${cursor} rounded-lg shadow-xl relative after:absolute after-content-[''] after:rounded-l-[10px] after:h-full after:w-[9px] after:left-[-1px] after:top-0 after:bg-lightgreen`
                                      : `drag-over ${cursor} checked highirse flex items-start border mb-3 hover:shadow-lg rounded-lg shadow-xl relative after:absolute after-content-[''] after:rounded-l-[10px] after:h-full after:w-[9px] after:left-[-1px] after:top-0 after:bg-lightgreen`
                                  }`
                                : `${cursor} checked highirse flex items-start border mb-3 hover:shadow-lg rounded-lg shadow-xl relative after:absolute after-content-[''] after:rounded-l-[10px] after:h-full after:w-[9px] after:left-[-1px] after:top-0 after:bg-lightgreen`
                            }
                               ${
                                 moveIndex && index === startHoverId
                                   ? `drag-source ${cursor} checked highirse flex items-start border mb-3 hover:shadow-lg rounded-lg shadow-xl relative after:absolute after-content-[''] after:rounded-l-[10px] after:h-full after:w-[9px] after:left-[-1px] after:top-0 after:bg-lightgreen`
                                   : `${cursor} checked highirse flex items-start border mb-3 hover:shadow-lg rounded-lg shadow-xl relative after:absolute after-content-[''] after:rounded-l-[10px] after:h-full after:w-[9px] after:left-[-1px] after:top-0 after:bg-lightgreen`
                               }`
                          : `${
                              moveIndex && index === hoverId
                                ? `${
                                    hoverId === startHoverId
                                      ? `highirse flex items-start mb-3 hover:shadow-lg ${cursor} rounded-lg shadow-xl relative`
                                      : `drag-over ${cursor} highirse flex items-start mb-3 hover:shadow-lg rounded-lg shadow-xl relative`
                                  }`
                                : `${cursor} highirse flex items-start mb-3 hover:shadow-lg rounded-lg shadow-xl relative`
                            }
                               ${
                                 moveIndex && index === startHoverId
                                   ? `drag-source ${cursor} highirse flex items-start mb-3 hover:shadow-lg rounded-lg shadow-xl relative`
                                   : `${cursor} highirse flex items-start mb-3 hover:shadow-lg rounded-lg shadow-xl relative`
                               }`
                      }`}
                      onDragStart={(e) => dragStart(e, index)}
                      onDragEnter={(e) => dragEnter(e, index)}
                      onDragOver={
                        hoverId === startHoverId
                          ? undefined
                          : (e) => {
                              e.preventDefault()
                            }
                      }
                      onDragEnd={drop}
                      draggable
                    >
                      <WidgetCard
                        changeHandler={(e) => changeHandler(e, widget)}
                        checked={checked}
                        widget={widget}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="proceed mt-auto z-[10] bg-white">
              {addNewView && (
                <Addwidget
                  addViewhandle={() => {
                    {
                      widget
                        ? (setNewview(false),
                          setViewOpen(false),
                          setAddNewview(false))
                        : setAddNewview(false)
                    }
                  }}
                  setWidgets={setWidgets}
                  setNewview={setNewview}
                  setAddNewView={setAddNewview}
                  Widgets={widget}
                  setValue={setValue}
                  data={getValues()}
                  refFrom={refFrom}
                  currentWidget={currentWidget}
                  viewData={viewData}
                />
              )}
              <div className="flex items-center pt-5 mx-[10px] sm:mx-[30px] pb-5">
                <ProceedButton
                  type="primaryButton"
                  label={viewData?.view_id ? t('Save view') : t('Create view')}
                  handleClick={() => handleProcced()}
                />
                <ProceedButton
                  type="secondaryButton"
                  label={t('Cancel')}
                  handleClick={() => handleCancelButton()}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

// export default NewView;
export default withErrorHandler(NewView, { mode: 'toast' })
