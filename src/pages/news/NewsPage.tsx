import React, { useContext } from "react";
import FilterIcon from "src/assets/icons/filter.svg";
import AddIcon from "src/assets/icons/add.svg";
import SortIcon from "src/assets/icons/sort.svg";
import { useGetNewsQuery } from "src/services/api/newsApi";
import Modal, { ModalContext } from "src/components/modal/Modal";
import AddNews from "src/pages/news/components/addNews/AddNews";
import FilterNews from "src/pages/news/components/filterNews/FilterNews";
import NewsNode from "src/pages/news/components/newsNode/NewsNode";
import PaginateComponent from "src/components/paginateComponent/PaginateComponent";
import { useAppDispatch } from "src/app/hooks";
import { toggleSort } from "src/features/sort/appSlice";
import { IsAdmin } from "src/components/isAdmin/isAdmin";
import styles from "./News.module.less";

const SortIconComponent = () => {
  const dispatch = useAppDispatch();
  return <SortIcon onClick={() => dispatch(toggleSort())} />;
};

const AddIconComponent = () => {
  const changeVisible = useContext(ModalContext);
  return <AddIcon onClick={changeVisible} />;
};

const FilterComponent = () => {
  const changeVisible = useContext(ModalContext);
  return <FilterIcon onClick={changeVisible} />;
};

const NewsPage = (): any => (
  <div className={styles.news_root}>
    <header className={styles.header_news}>
      <div className={styles.header_title}>Новости</div>
      <div className={styles.header_icons}>
        <IsAdmin>
          <Modal modal={<AddNews />}>
            <AddIconComponent />
          </Modal>
        </IsAdmin>
        <Modal modal={<FilterNews />}>
          <FilterComponent />
        </Modal>
        <SortIconComponent />
      </div>
    </header>
    <PaginateComponent useQuery={useGetNewsQuery} CardNode={NewsNode} />
  </div>
);

export default NewsPage;
