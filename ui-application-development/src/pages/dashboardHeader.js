import React, { useEffect, useState } from 'react'
import { DashboardSubHeader } from '../components/dashboard'
import { Drawer, Views } from '../components/Common'
import Portfolio from '../components/Common/portfolio'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import {
  CustomizationProvider,
  usePersonalization,
  showToast,
} from '@frontrolinc/pace-ui-framework'
import { useUpdateDataMutation } from '../app/appApi'
import {
  selectedPortFolio as selectedPortFolioChange,
  setNewCreatedPortfolio,
  changedPortfolio,
  setPortfolios,
} from '../slices/portfolioslice'

export const DashBoardHeader = React.forwardRef((props, ref) => {
  const { t } = useTranslation(['label', 'message']);
  const [open, setOpen] = useState(false)
  const [viewopen, setViewOpen] = useState(false)
  const [addNewView, setAddNewview] = useState(false)
  const [newPortfolio, setNewPortfolio] = useState(false)
  const [newview, setNewview] = useState(false)

  const portfolio = useSelector((state) => state.portfolio.data)
  const selectedPortfolio = useSelector(
    (state) => state.portfolio.selectedPortfolio,
  )
  const { deleteSingleData } = usePersonalization()
  let selectedView = useSelector((state) => state.view?.selectedView)
  const views = useSelector((state) => state?.view?.views)
  const data =
    views &&
    views.find((views) => {
      return selectedView?.view_id === views.view_id ? views : ''
    })

  const dispatch = useDispatch()

  const [current, setCurrent] = useState(false)

  useEffect(() => {
    dispatch(setPortfolios(props.data?.Data['Portfolio.GetPortfolioHeader']))
  }, [props.data])

  const addViewhandle = () => {
    setAddNewview(!addNewView)
  }
  if (ref) {
    ref.current = {
      handleAddWidget() {
        setCurrent(data)
        setViewOpen(true)
      },
    }
  }

  const syncToReduxStore = (action, data, resData) => {
    if (action === 'U') {
      const allPortfolio = JSON.parse(JSON.stringify(portfolio))
      const modifiedPortfolio = allPortfolio.map((singlePortfolio) => {
        if (singlePortfolio.portfolio_id === data.portfolio_id) {
          singlePortfolio = data
        }
        if (
          data.default_portfolio === 'Y' &&
          singlePortfolio.portfolio_id !== data.portfolio_id
        ) {
          singlePortfolio.default_portfolio = 'N'
        }
        return singlePortfolio
      })
      if (data?.portfolio_id === selectedPortfolio?.portfolio_id) {
        dispatch(selectedPortFolioChange(data))
      }
      dispatch(changedPortfolio(modifiedPortfolio))
      showToast('success', t('Portfolio saved.', { ns : 'message'}), 'drawer')
    } else if (action === 'D') {
      const allPortfolio = JSON.parse(JSON.stringify(portfolio))
      const index = allPortfolio.findIndex(
        (portfolio) => portfolio.portfolio_id === data.portfolio_id,
      )
      if (data.portfolio_id === selectedPortfolio.portfolio_id) {
        const availablePortfolio = allPortfolio.filter(
          (e) => e.default_portfolio === 'Y',
        )
        if (availablePortfolio.length) {
          dispatch(selectedPortFolioChange(availablePortfolio[0]))
        } else {
          dispatch(selectedPortFolioChange(availablePortfolio[0]))
        }
      } else {
        dispatch(selectedPortFolioChange(selectedPortfolio))
      }
      if (index >= 0) {
        allPortfolio.splice(index, 1)
      }
      showToast('success', t('Portfolio deleted.', { ns : 'message'}), 'drawer')
      deleteSingleData(data.portfolio_id, data.PortfolioDetails)
      dispatch(changedPortfolio(allPortfolio))
    } else if (action === 'C') {
      const allPortfolio = JSON.parse(JSON.stringify(portfolio))
      const newData = JSON.parse(JSON.stringify(data))
      newData.portfolio_id = resData.Key[0].portfolio_id
      allPortfolio.push(newData)
      if (newData.portfolio_name.indexOf('Copy') > 0) {
        dispatch(selectedPortFolioChange(newData))
        showToast('success', t('Portfolio duplicated.', { ns : 'message'}), 'drawer')
      } else if (newData) {
        if (!resData.WarningMessage) {
          dispatch(selectedPortFolioChange(newData))
        }
        dispatch(setNewCreatedPortfolio(newData))
        showToast('success', t('Portfolio created.', { ns : 'message'}), 'drawer')
      }
      dispatch(changedPortfolio(allPortfolio))
      if (!selectedPortfolio) {
        dispatch(selectedPortFolioChange(newData))
      }
    }
  }
  const onError = (data) => {
    let errorMsg = data.Message ? data.Message : 'Something went wrong!!!'
    if (
      data &&
      data.Message &&
      Array.isArray(data.Message) &&
      typeof data.Message !== 'string'
    ) {
      errorMsg = JSON.stringify(data.Message)
    }
    showToast('error', errorMsg, 'drawer')
  }
  const CustomizationProviderConfig = {
    query: useUpdateDataMutation,
    documentName: 'Portfolio',
    onDataChange: syncToReduxStore,
    onError: onError,
    getInvalidateTagOnSave(crud, data) {
      let tags = []
      switch (crud) {
        case 'U': {
          tags = [`portfolio_dashboard_${data.portfolio_id}`]
          break
        }
        case 'C': {
          tags = ['Portfolio.GetPortfolioHeader']
          break
        }
        case 'D': {
          tags = ['Portfolio.GetPortfolioHeader']
          break
        }
      }
      return tags
    },
  }

  return (
    <>
      <DashboardSubHeader
        handlePortfolioBtnClick={() => setOpen(!open)}
        handleViewBtnClick={() => {
          setCurrent(false)
          setViewOpen(!viewopen)
        }}
        selectedPortFolio={props.selectedPortfolio?.portfolio_name}
        selectedView={props.selectedView}
      />
      <CustomizationProvider config={CustomizationProviderConfig}>
        <Drawer isOpen={open} setIsOpen={setOpen} newPopup={newPortfolio}>
          <Portfolio
            open={open}
            setOpen={setOpen}
            selectedPortfolio={props.selectedPortfolio}
            select={props.select}
            setSelect={props.setSelect}
            data={props.data}
            isLoading={props.isLoading}
            setNewPortfolio={setNewPortfolio}
            newPortfolio={newPortfolio}
            isFetching={props.isFetching}
          />
        </Drawer>
      </CustomizationProvider>
      <Drawer isOpen={viewopen} setIsOpen={setViewOpen} newPopup={newview}>
        <Views
          viewopen={viewopen}
          setViewOpen={setViewOpen}
          addViewhandle={addViewhandle}
          addNewView={addNewView}
          setAddNewview={setAddNewview}
          widget={current}
          newview={newview}
          setNewview={setNewview}
          setCurrent={setCurrent}
          viewType="Portfolio Dashboard"
        />
      </Drawer>
    </>
  )
})
