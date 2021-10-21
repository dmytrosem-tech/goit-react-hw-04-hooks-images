import { useState } from "react";
import PropTypes from "prop-types";
import { ImSearch } from "react-icons/im";
// import { fetchPictures } from "../../Servise/picturesApi";

export default function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");
  // const [page, setPage] = useState(1);
  // const [pictures, setPictures] = useState([]);
  // const [largeURL, setLargeURL] = useState("");
  // const [showModal, setShowModal] = useState(false);
  // const [error, setError] = useState(null);
  // const [status, setStatus] = useState("idle");
  // const firstRender = useRef(true);

  const handleValueChange = (e) => {
    setInputValue(e.currentTarget.value.toLowerCase());
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   fetchPictures(inputValue, page)
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
  // };
  // const getPictures = (arr) => {
  //   console.log(arr);
  //   const newArr = arr.map((picture) => {
  //     return {
  //       id: picture.id,
  //       webformatURL: picture.webformatURL,
  //       largeImageURL: picture.largeImageURL,
  //     };
  //   });
  //   setPictures([...pictures, ...newArr]);
  //   // this.setState({
  //   //   pictures: [...this.state.pictures, ...newArr],
  //   // });
  // };

  // useEffect(() => {
  //   console.log("use");
  //   if (inputValue === "") {
  //     console.log("lol");
  //     return;
  //   }
  //   // handleSubmit(e);
  //   console.log("why");
  // }, [inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      alert("Not so fast");
      return;
    }
    onSubmit(inputValue);
    setInputValue("");
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <ImSearch style={{ marginRight: 8 }} />
        </button>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleValueChange}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

//   if (status === "idle") {
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={handleSubmit}>
//           <button type="submit" className="SearchForm-button">
//             <ImSearch style={{ marginRight: 8 }} />
//           </button>
//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={inputValue}
//             onChange={handleValueChange}
//           />
//         </form>
//       </header>
//     );
//   }
//   if (status === "pending") {
//     return <p>lol</p>;
//   }
//   if (status === "rejected") {
//     return (
//       <h1 className="title">
//         By searching <span className="rejected-span">{inputValue}</span> you
//         will not find pictures on this resource, sorry :()
//       </h1>
//     );
//   }
//   if (status === "resolved") {

//   }
// export default class SearchBar extends Component {
//   state = {
//     inputValue: "",
//   };

//   handleValueChange = (e) => {
//     this.setState({ inputValue: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     if (this.state.inputValue.trim() === "") {
//       alert("Not so fast");
//       return;
//     }
//     this.props.onSubmit(this.state.inputValue);
//     this.setState({ inputValue: "" });
//   };

//   render() {
//     const { handleSubmit, handleValueChange } = this;
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={handleSubmit}>
//           <button type="submit" className="SearchForm-button">
//             <ImSearch style={{ marginRight: 8 }} />
//           </button>

//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.inputValue}
//             onChange={handleValueChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// SearchBar.propTypes = {
//   onSubmit: PropTypes.func,
// };
