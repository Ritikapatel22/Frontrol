import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Refresh from '../../../assets/Images/refresh.svg'
import { userSettingsFactory } from '@frontrolinc/pace-ui-framework'

function Reload({ refreshDate, reloadData }) {
  const { t } = useTranslation(['label'])

  const dateFormat = userSettingsFactory.dateFormat

  var getDateString = function (date, format) {
    var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      getPaddedComp = function (comp) {
        return parseInt(comp) < 10 ? '0' + comp : comp
      },
      formattedDate = format,
      o = {
        'y+': date.getFullYear(), // year
        'm+':
          format.replace(/[^m]/g, '').length > 2
            ? months[date.getMonth()]
            : getPaddedComp(date.getMonth() + 1), //month
        'd+': getPaddedComp(date.getDate()), //day
        'h+': getPaddedComp(
          date.getHours() > 12 ? date.getHours() % 12 : date.getHours(),
        ), //hour
        'H+': getPaddedComp(date.getHours()), //hour
        'M+': getPaddedComp(date.getMinutes()), //minute
        's+': getPaddedComp(date.getSeconds()), //second
        'S+': getPaddedComp(date.getMilliseconds()), //millisecond,
        'b+': date.getHours() >= 12 ? 'PM' : 'AM',
      }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        formattedDate = formattedDate.replace(RegExp.$1, o[k])
      }
    }
    return formattedDate
  }

  const formattedDate = getDateString(new Date(refreshDate), dateFormat)
  const time = new Date(refreshDate).toLocaleString().split(',')

  return (
    <div className="flex items-center lg:mb-0 mb-1">
      {refreshDate && (
        <p className="text-[#646363]  text-[12px] font-normal mr-[13px] mb-0">
          <>{t('Last refresh')}</>: {formattedDate + time[time.length - 1]}
        </p>
      )}
    </div>
  )
}

Reload.propTypes = {
  refreshDate: PropTypes.string,
  reloadData: PropTypes.func,
}

export default memo(Reload)
