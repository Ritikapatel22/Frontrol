import { useContext, createContext, useState } from 'react'

const FilterContext = createContext(null)

export const FilterProvider = ({ children }) => {
  const [filteredData, setFilteredData] = useState()
  const [gridRef, setGridRef] = useState()
  const [filterText, setFilterText] = useState()
  return (
    <FilterContext.Provider
      value={{
        filteredData,
        setFilteredData,
        gridRef,
        setGridRef,
        filterText,
        setFilterText,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => {
  return useContext(FilterContext)
}
