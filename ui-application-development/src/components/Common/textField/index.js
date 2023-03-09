import React, { useEffect } from 'react'
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';
import { showToast } from "@frontrolinc/pace-ui-framework";
function Input({ type, disable, fieldName, register, errors, placeHolder, isRequired, handleClick, value,maxLength }) {
    const { t } = useTranslation(['label' , 'message']);
    switch (type) {
        case "disable":
            return (
                <input
                    type="text"
                    className='bg-[#E3EDEB] text-sm border-2 border-[#9BBEAF] text-[#646363] rounded-[6px] h-[36px] py-[12px] px-[10px] font-Inter'
                    {...register(fieldName, {
                        required: {
                            value: isRequired
                        }
                    })}
                    disabled={disable}
                    autoComplete="off"
                />
            )
        case "normal":
            useEffect(() => {
                if (errors?.[fieldName]) {
                    if (errors?.[fieldName].type === "maxLength") {
                        showToast(
                            'error',
                            `Enter ${fieldName?.split("_").join(" ")} less than 255`,
                            'drawer',
                        )
                    } else if (errors?.[fieldName].type === "required") {
                        showToast(
                            'error',
                            `${t('highlighted field', { ns : 'message'})}`,
                            'drawer',
                        )
                    } else {
                        return;
                    }
                }
            }, [errors?.[fieldName]])
            return (
                <>
                    <input
                        type="text"
                        className={`${errors?.[fieldName] ? "border-2 border-rose-600 focus:outline-rose-600 focus:ring-rose-600 focus:bg-white focus:border-ring-rose-600" : "border-2 border-[#CFDFD7] focus:outline-[#008768]  focus:ring-[#008768] focus:bg-white focus:border-[#008768]"} 
                    h-[36px] text-sm rounded-[6px] py-[12px] px-[10px] font-Inter w-full`}
                        {...register(fieldName, {
                            required: {
                                value: isRequired
                            }
                        })}
                        placeholder={placeHolder}
                        autoComplete="off"
                        onChange={handleClick}
                        maxLength={maxLength}
                    />
                </>
            )
        case "textarea":
            return (
                <textarea
                    placeholder={placeHolder}
                    {...register(fieldName, {
                        required: {
                            value: isRequired
                        }
                    })}
                    autoComplete="off"
                    className={`${errors?.[fieldName] ? "border-2 border-rose-600" : ""
                        } text-sm rounded-[6px] py-[12px] w-full px-[10px] border-2 border-[#CFDFD7]  focus:outline-[#008768]  focus:ring-[#008768] focus:bg-white focus:border-[#008768] font-Inter`}
                    rows={3}
                    onChange={handleClick}
                    maxLength={maxLength}
                />
            )
        case "disableTextarea":
            return (
                <textarea
                    placeholder={placeHolder}
                    {...register(fieldName, {
                        required: {
                            value: isRequired
                        }
                    })}
                    disabled={disable}
                    autoComplete="off"
                    className="bg-[#E3EDEB] border-2 border-[#9BBEAF] text-[#646363] h-[48px] text-sm rounded-[6px] py-[12px] px-[10px] font-Inter"
                // rows={1}
                />
            )
        default:
            break;
    }
}

Input.propTypes = {
    handleClick: PropTypes.func,
    type: PropTypes.string,
    isRequired: PropTypes.bool,
    placeHolder: PropTypes.string,
    fieldName: PropTypes.string,
};

Input.defaultProps = {
    handleClick: function (e) {
        return e;
    },
};

export default Input