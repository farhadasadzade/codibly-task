import React from "react";
import { useReactive, useMemoizedFn, useMount, useUpdateEffect } from "ahooks";
import { cloneDeep } from "lodash";
import axios from "axios";
import Swal from "sweetalert2";
import { IAppState, IProduct } from "./shared/models/interfaces";

// components
import SearchInput from "./components/SearchInput";
import Table from "./components/Table";
import Modal from "./components/Modal";

const MAX_PRODUCTS_FOR_PAGE = 5;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function App() {
  const state = useReactive<IAppState>({
    searchTerm: null,
    products: [],
    totalPaginations: 0,
    currentPage: 1,
    isModalVisible: false,
    selectedProduct: {},
  });

  const getProducts = useMemoizedFn((page: number, per_page: number) => {
    axios
      .get(`https://reqres.in/api/products?page=${page}&per_page=${per_page}`)
      .then((response) => {
        state.products = cloneDeep(response?.data?.data);
        state.totalPaginations = cloneDeep(response?.data?.total);
      });
  });

  const getProductById = useMemoizedFn((id: number) => {
    axios
      .get(`https://reqres.in/api/products/${id}`)
      .then((response) => {
        state.products = [cloneDeep(response?.data?.data)];
        state.totalPaginations = 0;
      })
      .catch((err) => {
        state.products = [];
        state.totalPaginations = 0;
        if (err?.response.status === 404) {
          Toast.fire({
            icon: "error",
            title: "Product with such id didnt found",
          });
        }
      });
  });

  const handleSearchTerm = useMemoizedFn((val: 0 | null) => {
    state.searchTerm = val;
    if (val !== null) {
      return getProductById(val);
    }

    getProducts(1, MAX_PRODUCTS_FOR_PAGE);
  });

  const handleChangePage = useMemoizedFn((page: number) => {
    state.currentPage = page;
  });

  const handleCloseModal = useMemoizedFn(() => {
    state.isModalVisible = false;
    state.selectedProduct = {};
  });

  const handleClickRow = useMemoizedFn((row: IProduct) => {
    state.isModalVisible = true;
    state.selectedProduct = row;
  });

  useMount(() => {
    getProducts(1, MAX_PRODUCTS_FOR_PAGE);
  });

  useUpdateEffect(() => {
    getProducts(state.currentPage, MAX_PRODUCTS_FOR_PAGE);
  }, [state.currentPage]);

  return (
    <div className="app">
      <SearchInput handleChangeInput={handleSearchTerm} />
      <Table
        dataSource={state.products}
        totalPaginations={state.totalPaginations}
        handleChangePage={handleChangePage}
        currentPage={state.currentPage}
        handleClickRow={handleClickRow}
      />
      <Modal
        visible={state.isModalVisible}
        onClose={handleCloseModal}
        selectedProduct={state.selectedProduct}
      />
    </div>
  );
}

export default App;
