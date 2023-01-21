import React, { FC } from "react";
import { Modal as AntModal, Typography } from "antd";
import { IModal, IProduct } from "../../shared/models/interfaces";

const Modal: FC<IModal> = ({ visible, onClose, selectedProduct }) => {
  const { id, name, year, color, pantone_value } = selectedProduct as IProduct;

  return (
    <AntModal
      closable
      centered
      open={visible}
      footer={<></>}
      afterClose={onClose}
      onCancel={onClose}
    >
      <Typography>ID: {id}</Typography>
      <Typography>Name: {name}</Typography>
      <Typography>Year: {year}</Typography>
      <Typography>Color: {color}</Typography>
      <Typography>pantone_value: {pantone_value}</Typography>
    </AntModal>
  );
};

export default Modal;
