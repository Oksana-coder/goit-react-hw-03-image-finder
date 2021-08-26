import { Component } from 'react';
import './Searchbar.scss';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    searchTerm: '',
  };

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchTerm.trim() === '') {
      toast.error('Enter your search query!');
      return;
    }

    this.props.onSubmit(this.state.searchTerm);
    this.setState({ searchTerm: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.handleSearchTermChange}
          />
        </form>
      </header>
    );
  }
}