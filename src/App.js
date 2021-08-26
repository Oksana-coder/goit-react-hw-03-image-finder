import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import imagesAPI from './services/images-api';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import Container from './components/Container';
import ErrorView from './components/ErrorView';
import './App.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    searchTerm: '',
    images: [],
    pageNumber: 1,
    showModal: false,
    largeImage: '',
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({ status: Status.PENDING });

      this.fetchImages();
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  fetchImages = () => {
    const { searchTerm, pageNumber } = this.state;

    imagesAPI
      .fetchImages(searchTerm, pageNumber)
      .then(({ hits }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          pageNumber: prevState.pageNumber + 1,
          status: Status.RESOLVED
        }))
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  }

  handleFormSubmit = searchTerm => {
    this.setState({
      searchTerm,
      images: [],
      pageNumber: 1,
      error: null,
     });
  };

  toggleModal = () => {
    this.setState(({ showModal }) =>({
      showModal: !showModal,
    }));
  };

  showLargeImage = path => {
    this.setState({ largeImage: path });
    this.toggleModal();
  }

  render() {
    const { images, showModal, largeImage, status, error } = this.state;

    if (status === 'idle') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer autoClose={3000} />
        </Container>
      )
    }

    if (status === 'pending') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </Container>
      )
    }

    if (status === 'rejected') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ErrorView message={error.message} />
          <ToastContainer autoClose={3000} />
        </Container>
      )
    }

    if (status === 'resolved') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} onShowLargeImage={this.showLargeImage} />
           {images.length > 0 && <Button fetchImages={this.fetchImages}/>}
           {showModal &&
            <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt=""/>
            </Modal>}
          <ToastContainer autoClose={3000} />
        </Container>
      )
    }
  }
}