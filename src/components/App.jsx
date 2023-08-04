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
  };

  loadMoreImages = async () => {
    this.setState({ loading: true });
    try {
      const data = await FetchImages(
        this.state.lastSearch,
        this.state.countPage
      );
      this.setState(prevState => ({
        countPage: prevState.countPage + 1,
        imageData: this.state.imageData.concat(data.hits),
        loading: false,
        countOfHits: data.hits.length,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ loading: false });
    }
  };

  handleSearch = async value => {
    if (this.state.lastSearch !== value) {
      this.setState(
        { loading: true, lastSearch: value, countPage: 1 },
        async () => {
          try {
            const data = await FetchImages(value, this.state.countPage);
            this.setState({
              countPage: this.state.countPage + 1,
              imageData: data.hits,
              loading: false,
              countOfHits: data.hits.length,
            });
          } catch (error) {
            console.error('Error fetching images:', error);
            this.setState({ loading: false });
          }
        }
      );
    } else {
      try {
        const data = await FetchImages(value, this.state.countPage);
        this.setState({
          countPage: this.state.countPage + 1,
          imageData: data.hits,
          loading: false,
          countOfHits: data.hits.length,
        });
      } catch (error) {
        console.error('Error fetching images:', error);
        this.setState({ loading: false });
      }
    }
  };

  render() {
    const { imageData, loading, countOfHits } = this.state;

    return (
      <>
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery data={imageData} />
        {loading && <Loader />}
        {countOfHits === 12 && !loading && (
          <Button onClick={this.loadMoreImages} />
        )}
      </>
    );
  }
}

export default App;
