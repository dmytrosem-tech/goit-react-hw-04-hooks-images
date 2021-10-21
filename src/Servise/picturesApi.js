import axios from "axios";

const baseApi = "https://pixabay.com/api/";
const myApiKey = "22969021-19f1494240440c9eacf690dfa";

export function fetchPictures(inputValue, page) {
  return axios
    .get(
      `${baseApi}?q=${inputValue}&page=${page}&key=${myApiKey}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((r) => r.data.hits);
}
