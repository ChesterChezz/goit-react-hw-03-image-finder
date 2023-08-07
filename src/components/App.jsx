import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { FetchImages } from './PixabayApi';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

class App extends Component {
  state = {
    imageData: [],
    loading: false,
    countPage: 1,
    lastSearch: '',
    countOfHits: null,
    lastHits: 0,
  };

  loadMoreImages = () => {
    this.setState(prevState => ({
      countPage: prevState.countPage + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const { lastSearch, countPage } = this.state;

    if (
      prevState.countPage !== countPage ||
      prevState.lastSearch !== lastSearch
    ) {
      this.setState({ loading: true });

      try {
        const data = await FetchImages(lastSearch, countPage);

        this.setState(prevState => ({
          imageData: prevState.imageData.concat(data.hits),
          countOfHits: prevState.countOfHits + data.hits.length,
          lastHits: data.hits,
        }));
      } catch (error) {
        console.error('Error fetching images:', error);
        this.setState({ loading: false });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSearch = async value => {
    this.setState({
      loading: true,
      lastSearch: value,
      countPage: 1,
      imageData: [],
    });
  };

  render() {
    const { imageData, loading, lastHits } = this.state;

    return (
      <>
        <Searchbar onSearch={this.handleSearch} />
        {imageData && <ImageGallery data={imageData} />}
        {loading && <Loader />}
        {lastHits.length === 12 && !loading && (
          <Button onClick={this.loadMoreImages} />
        )}
      </>
    );
  }
}

export default App;
