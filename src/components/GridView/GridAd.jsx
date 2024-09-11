import PropTypes from 'prop-types'
import './style.css'

function GridAd({obj}) {
    return (
        <li className="grid-ad">
            <img className="grid-ad__image" src={obj.image} alt="image" />
            <p className="grid-ad__p">{obj.paragraph}</p>
            <div className="grid-ad__name">{obj.name}</div>
            <article className="grid-ad__description">{obj.description}</article>
            <button            
                className="grid-ad__btn"
            >Find out more</button>
        </li>
    );
}

GridAd.propTypes = {
    obj: PropTypes.object
}


export default GridAd;