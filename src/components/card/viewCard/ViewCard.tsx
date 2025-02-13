import React, { ReactElement, ReactNode, useContext, useEffect } from "react";
import StatusIcon from "src/assets/icons/status_processing.svg";
import StaffIcon from "src/assets/icons/staff.svg";
import EditIcon from "src/assets/icons/edit_icon.svg";
import AddIcon from "src/assets/icons/add.svg";
import ArrowLeftIcon from "src/assets/icons/arrow_left.svg";
import "./ViewCard.less";
import AddComment from "src/components/comment/addComment/AddComment";
import Modal, { ModalContext } from "src/components/modal/Modal";

const EditIconComp = () => {
  const changeVisible = useContext(ModalContext);
  return <EditIcon className="icons" onClick={changeVisible} />;
};

const AddIconComp = () => {
  const changeVisible = useContext(ModalContext);
  return <AddIcon className="icons" onClick={changeVisible} />;
};

const AddCommentComp = ({
  addComment,
}: {
  addComment: (description: string) => Promise<boolean>;
}) => {
  const changeVisible = useContext(ModalContext);
  return (
    <AddComment
      changeVisible={() => changeVisible?.()}
      addComment={addComment}
    />
  );
};

const DrawCard = ({
  title,
  viewCardTheme,
  obj,
  comments,
  addComment,
  changeStatus,
  editObj,
}: {
  title: string;
  viewCardTheme: { key: string; value: string };
  obj: { key: string; value: string | ReactNode; style: string }[];
  comments: ReactNode;
  addComment: (description: string) => Promise<boolean>;
  changeStatus: () => void;
  editObj: ReactElement;
}) => {
  const closeView = useContext(ModalContext);

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === "Escape" && closeView) {
        event.preventDefault();

        closeView();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <div className="view_card__container">
      <header className="view_card__page_header">
        <div className="view_card__header_title">{title}</div>
      </header>
      <div className="view_card__wrapper">
        <div className="view_card__header">
          <span className="view_card__header_span_title">
            {viewCardTheme.key}
          </span>
          <span className="card__header_span_title_value">
            {viewCardTheme.value}
          </span>
        </div>
        <div>
          {obj.map((ob) => (
            <div key={ob.key} className={ob.style}>
              <span>{ob.key}</span>
              <span>{ob.value}</span>
            </div>
          ))}
          <div className="view_card__comments">{comments}</div>
          <div className="view_card__icons">
            <ArrowLeftIcon className="icons" onClick={closeView} />
            {/* TODO Зона видимости в разработке на беке */}
            <ViewCardIconSelect
              icon={
                <StaffIcon
                  width={24}
                  height={24}
                  className="status_select_icon"
                />
              }
              btns={[
                {
                  value: "Зона видимости TODO",
                  func: () => console.log("Зона видимости TODO"),
                },
              ]}
            />
            <ViewCardIconSelect
              icon={<StatusIcon width={24} height={24} />}
              btns={[
                {
                  value: "Взять в работу",
                  func: changeStatus,
                },
                { value: "Отменить", func: changeStatus },
              ]}
            />
            <Modal modal={<AddCommentComp addComment={addComment} />}>
              <AddIconComp />
            </Modal>
            <Modal modal={editObj}>
              <EditIconComp />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IButton {
  value: string;
  func: () => void;
}

const ViewCardIconSelect = ({
  icon,
  btns,
}: {
  icon: ReactElement;
  btns: IButton[];
}) => (
  <div className="status_select">
    {icon}
    <ul className="status_select_visible">
      {btns.map((btn) => (
        <li key={btn.value}>
          <button type="button" onClick={btn.func}>
            {btn.value}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default DrawCard;
