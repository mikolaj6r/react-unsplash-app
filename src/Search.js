import React, { Component } from 'react';
import { connect } from "react-redux";
import { searchKeyword } from "./actions";

export class Search extends Component{
    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }
    handleSearchChange = (e) => {
        this.props.searchKeyword(e.currentTarget.value);
    }   

    search = async () => {
        await this.props.searchKeyword(this.myRef.current.value);
        this.props.action();
    }
    render(){
        return (
            <div>
                <input  ref={this.myRef} type="search" name="searchField" placeholder="Search" />
                <button onClick={this.search}>Search</button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
      keywordSearch: state.keywordSearch
    };
  };
  
  const mapDispatchToProps = { searchKeyword };
  
  export const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search);