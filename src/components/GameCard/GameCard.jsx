import React from 'react'
import styles from './GameCard.module.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const GameCard = ({ id, title, img }) => {
    const defaultImageUrl = 'https://via.placeholder.com/250x250' // TODO: move to another file with constants
    const defaultTitle = 'no title' // TODO: move to another file with constants

    return (
        <Link className={styles.card} to={`/game/${id}`}>
            <img src={img ?? defaultImageUrl} />
            <p className={styles.description}>{title ?? defaultTitle}</p>
        </Link>
    )
}

GameCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string,
}

export default GameCard
