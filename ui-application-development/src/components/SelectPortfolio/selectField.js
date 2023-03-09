import React, { useEffect, useState } from 'react'
import SelectUnit from '.'
import { useFetchDataQuery } from '../../app/appApi'
import Delete from "../../assets/Images/deleterad.svg"
import { DropDown } from '@frontrolinc/pace-ui-framework'
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const SelectField = ({
    portfolioCriterias,
    index,
    dataValue,
    inputList,
    setInputList,
    disable,
    projectStatusQuery,
    Error,
    setError
}) => {
    const { t } = useTranslation(['label']);

    const [equalData, setEqualData] = useState({
        contains: '',
        does_not_contains: '',
        in_list: '',
        not_in_list: '',
        equal: '',
        not_equal: '',
        start_with: '',
        end_with: '',
        less_than: '',
        less_or_equal: '',
        greater_than: '',
        greater_or_equal: '',
        between: ''
    })

    const saperateData = {
        value_1: dataValue?.value_1,
        value_2: dataValue?.value_2,
        value_3: dataValue?.value_3,
        value_4: dataValue?.value_4,
        value_5: dataValue?.value_5,
        value_6: dataValue?.value_6,
        value_7: dataValue?.value_7,
        value_8: dataValue?.value_8,
        value_9: dataValue?.value_9,
        value_10: dataValue?.value_10,
        value_11: dataValue?.value_11,
        value_12: dataValue?.value_12,
        value_13: dataValue?.value_13,
        value_14: dataValue?.value_14,
        value_15: dataValue?.value_15,
        value_16: dataValue?.value_16,
        value_17: dataValue?.value_17,
        value_18: dataValue?.value_18,
        value_19: dataValue?.value_19,
        value_20: dataValue?.value_20
    }

    const [unit, setUnit] = useState();
    const [show, setShow] = useState(false);
    const [filterValueType, setFilterValueType] = useState([]);
    const [filterCriteria_value, setCriteria_value] = useState([]);
    const [defalultValue, setDefaultValue] = useState(dataValue?.value_1)
    const [xValue2, setxValue2] = useState(dataValue?.value_2)
    const [saperateValue, setSaperateValue] = useState(Object.keys(saperateData).map((val) => { return saperateData[val] }).filter((val) => { return val !== null && val !== undefined }))
    const CriteriaValue = portfolioCriterias?.Data["Portfolio.GetPortfolioCriterias"]

    useEffect(() => {
        const value = Number(dataValue?.criteria_id);
        const option = CriteriaValue?.find((o) => o.criteria_id === value);
        setDefaultCriteriaSelected({
            label: option?.criteria_value ? t(option?.criteria_value) : "",
            value: option?.criteria_value ? option?.criteria_value : ""
        })
        setFilterValueType(option?.value_type)
        setCriteria_value(option?.criteria_value)
        setUnit(option?.criteria_value);
        setEqualData({
            contains: option?.contains,
            does_not_contains: option?.does_not_contains,
            in_list: option?.in_list,
            not_in_list: option?.not_in_list,
            equal: option?.equal,
            not_equal: option?.not_equal,
            start_with: option?.start_with,
            end_with: option?.end_with,
            less_than: option?.less_than,
            less_or_equal: option?.less_or_equal,
            greater_than: option?.greater_than,
            greater_or_equal: option?.greater_or_equal,
            between: option?.between,
        })
    }, [inputList, portfolioCriterias])

    const DataKey = [];

    for (const [key, value] of Object.entries(equalData)) {
        if (value == "Y") {
            DataKey.push(key)
        }
    };

    const handelMapping = (e, i, nameKey) => {
        setError("")
        setShow(true)
        if (typeof (e) === "object" || null) {
            if(e === null){
                setSaperateValue([])
            }else{
                var res = Object.keys(e).reduce((prev, curr) => { return { ...prev, ['value']: e[curr] } }, {});
                const removeValue = saperateValue.find((val) => {
                    return val === res.value
                })
                setSaperateValue([...saperateValue, res.value].filter((val) => {
                    return val !== removeValue
                }))
            }
        } else {
            if(e === undefined){
                const list = [...inputList]
                if (nameKey === "operator") {
                    setxValue2("")
                    setDefaultValue("")
                    setSaperateValue([])
                    list[i]["operator"] = null
                } else {
                    list[i]["criteria_id"] = null
                    list[i]["operator"] = null
                }
                setInputList(list)
            } else {
                const list = [...inputList]
                list[i][nameKey] = e
                setInputList(list)
            }
        }
    }

    // Handle multiple select option
    useEffect(() => {
        const Arr = [];
        Arr.push(...saperateValue)

        const value = Arr.map((val) => {
            return val
        })

        const saperateData = [{
            CRUD: "C",
            criteria_id: dataValue.criteria_id,
            operator: dataValue.operator,
            id: dataValue.id,
            value_1: value[0],
            value_2: value[1],
            value_3: value[2],
            value_4: value[3],
            value_5: value[4],
            value_6: value[5],
            value_7: value[6],
            value_8: value[7],
            value_9: value[8],
            value_10: value[9],
            value_11: value[10],
            value_12: value[11],
            value_13: value[12],
            value_14: value[13],
            value_15: value[14],
            value_16: value[15],
            value_17: value[16],
            value_18: value[17],
            value_19: value[18],
            value_20: value[19]
        }]
        saperateData.forEach(element => {
            const itemIndex = inputList.findIndex(o => o.id === element.id);
            if (itemIndex > -1) {
                inputList[itemIndex] = element;
            } else {
                inputList = inputList.push(element);
            }
        });
    }, [saperateValue])

    const handleRemoveClick = (dataValue) => {
        const data = inputList.filter((val) => {
            return (
                val.id !== dataValue.id
            )
        })
        setInputList(data);
    };

    const handleFirstChange = (e) => {
        const value = e?.value;
        const option = CriteriaValue.find((o) => o.criteria_id === value);
        const data = option;
        setxValue2("")
        setDefaultValue("")
        setSaperateValue([])
        setDefaultOperatorSelected({
            label: "",
            value: ""
        })
        setError("")
        handelMapping(data?.criteria_id, index, "criteria_id")
        setFilterValueType([])
        if (e === null) {
            setShow(false)
        }else{
            handelMapping(undefined, index, "operator")
            setShow(true)
        }
        setUnit(option?.criteria_value);
        setEqualData({
            contains: data?.contains,
            does_not_contains: data?.does_not_contains,
            in_list: data?.in_list,
            not_in_list: data?.not_in_list,
            equal: data?.equal,
            not_equal: data?.not_equal,
            start_with: data?.start_with,
            end_with: data?.end_with,
            less_than: data?.less_than,
            less_or_equal: data?.less_or_equal,
            greater_than: data?.greater_than,
            greater_or_equal: data?.greater_or_equal,
            between: data?.between,
        })
    }
    
    const criteriaIdConfig = {
        mode: 'singleSelect',
        remote: false,
        data: CriteriaValue ? CriteriaValue
            ?.map((data) => {
                return {
                    label:data.criteria_value,
                    value: data.criteria_id,
                    index: index,
                    name: 'criteria_id'
                }
            }) : [],
        itemTemplate: "<div class='left-item '><div>{label}</div></div>",
    }

    const obj = JSON.parse(JSON.stringify(criteriaIdConfig))

    for(let i in criteriaIdConfig.data){
        obj.data[i].label = t(criteriaIdConfig.data[i].label)
    }

    const operatorConfig = {
        mode: 'singleSelect',
        remote: false,
        data: DataKey ? DataKey
        ?.map((data) => {
            return {
                label: t(data),
                value: data,
                name: 'operator'
            }
        }) : [],
        itemTemplate: "<div class='left-item'><div>{label}</div></div>",
    }

    const [defaultCriteriaSelected, setDefaultCriteriaSelected] = useState({
        label: filterCriteria_value ? filterCriteria_value : [],
        value: filterCriteria_value ? filterCriteria_value : []
    })

    const [defaultOperatorSelected, setDefaultOperatorSelected] = useState({
        label: dataValue.operator ? (dataValue.operator === "between" ? "in_range" : dataValue.operator === "does_not_contains" ? "not_contains" :
            dataValue.operator === "equal" ? "equals" : dataValue.operator === "start_with" ? "starts_with" : dataValue.operator === "end_with" ? "ends_with" :
                dataValue.operator === "greater_or_equal" ? "greater_than_or_equals" : dataValue.operator === "less_or_equal" ? "less_than_or_equals" :
                    dataValue.operator)?.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() }).split("_").join(" ") : [],
        value: dataValue.operator ? dataValue.operator : [],
    })

    const errordata = {
        value: defaultCriteriaSelected.label,
        operator: dataValue.operator,
    }

    return (
        <div className='edit'>
            <div className='w-full'>
                <div className={`pl-1 pt-2 pb-2 style-select text-xs relative flex gap-[20px] w-full pr-[25px] filter`}>
                    <DropDown
                        config={obj}
                        labelField="label"
                        valueField="value"
                        placeholder={t("Select criteria")}
                        value={defaultCriteriaSelected}
                        onChange={handleFirstChange}
                        disable={disable ? true : false}
                        className={"criteria-dropdown"}
                    />
                    <div className={`filter ${errordata.operator ? "" : Error}`}>
                        <DropDown
                            config={operatorConfig}
                            labelField="label"
                            valueField="value"
                            placeholder={t("Select operator")}
                            value={defaultOperatorSelected}
                            onChange={(e) => {
                                handelMapping(e ? e.value : undefined, index, "operator")
                                setxValue2("")
                                setDefaultValue("")
                                setSaperateValue([])
                            }}
                            disable={!show ? (disable ? true : defalultValue ? false : true) : false}
                            className={"operator-dropdown"}
                        />
                    </div>
                    <SelectUnit
                        index={index}
                        dataValue={dataValue}
                        unit={unit}
                        valueType={filterValueType}
                        handelMapping={handelMapping}
                        defalultValue={defalultValue}
                        setDefaultValue={setDefaultValue}
                        xValue2={xValue2}
                        setxValue2={setxValue2}
                        show={show}
                        disable={disable}
                        saperateValue={saperateValue}
                        projectStatusQuery={projectStatusQuery}
                        portfolioCriterias={portfolioCriterias}
                        Error={Error}
                    />
                    <div className={`absolute right-[6px] top-[15px]`}>
                        <img src={Delete} className={`${disable ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={disable ? () => { } : () => { handleRemoveClick(dataValue, index) }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(SelectField);