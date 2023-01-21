export interface ISearchInput {
  handleChangeInput: (value: 0 | null) => void;
}

export interface ITable {
  dataSource: any[];
  totalPaginations: number;
  handleChangePage: (pageNumber: number) => void;
  currentPage: number;
  handleClickRow: (row: IProduct) => void;
}

export interface IAppState {
  searchTerm: 0 | null;
  products: IProduct[];
  totalPaginations: number;
  currentPage: number;
  isModalVisible: boolean;
  selectedProduct: IProduct | {};
}

export interface IProduct {
  color: string;
  id: number;
  name: string;
  pantone_value: string;
  year: number;
}

export interface IModal {
  visible: boolean;
  onClose: () => void;
  selectedProduct: IProduct | {};
}
