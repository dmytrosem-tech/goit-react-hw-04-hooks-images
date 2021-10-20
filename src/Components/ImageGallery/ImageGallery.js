import { Children, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { fetchPictures } from "../../Servise/picturesApi";
import Button from "../Button/Button";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";

const baseApi = "https://pixabay.com/api/";
const myApiKey = "22969021-19f1494240440c9eacf690dfa";

export default function ImageGallery({ inputValueProps, hm }) {
  const [page, setPage] = useState(1);
  // const [inputValue, setInputValue] = useState(inputValueProps);
  const [pictures, setPictures] = useState([]);
  const [largeURL, setLargeURL] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    console.log(hm());
  }, [page]);

  // if (inputValueProps !== "") {
  //   console.log("lol");
  //   fetchPictures(inputValueProps, baseApi, myApiKey, page)
  //     .then((picturesResponseArr) => {
  //       // console.log(pictures);
  //       if (picturesResponseArr.length === 0) {
  //         return setStatus("rejected");
  //       }
  //       getPictures(picturesResponseArr);
  //       // console.log(pictures);
  //     })
  //     .then(setStatus("resolved"))
  //     .catch((e) => setStatus("rejected"));
  // }

  // useEffect(() => {
  //   if (firstRender.current) {
  //     firstRender.current = false;
  //     return;
  //   }
  //   // console.log("norm");
  //   setStatus("pending");
  //   console.log(pictures);
  //   setPictures([]);
  //   // console.log("lol");
  //   // console.log(inputValueProps);
  //   console.log(pictures);
  //   fetchPictures(inputValueProps, baseApi, myApiKey, page)
  //     .then((picturesResponseArr) => {
  //       console.log(pictures);
  //       if (picturesResponseArr.length === 0) {
  //         return setStatus("rejected");
  //       }
  //       getPictures(picturesResponseArr);
  //       console.log(pictures);
  //     })
  //     .then(setStatus("resolved"))
  //     .catch((e) => setStatus("rejected"));
  // }, [inputValueProps]);

  // useEffect(() => {
  //   console.log(page);
  //   if (page === 1) {
  //     return;
  //   }
  //   setStatus("pending");
  //   fetchPictures(inputValueProps, baseApi, myApiKey, page)
  //     .then((pictures) => getPictures(pictures))
  //     .then(setStatus("resolved"))
  //     .then(() =>
  //       window.scrollTo({
  //         top: document.documentElement.scrollHeight,
  //         behavior: "smooth",
  //       })
  //     )
  //     .catch((e) => setStatus("rejected"));
  // }, [page]);

  const getPictures = (arr) => {
    console.log(arr);
    const newArr = arr.map((picture) => {
      return {
        id: picture.id,
        webformatURL: picture.webformatURL,
        largeImageURL: picture.largeImageURL,
      };
    });
    setPictures([...pictures, ...newArr]);
    // this.setState({
    //   pictures: [...this.state.pictures, ...newArr],
    // });
  };

  const onLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
    // this.setState({
    //   page: this.state.page + 1,
    // });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
  };

  const takeModalPicture = (url) => {
    setLargeURL(url);
    setShowModal(true);
    // this.setState({ largeUrl: url, showModal: true });
  };

  if (status === "idle") {
    return <h1 className="title">ps... Looking for some pictures? Bro.</h1>;
  }
  if (status === "pending") {
    return <Loader />;
  }
  if (status === "rejected") {
    return (
      <h1 className="title">
        By searching <span className="rejected-span">{inputValueProps}</span>{" "}
        you will not find pictures on this resource, sorry :()
      </h1>
    );
  }
  if (status === "resolved") {
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

// export default class ImageGallery extends Component {
//   state = {
//     baseApi: "https://pixabay.com/api/",
//     myApiKey: "22969021-19f1494240440c9eacf690dfa",
//     page: 1,
//     pictures: [],
//     error: null,
//     largeUrl: "",
//     showModal: false,
//     status: "idle",
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { baseApi, myApiKey, page, pictures } = this.state;
//     const prevInputValue = prevProps.inputValue;
//     const nextInputValue = this.props.inputValue;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevInputValue !== nextInputValue) {
//       this.setState({ status: "pending" });
//       this.setState({ pictures: [] });

//       fetchPictures(nextInputValue, baseApi, myApiKey, page)
//         .then((pictures) => {
//           if (pictures.length === 0) {
//             return this.setState({ status: "rejected" });
//           }
//           this.getPictures(pictures);
//         })
//         .then(this.setState({ status: "resolved" }))
//         .catch((error) => this.setState({ error, status: "rejected" }));
//     } else if (prevPage !== nextPage) {
//       this.setState({ status: "pending" });

//       fetchPictures(nextInputValue, baseApi, myApiKey, page)
//         .then((pictures) => this.getPictures(pictures))
//         .then(this.setState({ status: "resolved" }))
//         .then(() =>
//           window.scrollTo({
//             top: document.documentElement.scrollHeight,
//             behavior: "smooth",
//           })
//         )
//         .catch((error) => this.setState({ error, status: "rejected" }));
//     }
//   }

//   getPictures = (arr) => {
//     const newArr = arr.map((picture) => {
//       return {
//         id: picture.id,
//         webformatURL: picture.webformatURL,
//         largeImageURL: picture.largeImageURL,
//       };
//     });

//     this.setState({
//       pictures: [...this.state.pictures, ...newArr],
//     });
//   };

//   onLoadMoreClick = () => {
//     this.setState({
//       page: this.state.page + 1,
//     });
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   takeModalPicture = (url) => {
//     this.setState({ largeUrl: url, showModal: true });
//   };

//   render() {
//     const { pictures, status, showModal, largeUrl } = this.state;
//     const { takeModalPicture, toggleModal, onLoadMoreClick } = this;
//     const { inputValue } = this.props;

//     if (status === "idle") {
//       return <h1 className="title">ps... Looking for some pictures? Bro.</h1>;
//     }
//     if (status === "pending") {
//       return <Loader />;
//     }
//     if (status === "rejected") {
//       return (
//         <h1 className="title">
//           By searching <span className="rejected-span">{inputValue}</span> you
//           will not find pictures on this resource, sorry :()
//         </h1>
//       );
//     }
//     if (status === "resolved") {
//       return (
//         <div>
//           <ul className="ImageGallery">
//             {pictures.map((picture) => (
//               <ImageGalleryItem
//                 key={picture.id}
//                 webformatURL={picture.webformatURL}
//                 largeImageURL={picture.largeImageURL}
//                 onOpen={takeModalPicture}
//               />
//             ))}
//           </ul>
//           {showModal && (
//             <Modal onClose={toggleModal}>
//               <img src={largeUrl} alt="modal-img" />
//               <button type="button" onClick={toggleModal}>
//                 Close Modal
//               </button>
//             </Modal>
//           )}
//           <Button onLoadMoreClick={onLoadMoreClick} />
//         </div>
//       );
//     }
//   }
// }

// ImageGallery.propTypes = {
//   inputValue: PropTypes.string,
// };

//  switch (status) {
//    case "idle":
//      <h1 className="title">ps... Looking for some pictures? Bro.</h1>;
//      break;
//    case "pending":
//      <Loader />;
//      break;
//    case "rejected":
//      <h1 className="title">
//        By searching <span className="rejected-span">{inputValueProps}</span> you
//        will not find pictures on this resource, sorry :()
//      </h1>;
//      break;
//    case "resolved":
//      <div>
//        <ul className="ImageGallery">
//          {pictures.map((picture) => (
//            <ImageGalleryItem
//              key={picture.id}
//              webformatURL={picture.webformatURL}
//              largeImageURL={picture.largeImageURL}
//              onOpen={takeModalPicture}
//            />
//          ))}
//        </ul>
//        {showModal && (
//          <Modal onClose={toggleModal}>
//            <img src={largeURL} alt="modal-img" />
//            <button type="button" onClick={toggleModal}>
//              Close Modal
//            </button>
//          </Modal>
//        )}
//        <Button onLoadMoreClick={onLoadMoreClick} />
//      </div>;
//      break;
//    default:
//      console.warn(`Sorry`);
//  }
