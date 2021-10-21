import { useState } from "react";
import Searchbar from "./Components/Searchbar";
import ImageGallery from "./Components/ImageGallery";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  // const [loading, setLoading] = useState(false);

  const handleFormSubmit = (newInput) => {
    setInputValue(newInput);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery inputValueProps={inputValue} />
    </div>
  );
}

// export default class App extends Component {
//   state = {
//     loading: false,
//     inputValue: "",
//   };

//   handleFormSubmit = (inputValue) => {
//     this.setState({ inputValue });
//   };

//   render() {
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery inputValue={this.state.inputValue} />
//       </div>
//     );
//   }
// }
