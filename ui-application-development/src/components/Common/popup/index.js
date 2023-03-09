import React from "react";
import Button from "../button";
import { useTranslation } from 'react-i18next';

const PopUp = () => {
  const { t } = useTranslation(['label']);

  return (
    <div>
      <div>
        <div
          className="export bg-white absolute bottom-[122px] right-[40px] w-[160px] z-20 cursor-pointer"
          onClick={() => {
            setPopUp(false);
          }}
        >
          <div className="relative z-10 before:absolute before:content-[''] before:top-[8px] before:rotate-45 before:-right-[5px] before:bg-white before:h-[40px] before:w-[40px] before:-z-10">
            <div className="py-3 pl-[10px]">
              <Button
                // icon={delfault}
                iconLabel="default"
                label={t("Set as default")}
                //   handleClick={() =>
                //     dispatch(
                //       handleViewOperation({
                //         data,
                //         op: "default",
                //       })
                //     )
                //   }
              />
            </div>

            <hr className="bg-darkgrey"></hr>
            <div className="py-3 pl-[10px]">
              <div
                className="relative"
                //   onClick={() => handleEditView(data)}
              >
                <Button
                  // icon={global}
                  iconLabel="edit"
                  label={t("Edit view")}
                  // handleClick={() => handleEditView(data)}
                />
                <div
                  className="absolute top-1 left-[6px]"
                  // onClick={() => handleEditView(data)}
                >
                  {/* <img src={pen} alt="pencil" /> */}
                </div>
              </div>
            </div>
            <hr className="bg-darkgrey"></hr>
            <div className="flex py-3 pl-[10px]">
              <Button
                // icon={del}
                iconLabel="delete"
                label={t("Delete")}
                //   handleClick={() =>
                //     dispatch(
                //       handleViewOperation({
                //         data,
                //         op: "delete",
                //       })
                //     )
                //   }
              />
            </div>
            <hr className="bg-darkgrey"></hr>
            <div className="py-3 pl-[10px]">
              <Button
                // icon={file}
                iconLabel="Duplicate"
                label={t("Duplicate")}
                //   handleClick={() =>
                //     dispatch(
                //       handleViewOperation({
                //         data,
                //         op: "duplicate",
                //       })
                //     )
                //   }
              />
            </div>
            <hr className="bg-darkgrey"></hr>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
