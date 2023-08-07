export const FetchImages = async (findWord, count) => {
  const API_KEY = '37633727-a43a3450b24a92792b7acd2e2';
  const url = `https://pixabay.com/api/?q=${findWord}&page=${count}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  // console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
export default FetchImages;
