import { IProduct } from "../../shared/models/interfaces";

export const TableColumns = [
  {
    title: "id",
    key: "id",
    dataIndex: "id",
    render(text: string, record: IProduct) {
      return {
        props: {
          style: { background: record.color },
        },
        children: <div>{text}</div>,
      };
    },
  },
  {
    title: "name",
    key: "name",
    dataIndex: "name",
    render(text: string, record: IProduct) {
      return {
        props: {
          style: { background: record.color },
        },
        children: <div>{text}</div>,
      };
    },
  },
  {
    title: "year",
    key: "year",
    dataIndex: "year",
    render(text: string, record: IProduct) {
      return {
        props: {
          style: { background: record.color },
        },
        children: <div>{text}</div>,
      };
    },
  },
];
