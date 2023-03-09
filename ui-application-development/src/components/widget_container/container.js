import React, { useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import WidgetRender from './render'
import { getQueryStringValue } from '@frontrolinc/pace-ui-framework'
import { changeScreen } from '../../slices/viewslice'
import { useDispatch } from 'react-redux'

export function WidgetContainer({
  keys,
  widget,
  toggleFullScreen,
  isOpen,
  fullScreen,
  setFullScreen,
  cursor,
  type,
  projectNumber,
}) {
  const [option, setOption] = useState('')
  const [isFullScreen, setIsFullScreen] = useState(widget.isFullScreen || '')
  const [project, setProject] = useState(false)
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeScreen(isFullScreen))
    if (!isFullScreen) {
      setTimeout(() => {
        setIsFullScreen('')
      }, 1000)
    }
  }, [isFullScreen])
  const widgetObject = useMemo(() => {
    return {
      ...widget,
      exportOption: option,
      handleExportOption: setOption,
      isFullScreen,
      // component : "AgedARWidgetNew",
    }
  }, [widget, option, setOption, isFullScreen, setProject, project])
  // useEffect(() => {
  //   toggleFullScreen({ id: widget.instanceId, isFullScreen });
  // }, [isFullScreen]);
  return (
    <div
      key={keys}
      className={`${
        widget?.fullWidth
          ? 'bg-white rounded-xl overflow-auto lg:overflow-hidden h-full mt-4'
          : 'bg-white rounded-xl overflow-auto lg:overflow-hidden h-full mt-4'
      } ${
        isFullScreen
          ? 'fullscreen'
          : isFullScreen === false
          ? 'close-fullscreen'
          : ''
      } widget-container`}
    >
      <Header
        key={keys}
        keys={keys}
        id={widget?.instanceId}
        widgetName={widget?.name}
        widget={widget}
        handleExportOption={setOption}
        setIsFullScreen={setIsFullScreen}
        setProject={setProject}
        project={project}
        isFullScreen={isFullScreen}
        setModal={setModal}
        isOpen={isOpen}
        modal={modal}
        fullScreen={fullScreen}
        setFullScreen={setFullScreen}
        cursor={cursor}
        block={widgetObject}
        type={type}
        projectNumber={projectNumber}
      />
      {WidgetRender(widgetObject)}
    </div>
  )
}

WidgetContainer.propTypes = {
  widget: PropTypes.object,
  toggleFullScreen: PropTypes.func,
}

WidgetContainer.defaultProps = {
  toggleFullScreen: function (e) {
    return e
  },
}
