import { useState } from "react";

import DeleteAppointment from "components/ModalDelAppointment";
import EditAppointment from "components/ModalEditAppointment";

import { IAppointment } from "utils/interfaces/appointmentInterfaces";

import pencil from "assets/icons/Pencil.svg";
import trash from "assets/icons/Trash.svg";

import style from "./TabletItem.module.scss";

interface ITabletItemProps {
  item: IAppointment;
  doctors: Array<string>;
}

const TabletItem = ({ item, doctors }: ITabletItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={style.tablet_row}>
      <div className={`${style.tablet_row_item} ${style.name}`}>
        {item.name}
      </div>
      <div className={`${style.tablet_row_item} ${style.doctor}`}>
        {item.doctor}
      </div>
      <div className={`${style.tablet_row_item} ${style.date}`}>
        {item.date}
      </div>
      <div className={`${style.tablet_row_item} ${style.complaint}`}>
        {item.complaint}
      </div>
      <div className={style.tablet_row_item_button_wrapper}>
        <button
          className={style.tablet_row_item_button}
          onClick={() => setIsDeleting(true)}
        >
          <img src={trash} alt="trash" />
        </button>
        <button
          className={style.tablet_row_item_button}
          onClick={() => setIsEditing(true)}
        >
          <img src={pencil} alt="pencil" />
        </button>
      </div>
      {isDeleting && (
        <DeleteAppointment id={item._id} setIsDeleting={setIsDeleting} />
      )}
      {isEditing && (
        <EditAppointment
          item={item}
          doctors={doctors}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default TabletItem;
