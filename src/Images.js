import React from 'react';
import { connect } from "react-redux";
import { changeCategories, changeFavourites } from "./actions";


class Photo extends React.Component{
    handleChange = e => {
        console.log(this.props.categories);
        let categories = {...this.props.categories},
            favourites = [...this.props.favourites],
            val = e.target.checked,
            el = categories[this.props.keywordSearch][this.props.index];

        el.favourite = val;
        if(val){
            favourites.push(el);
        }
        else{
            const index = favourites.indexOf(el);
            favourites.splice(index, 1);
        }
        this.props.changeCategories(categories);
        this.props.changeFavourites(favourites);
    }
    render(){
        const {urls, created_at, downloads, likes, favourite, user} = this.props,
               link = `https://unsplash.com/@${user.username}?utm_source=your_app_name&utm_medium=referral`;

        return (
            <figure className="photo">
                <img className="image photo__img" src={urls.small} alt="Photo from Unsplash.com" />
                <figcaption className="photo__desc">
                    <p>created_at: {created_at}</p>
                    <p>downloads: {downloads}</p>
                    <p>likes: {likes}</p>
                    <label>Favourite:
                        <input type="checkbox" name="favourite-chck" checked={favourite} onChange={this.handleChange}/>
                    </label>
                    <p>Photo by <a href={link}>
                        {user.name}</a></p>
                </figcaption>
            </figure>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      categories: state.categories,
      keywordSearch: state.keywordSearch,
      favourites: state.favourites
    }
  };
  const mapDispatchToProps = { changeCategories, changeFavourites };
  
  export const PhotoContainer = connect(mapStateToProps, mapDispatchToProps)(Photo);

export function Images({photos, sortby}){
    return (
        <React.Fragment>
            {photos.map( (photo, index) => {
                return (
                    <PhotoContainer key={photo.id} index={index} {...photo}/>
                );
            }).sort((a,b) => {
                switch(sortby){
                    case 'created_at':
                    return (new Date(b.props.created_at)) - (new Date(a.props.created_at));
                    case 'downloads':
                        return b.props.downloads - a.props.downloads;
                    case 'likes':
                        return b.props.likes - a.props.likes;
                    default:
                        return 0;
                }
            })}
        </React.Fragment>
    );
}