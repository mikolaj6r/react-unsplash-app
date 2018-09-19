import React from 'react';
import { connect } from "react-redux";

export const Favourites = ({favourites}) => {
    return (
        <React.Fragment>
            <p>Favourites Photos :) </p>
            <ul className="favourites__list">
                {favourites.map( (photo, index) => {
                    return (
                        <li key={index} className="favourites__item">
                            <img className="image" src={photo.urls.thumb} alt="Photo from Unsplash.com" />
                        </li>
                    );
                })}    
            </ul>
        </React.Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        favourites: state.favourites
    }
};
export const FavouritesContainer = connect(mapStateToProps)(Favourites);