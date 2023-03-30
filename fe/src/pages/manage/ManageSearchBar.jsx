import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import ManageSearchBucket from "./ManageSearchBucket";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { reBucketList } from "../../redux/user";

const SearchBox = styled.div`
  width: 80%;
  max-width: 456px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const InputBox = styled.div`
  width: 100%;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(182, 86, 86, 0.25);
`;

const SearchInput = styled.input`
  width: 85%;
  height: 24px;
  border: none;
  margin-left: 16px;
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 16px;

  .searchIcon {
    font-size: 24px;
    color: #5f5f5f;
  }
`;

const SearchResult = styled.div`
  width: 100%;
  max-height: 560px;
  border-radius: 8px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  position: absolute;
  z-index: 10;
  top: 36px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(182, 86, 86, 0.25);
`;

export default function SearchBar() {
  const [buckets, setBuckets] = useState([]);
  const [value, setValue] = useState("");
  const { user } = useSelector(state => state);
  const bucketListId = user.value.selectedBucketlist.pk;
  const dispatch = useDispatch();

  const searchBucket = event => {
    const inputValue = event.target.value;
    setValue(inputValue);
    if (inputValue.length > 0) {
      const params = { q: inputValue, bucketlist: bucketListId };
      axios
        .get("https://j8b104.p.ssafy.io/api/buckets/search", {
          params: params,
          headers: {
            Authorization: `Bearer ${user.value.token}`,
          },
        })
        .then(res => setBuckets(res.data.data.content))
        .catch(err => console.log(err));
    } else {
      setBuckets([]);
    }
  };

  const onKeyPress = event => {
    if (event.key === "Enter") {
      addBucket(event);
    }
  };

  const addBucket = event => {
    const inputValue = event.target.value;
    axios
      .post(
        `https://j8b104.p.ssafy.io/api/bucketlists/${bucketListId}/buckets`,
        { title: inputValue },
        {
          headers: {
            Authorization: `Bearer ${user.value.token}`,
          },
        },
      )
      .then(res => dispatch(reBucketList(res.data.data)))
      .catch(err => console.log(err));
    setValue("");
    setBuckets([]);
  };

  return (
    <SearchBox>
      <InputBox>
        <SearchInput onChange={searchBucket} value={value} onKeyPress={onKeyPress} />
        <SearchIcon onClick={addBucket}>
          <AiOutlinePlus className="searchIcon" />
        </SearchIcon>
      </InputBox>
      <SearchResult>{buckets.length !== 0 ? buckets.map(buck => <ManageSearchBucket bucket={buck} key={buck.publicBucketSeq} />) : null}</SearchResult>
    </SearchBox>
  );
}
