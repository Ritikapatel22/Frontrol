import React, { useEffect, useRef, useState } from 'react'
import WidgetContainer from '../widget_container'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useCustomization } from '@frontrolinc/pace-ui-framework'

export default function WidgetDragAndDrop({
  widgetsChunks,
  project,
  toggleFullScreen,
  isOpen,
  type,
  projectNumber,
}) {
  const [list, setList] = useState(widgetsChunks)
  const [moveIndex, setMoveIndex] = useState(false)
  const [dragHoverId, setDragHoverId] = useState(false)
  const [startHoverId, setStartHoverId] = useState(false)
  const [modal, setModal] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [cursor, setCursor] = useState('')
  const dispatch = useDispatch()

  const { syncToDataBase } = useCustomization()

  const selectedView = useSelector((state) => state.view.selectedView)
  const fullScreenWidget = useSelector((state) => state.view.isFullScreen)
  const dragItem = useRef()
  const dragOverItem = useRef()

  const dragStart = (e, position) => {
    dragItem.current = position
    setStartHoverId(position)
    setMoveIndex(true)
    setCursor('cursor-grabbing')
  }

  const dragEnter = (e, position) => {
    if (typeof startHoverId === 'number') {
      dragOverItem.current = position
      setDragHoverId(position)
      setMoveIndex(true)
      setCursor('cursor-grabbing')
    }
  }

  useEffect(() => {
    if (widgetsChunks) {
      setList(widgetsChunks)
    }
  }, [widgetsChunks])

  const drop = () => {
    // dispatch(orderWidget(dragOverItem));
    if (
      typeof startHoverId === 'number' &&
      typeof dragHoverId === 'number' &&
      startHoverId !== dragHoverId
    ) {
      const newArr = JSON.parse(
        JSON.stringify(selectedView.json_data.widgets || []),
      )
      if (!fullScreenWidget) {
        swapElements(newArr, startHoverId, dragHoverId)
      }
      const newSelectedView = JSON.parse(JSON.stringify(selectedView))
      newSelectedView.json_data.widgets = newArr
      syncToDataBase(newSelectedView, 'U')
    }
    dragItem.current = null
    dragOverItem.current = null
    setMoveIndex(false)
    setStartHoverId(false)
    setDragHoverId(false)
    setCursor('')
  }

  function swapElements(arr, i1, i2) {
    const temp = arr.splice(i1, 1)
    arr.splice(i2, 0, ...temp)
  }
  return (
    <>
      {list &&
        !project > 0 &&
        list.map((container, index) =>
          container.map((widget, ci) => (
            <div
              data-widget-id={widget.component.name}
              key={`item_${index}_cont_${ci}`}
              name={widget._uid}
              className={`${
                widget?.fullWidth
                  ? `${
                      moveIndex && index === dragHoverId
                        ? ` ${
                            dragHoverId === startHoverId
                              ? `w-full shadow-md mt-4 bg-white rounded-xl hover:shadow-xl overflow-auto relative lg:overflow-hidden`
                              : `w-full shadow-md mt-4 drag-over bg-white rounded-xl hover:shadow-xl overflow-auto relative ${cursor} lg:overflow-hidden`
                          }`
                        : `w-full shadow-md mt-4  bg-white rounded-xl hover:shadow-xl overflow-auto relative ${cursor} lg:overflow-hidden`
                    }
                       ${
                         moveIndex && index === startHoverId
                           ? `w-full shadow-md mt-4 drag-source bg-white rounded-xl hover:shadow-xl overflow-auto relative ${cursor} lg:overflow-hidden`
                           : `w-full shadow-md mt-4 bg-white rounded-xl hover:shadow-xl overflow-auto relative ${cursor} lg:overflow-hidden`
                       }`
                  : `${
                      moveIndex && index === dragHoverId
                        ? `${
                            dragHoverId === startHoverId
                              ? `lg:w-[49.5%] mt-4 shadow-md bg-white rounded-xl hover:shadow-xl cc mr-0 overflow-auto relative lg:overflow-hidden`
                              : `lg:w-[49.5%] mt-4 shadow-md bg-white drag-over rounded-xl hover:shadow-xl cc mr-0 overflow-auto ${cursor} relative lg:overflow-hidden`
                          }`
                        : `lg:w-[49.5%] mt-4  shadow-md bg-white rounded-xl hover:shadow-xl cc mr-0 overflow-auto relative ${cursor} lg:overflow-hidden`
                    }
                       ${
                         moveIndex && index === startHoverId
                           ? `lg:w-[49.5%] mt-4 shadow-md bg-white drag-source rounded-xl hover:shadow-xl cc mr-0 overflow-auto ${cursor} relative lg:overflow-hidden`
                           : `lg:w-[49.5%] mt-4 shadow-md bg-white rounded-xl hover:shadow-xl cc mr-0 overflow-auto relative ${cursor} lg:overflow-hidden`
                       }`
              }`}
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragOver={
                dragHoverId === startHoverId
                  ? undefined
                  : (e) => {
                      e.preventDefault()
                    }
              }
              onDragEnd={drop}
              // draggable={isOpen || modal || fullScreen ? false : true}
            >
              <WidgetContainer
                key={widget._uid}
                keys={widget._uid}
                widget={widget}
                toggleFullScreen={toggleFullScreen}
                isOpen={isOpen}
                setModal={setModal}
                modal={modal}
                fullScreen={fullScreen}
                setFullScreen={setFullScreen}
                cursor={cursor}
                type={type}
                projectNumber={projectNumber}
              />
            </div>
          )),
        )}
    </>
  )
}

WidgetDragAndDrop.prototype = {
  project: PropTypes.bool,
  widgetsChunks: PropTypes.array,
  toggleFullScreen: PropTypes.func,
}
