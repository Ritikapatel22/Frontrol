import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateWidget } from '../../slices/viewslice'
import { PropTypes } from 'prop-types'
import { useCustomization } from '@frontrolinc/pace-ui-framework'
import ProceedButton from '../Common/button/proceedButton'
import Input from '../Common/textField'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { DropDown } from '@frontrolinc/pace-ui-framework'

function ChartModel({ modal, setModal, widget, componentName }) {
  const { t } = useTranslation(['label'])
  const [fullWidth, setWidth] = useState(widget.fullWidth)
  const [data, setdata] = useState({
    name: !widget.isModified
      ? t(`${widget.componentKey}_title`, { ns: 'message' })
      : widget.name,
    description: !widget.isModified
      ? t(`${widget.componentKey}_desc`, { ns: 'message' })
      : widget.description,
    id: widget.instanceId,
  })
  const { register, handleSubmit } = useForm({ defaultValues: data })

  const dispatch = useDispatch()

  const { syncToDataBase } = useCustomization()
  const ref = useRef(null)

  const handler = (e) => {
    const { name, value } = e.target
    console.log('name', name, 'value', value)
    setdata((prevState) => ({
      ...prevState,
      [name]: value,
      isModified: true,
    }))
  }

  const handleWidth = (e) => {
    if (e.value === '100%') {
      setWidth(true)
    } else {
      setWidth(false)
    }
  }

  const objConfig = {
    mode: 'singleSelect',
    remote: false,
    data: [
      {
        label: '50%',
        value: '50%',
      },
      {
        label: '100%',
        value: '100%',
      },
    ],
    itemTemplate: "<div class='left-item '><div>{label}</div></div>",
  }

  const onSave = () => {
    setModal(false)
    dispatch(updateWidget({ syncToDataBase, ...data, fullWidth }))
  }

  return (
    <div>
      <div
        ref={ref}
        className={`top-0 right-0 w-[467px] transition-all duration-250 ease-linear animation-all fixed h-[100vh]  overflow-y-auto  bg-[#fffffd] z-[999]`}
      >
        <div className="relative flex flex-col justify-between h-full py-4">
          <div>
            <div className="flex items-center justify-between px-[9px] pb-4 shadow-md  sm:px-[21px]">
              <h1 className="text-base sm:text-2xl text-[#0e3943] font-bold font-Inter">
                {t('Widget settings')}
              </h1>
            </div>
          </div>
          <div className="overflow-x-auto h-[75vh] lg:h-[75vh] xl:h-[78vh] 2xl:h-[86vh]">
            <div className="px-6 pt-4">
              <div>
                <label
                  className="text-sm font-Inter font-normal"
                  htmlFor="emailaddress"
                >
                  {t('Widget name')}
                </label>
                <div className="mt-1">
                  <Input
                    type="normal"
                    fieldName="name"
                    register={register}
                    placeHolder={t('widget_settings_placeHolder_name', {
                      ns: 'message',
                    })}
                    isRequired={true}
                    handleClick={(e) => handler(e)}
                    maxLength="1000"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label
                  className="text-sm font-Inter font-normal"
                  htmlFor="description"
                >
                  {t('Description')}
                </label>
                <div className="my-1">
                  <Input
                    type="textarea"
                    fieldName="description"
                    register={register}
                    placeHolder={t('widget_settings_placeHolder_desc', {
                      ns: 'message',
                    })}
                    isRequired={true}
                    handleClick={(e) => handler(e)}
                    maxLength="1000"
                  />{' '}
                </div>
              </div>
              <label className="text-sm font-[400] text-black font-Inter mb-[11px]">
                {t('Width')}
              </label>
              <div className="mt-[5px] widget">
                <DropDown
                  config={objConfig}
                  labelField="label"
                  valueField="value"
                  onChange={(e) => handleWidth(e)}
                  value={
                    fullWidth
                      ? { label: '100%', value: '100%' }
                      : { label: '50%', value: '50%' }
                  }
                  clearable={false}
                />
              </div>
            </div>
          </div>
          <div className="proceed">
            <div className="flex items-center pt-5 mx-[10px] sm:mx-[30px] pb-1">
              <ProceedButton
                type="primaryButton"
                label={t('Save settings')}
                handleClick={onSave}
              />
              <ProceedButton
                type="secondaryButton"
                label={t('Cancel')}
                handleClick={() => setModal(!modal)}
              />
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <div className="fixed overlay h-[100vh] right-0 top-0 bottom-0 left-0  z-[98]"></div>
      )}
    </div>
  )
}

ChartModel.propTypes = {
  modal: PropTypes.bool,
}

export default ChartModel
