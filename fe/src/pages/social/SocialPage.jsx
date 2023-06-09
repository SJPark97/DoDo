import React, { useCallback, useEffect, useState } from "react";
import SocialItem from "./SocialItem";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useSelector } from "react-redux";
import axios from "axios";
import SlideUp from "../../components/common/button/SlideUp";
import NoItem from "./NoItem";
import SidebarController from "../../components/common/sidebar/SidebarController";
import { CircularProgress } from "@mui/material";
import { lightBlue } from "@mui/material/colors";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export default function SocialPage() {
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState(false);
  const { user } = useSelector(state => state);
  const [ref, inView] = useInView();

  const getItems = useCallback(async () => {
    setLoading(true);
    await axios
      .get("https://j8b104.p.ssafy.io/api/recomm/social/bucketlists", {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
        },
        params: {
          page: pages,
          size: 1,
        },
      })
      .then(res => {
        setItems(pre => [...pre, ...res.data.data.content]);
        setPages(pre => pre + 1);
        if (res.data.data.last) {
          setLast(true);
        }
      });
    setLoading(false);
  }, [user, pages, setLoading]);

  useEffect(() => {
    if (inView) {
      getItems();
    }
  }, [inView, getItems]);

  return (
    <Div>
      {items.length !== 0 ? items.map((data, index) => <SocialItem data={data} key={index} />) : last && <NoItem />}
      {last ? null : loading ? null : <RefreshIcon ref={ref} />}
      {loading && <CircularProgress sx={{ color: lightBlue[500], mt: 5 }} />}
      <SlideUp />
      <SidebarController />
    </Div>
  );
}
