import React, { Component } from 'react';
import './App.css';
import unsplash from './config';
import {Images} from './Images';
import {SearchContainer} from './Search';
import { connect } from "react-redux";
import { changeCategories } from "./actions";
import { FavouritesContainer } from './Favourites';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      sortby: 'created_at',
    }
  }
  search = async () => {
    this.setState({loading: true})
    if( !this.props.categories.hasOwnProperty(this.props.keywordSearch)){
      let categories = {...this.props.categories};
      unsplash.search.photos(this.props.keywordSearch, 1, 20)
      .then(res => res.json())
      .then(res => {
        categories[this.props.keywordSearch] = [];
        for(const photo of res.results){
          categories[this.props.keywordSearch].push({
            id: photo.id,
            created_at: photo.created_at,
            likes: photo.likes,
            urls: photo.urls,
            user: photo.user
          });
        }
      })
      .then(async () => {      
        for(const photo in categories[this.props.keywordSearch]){
          await unsplash.photos.getPhoto(categories[this.props.keywordSearch][photo].id)
          .then(res => res.json())
          .then(res => {
            categories[this.props.keywordSearch][photo].downloads = res.downloads;
            categories[this.props.keywordSearch][photo].favourite = false;
          });
        }
      })
      .then(() => {
          this.props.changeCategories(categories);
          this.setState({ loading: false});
      })
      .catch(err => {
        console.log('There was an error', err);
      });
    }
    else 
      this.setState({loading: false});
  }
  async componentDidMount(){
    await this.search();
  }
  sortby = (e) => {
    const val = e.target.value;
    this.setState({sortby: val});
  }
  shouldComponentUpdate(nextProps, nextState) {
    if ( this.props.keywordSearch !== nextProps.keywordSearch ) {
      return false;
    }
    return true;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recruitment task - search images on Unsplash.com. via API and with powers of React</h1>
          <h3>All images comes from <a href="unsplash.com" target="_blank" >Unsplash.com</a></h3>
          <SearchContainer action={this.search} />
          <div id="sort" >Sort by
            <select onChange={this.sortby} value={this.state.sortby}>
              <option value="created_at">Created at</option>
              <option value="downloads">Downloads count</option>
              <option value="likes">Likes count</option>
            </select>
          </div>
        </header>
        <main className="main">
          <div className="main__photos">
            {this.state.loading && <p>Photos are loading</p>}
            {!this.state.loading && <Images photos={this.props.categories[this.props.keywordSearch]} sortby={this.state.sortby} />}
          </div>
          <div className="main__favourites">
            <FavouritesContainer />
          </div>
        </main>   
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    keywordSearch: state.keywordSearch
  }
};
const mapDispatchToProps = { changeCategories };
export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);



