import React, { FC } from "react";
import { useMemoizedFn } from "ahooks";
import { InputNumber, Col } from "antd";
import { ISearchInput } from "../../shared/models/interfaces";

const KEY_CODE_OF_E = 69;

const SearchInput: FC<ISearchInput> = ({ handleChangeInput }) => {
  // to avoid typing e in input
  const avoidE = useMemoizedFn((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === KEY_CODE_OF_E) e.preventDefault();
  });

  return (
    <Col style={{ padding: "10px" }} span={6}>
      <InputNumber
        style={{ width: "100%" }}
        type="number"
        onKeyDown={avoidE}
        min={0}
        size="large"
        onChange={handleChangeInput}
      />
    </Col>
  );
};

export default SearchInput;
