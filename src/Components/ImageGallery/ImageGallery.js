import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchPictures } from "../../Servise/picturesApi";
import Button from "../Button/Button";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  REJECTED: "rejected",
  RESOLVED: "resolved",
};

export default function ImageGallery({ inputValueProps }) {
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [largeURL, setLargeURL] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);
  console.log(largeURL);

  useEffect(() => {
    if (!inputValueProps) {
      return;
    }
    setStatus(Status.PENDING);
    setPage(1);
    fetchPictures(inputValueProps, page)
      .then((picturesResponseArr) => {
        if (picturesResponseArr.length === 0) {
          return setStatus(Status.REJECTED);
        }
        setPictures(picturesResponseArr);
      })
      .then(setStatus(Status.RESOLVED))
      .catch((e) => setStatus(Status.REJECTED));
  }, [inputValueProps]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setStatus(Status.PENDING);
    fetchPictures(inputValueProps, page)
      .then((picturesResponseArr) => {
        if (picturesResponseArr.length === 0) {
          return setStatus(Status.REJECTED);
        }
        setPictures([...pictures, ...picturesResponseArr]);
      })
      .then(setStatus(Status.RESOLVED))
      .then(() =>
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        })
      )
      .catch((e) => setStatus(Status.REJECTED));
  }, [page]);

  const onLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const takeModalPicture = (url) => {
    setLargeURL(url);
    setShowModal(true);
  };

  if (status === Status.IDLE) {
    return <h1 className="title">ps... Looking for some pictures? Bro.</h1>;
  }
  if (status === Status.PENDING) {
    return <Loader />;
  }
  if (status === Status.REJECTED) {
    return (
      <h1 className="title">
        By searching <span className="rejected-span">{inputValueProps}</span>{" "}
        you will not find pictures on this resource, sorry :()
      </h1>
    );
  }
  if (status === Status.RESOLVED) {
    console.log(pictures);
    return (
      <div>
        <ul className="ImageGallery">
          {pictures.map((picture) => (
            <ImageGalleryItem
              key={picture.id}
              webformatURL={picture.webformatURL}
              largeImageURL={picture.largeImageURL}
              onOpen={takeModalPicture}
            />
          ))}
        </ul>
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeURL} alt="modal-img" />
            <button type="button" onClick={toggleModal}>
              Close Modal
            </button>
          </Modal>
        )}
        <Button onLoadMoreClick={onLoadMoreClick} />
      </div>
    );
  }
}

ImageGallery.propTypes = {
  inputValueProps: PropTypes.string,
};
