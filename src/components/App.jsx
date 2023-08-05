import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { FetchImages } from './PixabayApi';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

class App extends Component {
  state = {
    imageData: null,
    loading: false,
    countPage: 1,
    lastSearch: '',
    countOfHits: null,
    lastHits: 0,
  };

  loadMoreImages = async () => {
    this.setState({ loading: true });

    try {
      const { lastSearch, countPage } = this.state;
      const data = await FetchImages(lastSearch, countPage);

      this.setState(
        prevState => ({
          countPage: prevState.countPage + 1,
          imageData: prevState.imageData.concat(data.hits),
          loading: false,
          countOfHits: prevState.countOfHits + data.hits.length,
          lastHits: data.hits,
        }),
        () => {}
      );
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ loading: false });
    }
  };

  handleSearch = async value => {
    const { lastSearch } = this.state;
    if (lastSearch !== value) {
      this.setState({ loading: true, lastSearch: value, countPage: 1 });
    } else {
      this.setState({ loading: true });
    }

    try {
      const data = await FetchImages(value, this.state.countPage);
      this.setState(prevState => ({
        countPage: prevState.countPage + 1,
        imageData: data.hits,
        loading: false,
        countOfHits: data.hits.length,
        lastHits: data.hits,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { imageData, loading, lastHits } = this.state;

    return (
      <>
        <button
          type="button"
          onClick={() => {
            alert('Misha loh');
          }}
        >
          Test
        </button>
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
