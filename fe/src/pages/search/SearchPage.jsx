import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SlideUp from "../../components/common/button/SlideUp";
import SearchBar from "./SearchBar";
import Banner from "./Banner";
import RecommBucket from "./RecommBucket";
import Category from "./Category";
import cate from "../../configs/categoryConfig";
import { useInView } from "react-intersection-observer";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import { useSelector } from "react-redux";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Categorys = styled.div`
  width: 708px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

export default function SearchPage() {
  const [selectCate, setSelectCate] = useState("전체");
  const [paging, setPaging] = useState({ last: false, page: 0 });
  const [buckets, setBuckets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const { user } = useSelector(state => state);
  const userToken = user.value.token;

  const changeCate = useCallback(
    async categoryName => {
      const params = { category: categoryName };
      setLoading(true);
      axios
        .get("https://j8b104.p.ssafy.io/api/recomm/buckets", {
          params: params,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(res => {
          const resData = res.data.data;
          setBuckets(resData.content);
          setPaging({ page: resData.number + 1, last: resData.last });
        })
        .catch(err => console.log(err));
      setSelectCate(categoryName);
      setLoading(false);
    },
    [userToken],
  );

  const search = buckets => {
    setLoading(true);
    setBuckets(buckets);
    setSelectCate("");
    setLoading(false);
  };

  useEffect(() => {
    changeCate(selectCate);
  }, [changeCate, selectCate]);

  const addBuckets = useCallback(async () => {
    setLoading(true);
    const params = { category: selectCate, page: paging.page };
    axios
      .get("https://j8b104.p.ssafy.io/api/recomm/buckets", {
        params: params,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(res => {
        const resData = res.data.data;
        setBuckets(pre => [...pre, ...resData.content]);
        setPaging({ page: resData.number + 1, last: resData.last });
      })
      .catch(err => console.log(err));
    setLoading(false);
  }, [selectCate, paging.page, userToken]);

  useEffect(() => {
    if (inView && !paging.last) {
      addBuckets();
    }
  }, [inView, paging.last, addBuckets]);

  return (
    <Div>
      <SearchBar search={search} />
      <Categorys>
        {cate.map(data => (
          <Category
            select={data.name === selectCate ? true : false}
            categoryName={data.name}
            categoryImg={data.image}
            key={data.name}
            propFunction={changeCate}
          />
        ))}
      </Categorys>
      <Banner />
      {Array.isArray(buckets) && buckets.map(bucket => <RecommBucket bucket={bucket} key={bucket.publicBucketSeq} />)}
      {!paging.last && !loading && <RefreshIcon ref={ref} />}
      <SlideUp />
    </Div>
  );
}