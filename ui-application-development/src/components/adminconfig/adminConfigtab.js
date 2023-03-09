import React from 'react'
import Configurations from './configurations'
import SubmitProcess from './submitProcess'
import { useTranslation } from 'react-i18next'
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from '@frontrolinc/pace-ui-framework'

function AdminConfigTab() {
  const { t } = useTranslation(['label'])
  return (
    <div className="my-[10px] mx-[30px]">
      <Tabs defaultSelected="1" className="tab-context">
        <TabList>
          <Tab id="1">{t('Configurations')}</Tab>
          <Tab id="2">{t('Submit process')}</Tab>
        </TabList>

        <TabPanel id="1" panel="first">
          <Configurations />
        </TabPanel>
        <TabPanel id="2" panel="second">
          <SubmitProcess />
        </TabPanel>
      </Tabs>
    </div>
  )
}
export default AdminConfigTab
