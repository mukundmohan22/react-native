import { useEffect, useState } from "react"
import yelp from "../api/yelp"

export default () => {
  const [results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const serachApi = async (searchTerm) => {
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: 'san jose'
        }
      });

      setResults(response.data.businesses);
      setErrorMsg('');
    } catch (err) {
      setErrorMsg('Something went wrong');
    }
  }
  useEffect(() => {
    serachApi('pasta');
  }, []);
  return [serachApi, results, errorMsg]
}