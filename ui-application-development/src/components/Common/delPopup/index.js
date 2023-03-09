import { useCustomization } from '@frontrolinc/pace-ui-framework';
import React from 'react'
import { useDispatch } from 'react-redux';
import { handleViewOperation } from '../../../slices/viewslice';
import { handlePortfolioOperation } from '../../../slices/portfolioslice';

export const DelPopup = ({ setdilPopUp, dilpopup }) => {

    const { syncToDataBase } = useCustomization();
    const dispatch = useDispatch();

    const handleDelete = () => {
        switch (dilpopup?.type) {
            case "portfolio":
                const data = dilpopup.deleteData
                dispatch(handlePortfolioOperation({ data, op: "delete", syncToDataBase }));
                setdilPopUp(false)
                setTimeout(() => {
                    dilpopup?.refetch()
                }, 1000)
                break;
            case "view":
                // const data = delRes;
                ViewToast("deleted")
                dispatch(handleViewOperation({ data, op: "delete", }));
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <div className="w-[750px] z-100 px-[7.1rem] bg-white absolute h-[250px] flex justify-center items-center top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
                <div>
                    <h2 className="text-green font-medium text-2xl text-center font-Inter mb-1">
                        {dilpopup.message}
                    </h2>
                    <p className="text-lightgrey text-center px-[30px] font-Inter">
                        {dilpopup.sub_message}
                    </p>

                    <div className="flex gap-5 justify-center items-center mt-5">
                        <button onClick={() => setdilPopUp(false)} className="px-8 rounded-[5px] py-3 bg-white border-2 border-lightgreen text-lightgreen font-bold">No</button>
                        <button
                            onClick={() => handleDelete()}
                            className="px-8 rounded-[5px] py-3 bg-lightgreen border-2 border-lightgreen text-white font-bold">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}