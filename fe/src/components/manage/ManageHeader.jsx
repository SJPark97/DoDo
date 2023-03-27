import React from "react";
import styled from "styled-components";

const Div = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 128px;
  border-bottom: 1px solid #757575;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  background: #ffffff;
  margin-bottom: 24px;
`;

const Header = styled.div`
  height: 64px;
  width: 100%;
  margin-top: 16px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const Img = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  margin-right: 16px;
`;

const Title = styled.div`
  font-size: 24px;
`;

const Filter = styled.div`
  display: flex;
  margin-top: 24px;
`;

const FilterDiv = styled.div`
  height: 24px;
  font-size: 16px;
  font-weight: ${props => props.select && "bold"};
  color: ${props => (props.select ? "#424242" : "#757575")};
  border-bottom: ${props => (props.select ? "3px solid #424242" : "none")};
  margin: 0 48px;
  cursor: pointer;
  &: hover {
    font-weight: bold;
    color: #424242;
    border-bottom: 3px solid #424242;
  }
`;

export default function ManageHeader(props) {
  const { bucketListImg, bucketListTitle, pageFilter } = props;
  const changePageFilter = fil => {
    props.propFunction(fil);
  };
  return (
    <Div>
      <Header>
        {/* <Img src={bucketListImg} /> */}
        <Img src={"https://images.pexels.com/photos/177809/pexels-photo-177809.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} />
        {/* <Title>{bucketListTitle}</Title> */}
        <Title>죽기전에 해야 할 100가지 버킷리스트</Title>
      </Header>
      <Filter>
        <FilterDiv select={pageFilter === "bucketList"} onClick={() => changePageFilter("bucketList")}>
          버킷리스트
        </FilterDiv>
        <FilterDiv select={pageFilter === "diary"} onClick={() => changePageFilter("diary")}>
          경험일기
        </FilterDiv>
        <FilterDiv select={pageFilter === "setting"} onClick={() => changePageFilter("setting")}>
          설정
        </FilterDiv>
      </Filter>
    </Div>
  );
}
