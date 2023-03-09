import React, { useEffect, useState, useRef } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import './usersetting.css'
import { useTranslation } from 'react-i18next'
import closeIcon from '../../assets/Images/close-icon.svg'
import setting from '../../assets/Images/more_setting.svg'
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  DropDown,
  userSettingsFactory,
  showConfirmation,
} from '@frontrolinc/pace-ui-framework'
import version from '../../version.json'
import { useUpdateDataMutation, useFetchDataQuery } from '../../app/appApi'
import ProceedButton from '../Common/button/proceedButton'
import { useSelector } from 'react-redux'
import {
  logger,
  LOG_LEVEL,
  getVisitedPath,
  resetVisitedPath,
} from '@frontrolinc/pace-ui-framework'
import { useMemo } from 'react'
import back from '../../assets/Images/back.svg'
import { SingleLogItem } from "./log-item";
import { starCase } from "../../helpers/utils";
import { useWindowReSize } from "../../hooks/useWindowResize";

const Usersetting = ({ openSetting, setOpenSetting, setShowSelectedLog, showSelectedLog }) => {
  const { t, i18n } = useTranslation(["label"])

  const [selectedTab, setSelectedTab] = useState('1')

  const logContainerRef = useRef()
  const bottomBarRef = useRef(null)
  const releaseNotesUrl = process.env.REACT_APP_RELEASE_NOTES_URL

  const [refreshKey, setRefreshKey] = useState(0);
  const visitedPaths = useLiveQuery(
    () => getVisitedPath(),
    [refreshKey]
  );

  const [logLevel, setLogLevel] = useState(() => logger.getLogLevel());


  const [selectTitle, setSelectedTitle] = useState(null)
  const [showOnlyErrors, setShowOnlyErrors] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(null)

  const [selectedLog, setSelectedLog] = useState()

  const filterQuery = {
    title: selectTitle,
    duration: selectedDuration,
    showOnlyErrors,
  }

  let logs = useLiveQuery(() => logger.getByFilter(filterQuery), [
    selectTitle,
    selectedDuration,
    showOnlyErrors,
    refreshKey,
  ])

  const pathGroup = useMemo(
    () =>
      visitedPaths?.reduce(
        (group, item) => ({
          ...group,
          [item.path]: item.title,
        }),
        {},
      ),
    [visitedPaths],
  )

  let logUpdates = []

  logs = useMemo(
    () =>
      logs
        ?.map((log) => {
          if (pathGroup[log.path]) {
            log.title = pathGroup[log.path]
            logUpdates.push(logger.update(log.id, { ...log }))
            return log
          }
        })
        .filter(Boolean),
    [logs],
  )

  useEffect(() => {
    const updateTitle = async () => {
      await Promise.all(logUpdates)
    }

    updateTitle()
  }, [logUpdates])

  const titles = [...new Set(logs?.map(({ title }) => title))]

  useEffect(() => {
    if (!openSetting) {
      setSelectedTab('1')
    }
  }, [openSetting])

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
    }
  })
  const LOG_LEVEL_OPTIONS = {
    mode: 'singleSelect',
    remote: false,
    data: Object.keys(LOG_LEVEL).map((key) => ({
      label: t(starCase(key)),
      value: key,
    })),
    itemTemplate: "<div class='left-item '><div>{label}</div></div>",
  }
  const DATEFORMAT = {
    mode: 'singleSelect',
    remote: false,
    data: [
      {
        label: 'dd-mmm-yy',
        value: 'dd-mmm-yy',
      },
      {
        label: 'mm/dd/yyyy',
        value: 'mm/dd/yyyy',
      },
      {
        label: 'dd/mm/yyyy',
        value: 'dd/mm/yyyy',
      },
    ],
    itemTemplate: "<div class='left-item '><div>{label}</div></div>",
  }

  const NUMBERFORMAT = {
    mode: 'singleSelect',
    remote: false,
    data: [
      {
        value: 'decimal_period',
        label: t('Decimal=period, Digit grouping=comma'),
      },
      {
        value: 'decimal_comma',
        label: t('Decimal=comma, Digit grouping=period'),
      },
    ],
    itemTemplate: "<div class='left-item '><div>{label}</div></div>",
  }

  const [update] = useUpdateDataMutation()
  useSelector((state) => state?.loginAuth)

  const localLang = localStorage.getItem('i18nextLng')
  localLang ? localLang : localStorage.setItem('i18nextLng', 'en')

  useEffect(() => {
    if (localLang)
      LANGUAGES.data.map((e) => {
        if (e.value === localLang) {
          setLanguage(e)
        }
      })
  }, [localLang])

  const LANGUAGES = {
    mode: 'singleSelect',
    remote: false,
    data: [
      {
        label: t('English'),
        value: 'en',
      },
      {
        label: t('French'),
        value: 'fn',
      },
      {
        label: t('Chinese'),
        value: 'zh',
      },
    ],
    itemTemplate: "<div class='left-item '><div>{label}</div></div>",
  }

  const durationOptions = [
    {
      label: `> 2 ${t('sec')}`,
      value: '2',
    },
    {
      label: `> 5 ${t('sec')}`,
      value: '5',
    },
    {
      label: `> 10 ${t('sec')}`,
      value: '10',
    },
    {
      label: `> 20 ${t('sec')}`,
      value: '20',
    },
    {
      label: `> 30 ${t('sec')}`,
      value: '30',
    },
    {
      label: `> 1 ${t('min')}`,
      value: '60',
    },
  ]

  const [language, setLanguage] = useState({
    label: t('English'),
    value: 'en',
  })

  const [dateFormat, setDateFormat] = useState({
    label: 'dd-mmm-yy',
    value: 'dd-mmm-yy',
  })

  const [numberformat, setNumberformat] = useState({
    value: 'decimal_period',
    label: t('Decimal=period, Digit grouping=comma'),
  })

  // const languageHandler = (val) => {
  //   //i18n.changeLanguage(val.value)
  //   LANGUAGES.data.map((e) => {
  //     if(e.value == val.value) {
  //       setLanguage(e)

  //     }
  //   })
  //   userSettingsFactory.setLang(val.value)
  // }

  //   useEffect(()=>{
  //     fetch('version.json').then(response => {
  //         response.json().then(versionData => {
  //             setVersion(versionData)
  //         })
  //     })
  // }, [])

  const userSettingData = useRef(null)

  const { data } = useFetchDataQuery({
    queryName: 'Personalization.GetDocumentsByCategory',
    document_category: 'Settings',
    __config__: {
      providesTags: () => ['UserSettings'],
    },
  })

  const useSettingObj = {
    langCode: language.value,
    dateFormat: dateFormat.value,
    numberformat: numberformat.value,
  }

  const handleProceed = () => {
    if (userSettingData.current) {
      const settingsdata = data.Data['Personalization.GetDocumentsByCategory']
      const currentUserSettingsData = userSettingData.current.find((e) =>
        settingsdata.find((ele) => e.document_name === ele.document_name),
      )
      const newObj = {
        Personalization: {},
      }
      newObj['Personalization']['CRUD'] = currentUserSettingsData ? 'U' : 'C'
      newObj['Personalization']['document_name'] = `User_Preferences`
      newObj['Personalization']['document_category'] = 'Settings'
      newObj['Personalization']['payload'] = useSettingObj
      const queryResult = update({
        name: { documentName: 'Personalization' },
        body: [newObj],
        __config__: { invalidatesTags: () => ['UserSettings'] },
      })
    }
    i18n.changeLanguage(language.value)
    userSettingsFactory.publish('dateFormatChanged')
    logger.setLogLevel(logLevel)
    setOpenSetting(false)
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  // BELOW FUNCTION WILL REPLACED THE CURRENT HANDLER ONCE THE ENDPOINTS ARE CHANGED
  // const handleProceed = () => {
  //   if (userSettingData.current) {
  //     const settingsdata = data.Data['Settings']
  //     const currentUserSettingsData = userSettingData.current.find(
  //       (e) => settingsdata.find((ele) =>  e.document_name === ele.document_name)
  //     )
  //     const newObj = {
  //       Settings: {},
  //     }
  //     newObj['Settings']['CRUD'] = currentUserSettingsData ? 'U' : 'C'
  //     newObj['Settings']['payload'] = useSettingObj
  //     const queryResult = update({
  //       name: { documentName: 'Settings' },
  //       body: [newObj],
  //     })
  //   }
  //   setOpenSetting(false)
  // }

  useEffect(() => {
    if (
      data &&
      data.Data &&
      Array.isArray(data.Data['Personalization.GetDocumentsByCategory'])
    ) {
      userSettingData.current =
        data.Data['Personalization.GetDocumentsByCategory']
      data.Data['Personalization.GetDocumentsByCategory'].map((ele) => {
        LANGUAGES.data.map((e) => {
          if (
            ele &&
            ele.payload &&
            ele.payload.langCode &&
            e.value === ele.payload.langCode
          ) {
            setLanguage(e)
            i18n.changeLanguage(e.value)
            userSettingsFactory.setLang(e.value)
          }
        })
        DATEFORMAT.data.map((e) => {
          if (
            ele &&
            ele.payload &&
            ele.payload.dateFormat &&
            e.value === ele.payload.dateFormat
          ) {
            setDateFormat(e)
            userSettingsFactory.setDateFormat(e.value)
          }
        })
        NUMBERFORMAT.data.map((e) => {
          if (
            ele &&
            ele.payload &&
            ele.payload.numberformat &&
            e.value === ele.payload.numberformat
          ) {
            setNumberformat(e)
            userSettingsFactory.setNumberFormat(e.value)
          }
        })
        userSettingsFactory.publish('changeUserSettings')
      })
    }
  }, [data])

  const getEmptyDiv = () => {
    return (
      <div className="py-3 px-5 text-center m-2 bg-grey">
        {t("no_logs", {ns: "message"})}.
      </div>
    )
  }

  const exportData = () => {
    const data = selectedLog || logs

    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2),
    )}`
    const link = document.createElement('a')
    link.href = jsonString
    link.download = selectedLog
      ? `log_${selectedLog.timestamp}.json`
      : `logs.json`

    link.click()
  }

  const selectedLogLevel = useMemo(() => {
    return logLevel ? {
      label: t(starCase(logLevel)),
      value: logLevel
    } : {}
  }, [logLevel])

  const selectTitleOption = useMemo(() => {
    return selectTitle
      ? {
          label: selectTitle,
          value: selectTitle,
        }
      : {
          label: '',
          value: '',
        }
  }, [selectTitle])

  const selectedDurationOption = useMemo(() => {
    return selectedDuration
      ? {
          label: durationOptions.find(({ value }) => value === selectedDuration)
            .label,
          value: selectedDuration,
        }
      : {
          label: '',
          value: '',
        }
  }, [selectedDuration])

  const pathOptions = titles?.map((title) => ({
    label: title,
    value: title,
  }))

  const onLogSelect = (log) => {
    setSelectedLog(log)
    setShowSelectedLog(true)
  }

  const refreshLogs = () => setRefreshKey(Math.random() * 1000)

  const clearLogs = async () => {
    await logger.reset()
    await resetVisitedPath()
    refreshLogs()
  }

  const handleDelete = () => {
    showConfirmation({
      msg: t('DELETE_LOG_MESSAGE', { ns: 'message' }),
      title: t('DELETE_LOG_TITLE', { ns: 'message' }),
      onConfirm: clearLogs,
      onClose: () => {
        console.log('clear log popup')
      },
      confirmLabel: t('Yes'),
      cancelLabel: t('No'),
    })
  }

  return (
    <div>
      <div className="top-0 w-full transition-all duration-250 ease-linear animation-all fixed h-[100vh]  bg-[#fffffd] z-[999]">
        <div className="flex flex-col h-full relative py-4">
          {!selectedLog && <div className="flex relative z-100 bg-white items-center justify-between px-[10px] sm:px-[30px]">
            <h1 className="flex relative items-center justify-between text-base sm:text-2xl text-[#0e3943] font-bold font-Inter">
              <img
                src={setting}
                alt="setting"
                className="w-[25px] h-[25px] sm:w-auto"
              />
              <span className="ml-2">
                {t("Settings")}
              </span>
            </h1>
            <button
              onClick={() => {
                setOpenSetting(false);
              }}
            >
              <img src={closeIcon} alt="close-icon" className='hover:bg-[#E6F3F0]' />
            </button>
          </div>}
          <div className="mx-[30px]">
            <Tabs
              defaultSelected="1"
              selected={selectedTab}
              className="tab-context"
            >
              <TabList
                onTabChange={(index) => {
                  refreshLogs()
                  setSelectedTab(index)
                }}
                className="relative"
              >
                <Tab id="1">{t('Preferences')}</Tab>
                <Tab id="2">{t('Logs')}</Tab>
              </TabList>

              <TabPanel id="1" panel="second">
                <div className="py-[6px]">
                  <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
                    {t("Language")}
                  </label>
                  <div
                    className={`pl-1 pt-2 pb-2 style-select text-xs relative flex gap-[20px] w-full pr-[25px] filter user-frofile-width`}
                  >
                    <DropDown
                      clearable={false}
                      label="Language"
                      labelField="label"
                      valueField="value"
                      config={LANGUAGES}
                      value={language}
                      onChange={(val) => setLanguage(val)}
                    />
                  </div>
                </div>
                <div className="py-[6px]">
                  <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
                    {t("Date format")}
                  </label>
                  <div
                    className={`pl-1 pt-2 pb-2 style-select text-xs relative flex gap-[20px] w-full pr-[25px] filter user-frofile-width`}
                  >
                    <DropDown
                      clearable={false}
                      label="Date format"
                      labelField="label"
                      valueField="value"
                      config={DATEFORMAT}
                      value={dateFormat}
                      onChange={(val) => {
                        setDateFormat(val)
                      }}
                    />
                  </div>
                </div>
                <div className="py-[6px]">
                  <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
                    {t("Number format")}
                  </label>
                  <div
                    className={`pl-1 pt-2 pb-2 style-select text-xs relative flex gap-[20px] w-full pr-[25px] filter user-frofile-width`}
                  >
                    <DropDown
                      clearable={false}
                      label="Number format"
                      labelField="label"
                      valueField="value"
                      config={NUMBERFORMAT}
                      value={numberformat}
                      onChange={(val) => setNumberformat(val)}
                    />
                  </div>
                </div>
                <div className="py-[6px]">
                  <label className="text-sm font-[400] text-black leading-[16.38px] font-Inter mb-[11px] tracking-[3%]">
                    {t("LOG_LEVEL_LABEL")}
                  </label>
                  <div
                    className={`pl-1 pt-2 pb-2 style-select text-xs relative flex gap-[20px] w-full pr-[25px] filter user-frofile-width`}
                  >
                    <DropDown
                      clearable={false}
                      label="Set log level"
                      labelField="label"
                      valueField="value"
                      placeholder={'Set log level'}
                      config={LOG_LEVEL_OPTIONS}
                      value={selectedLogLevel}
                      onChange={({ value }) => setLogLevel(value)}
                    />
                  </div>
                </div>
                {version?.version && (
                  <div className="fixed bottom-4 w-full text-sm text-lightgrey text-center v-development my-5 pb-2">
                    <div className={`${releaseNotesUrl ? 'acm-hyperlink' : ''}`} onClick={() => releaseNotesUrl ? window.open(releaseNotesUrl, '_blank') : ""}>{version?.version}</div>
                  </div>
                )}
                <div className="proceed fixed bottom-0 w-full ml-[-20px]">
                  <div className="flex items-center pt-5 pb-5 ml-2">
                    <ProceedButton
                      type="primaryButton"
                      label={t('Save')}
                      handleClick={handleProceed}
                    />
                    <ProceedButton
                      type="secondaryButton"
                      label={t('Cancel')}
                      handleClick={() => setOpenSetting(false)}
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel id="2" panel="second">
                <div className={`logs-filter flex py-[6px] mb-2`}>
                  <DropDown
                    clearable={true}
                    label={t('Filter by page')}
                    labelField="label"
                    valueField="value"
                    placeholder={t('Filter by page')}
                    config={{
                      mode: 'singleSelect',
                      data: [
                        {
                          label: '',
                          value: '',
                        },
                        ...pathOptions,
                      ],
                      remote: false,
                      itemTemplate:
                        "<div class='left-item '><div>{label}</div></div>",
                    }}
                    value={selectTitleOption}
                    onChange={(selectedOption) =>
                      setSelectedTitle(selectedOption?.value || null)
                    }
                  />
                  <DropDown
                    clearable={true}
                    label={t('Status')}
                    labelField="label"
                    valueField="value"
                    placeholder={t('Status')}
                    className={'small mx-2'}
                    config={{
                      mode: 'singleSelect',
                      data: [
                        {
                          label: '',
                          value: '',
                        },
                        {
                          label: t('Errors'),
                          value: 'Errors',
                        },
                      ],
                      remote: false,
                      itemTemplate:
                        "<div class='left-item '><div>{label}</div></div>",
                    }}
                    value={{
                      label: showOnlyErrors ? 'Errors' : '',
                      value: showOnlyErrors ? 'Errors' : '',
                    }}
                    onChange={(selectedOption) =>
                      setShowOnlyErrors(selectedOption?.value === 'Errors')
                    }
                  />
                  <DropDown
                    clearable={true}
                    label={t('Duration')}
                    labelField="label"
                    valueField="value"
                    placeholder={t('Duration')}
                    className={'small'}
                    config={{
                      mode: 'singleSelect',
                      data: [
                        {
                          label: '',
                          value: '',
                        },
                        ...durationOptions,
                      ],
                      remote: false,
                      itemTemplate:
                        "<div class='left-item '><div>{label}</div></div>",
                    }}
                    value={selectedDurationOption}
                    onChange={(selectedOption) =>
                      setSelectedDuration(selectedOption?.value)
                    }
                  />
                </div>
                <div
                  id={'viewScroll'}
                  className={`mb-[76px] overflow-x-auto h-[65vh] lg:h-[60vh] xl:h-[65vh] 2xl:h-[68vh]`}
                >
                  <div className="pb-2" ref={logContainerRef}>
                    {logs?.length ? (
                      logs.map((log, key) => {
                        return (
                          <SingleLogItem
                            key={key}
                            keys={key}
                            log={log}
                            handleClick={onLogSelect}
                          />
                        )
                      })
                    ) : (
                      <>{getEmptyDiv()}</>
                    )}
                  </div>
                </div>
                <div
                  ref={bottomBarRef}
                  className="proceed bg-white w-full fixed bottom-0 mt-2 ml-[-20px]"
                >
                  <div className="flex items-center pt-5 pb-5 ml-2">
                    <div className="flex item-center">
                      <ProceedButton
                        type="primaryButton"
                        label={t('Export all')}
                        handleClick={exportData}
                      />
                      <ProceedButton
                        type="secondaryButton"
                        label={t('Clear logs')}
                        handleClick={handleDelete}
                      />
                    </div>
                  </div>
                </div>
                {showSelectedLog && (
                  <div className="fixed right-0 top-0 h-[100vh] w-[40rem] bg-white rounded overflow-y-auto shadow-lg side-drawer">
                    <div className="flex flex-col h-full">
                      <div className="h-[60vh] lg:h-[60vh] xl:h-[70vh] 2xl:h-[70vh] pl-9 pr-11 pt-5">
                        <div className="flex items-center pb-6 cursor-pointer">
                          <div className="w-[32px] h-[36px] ml-[-8px]">
                            <img
                              src={back}
                              alt="back"
                              className="w-full h-full"
                              onClick={() => {
                                setShowSelectedLog(false)
                                setSelectedLog(null)
                              }}
                            />
                          </div>
                          <h3 className="text-2xl font-bold font-Inter text-green ml-3 ">
                            {t("Log")}
                          </h3>
                        </div>
                        <div className={`overflow-x-auto bg-[#c1bdbd1c]`}>
                          <pre className={`max-h-[75vh] p-3`}>
                            {JSON.stringify(selectedLog, null, 2)}
                          </pre>
                        </div>
                        <div className="proceed w-full fixed bottom-0 mt-auto z-[10] bg-white">
                          <div className="flex items-center pt-5 pb-5">
                            <ProceedButton
                              type="primaryButton"
                              label={t('Export')}
                              handleClick={exportData}
                            />
                            <ProceedButton
                              type="secondaryButton"
                              label={t('Cancel')}
                              handleClick={() => {
                                setShowSelectedLog(false)
                                setSelectedLog(null)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Usersetting
