import { getTableHeight } from '../../helpers/utils'

const calculateTableHeight = (
  row,
  key,
  isFullScreen = false,
  supressedPivot = true,
) => {
  const rowCount = (row || []).length
  const rowHeight = rowCount * 30 + 50
  let value =
    key === 'admin' ? 150 : key === 'revenue' || key === 'cost' ? 130 : 90

  const winHeight = getTableHeight() - (!isFullScreen ? value : value - 180)
  let height =
    rowHeight && rowHeight < winHeight && supressedPivot ? rowHeight : winHeight

  if (height < 250) height = 250
  return height
}

export { calculateTableHeight }
