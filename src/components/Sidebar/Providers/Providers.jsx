import React from 'react'

import styles from '../Sidebar.module.css'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

Providers.propTypes = {
    selectedProviders: PropTypes.array.isRequired,
    onSelectHandler: PropTypes.func.isRequired,
}

function Providers({ selectedProviders, onSelectHandler }) {
    const providers = useSelector(state => state.data.data.providers)

    return providers.map(provider => (
        <div
            key={provider.id}
            className={`${styles['provider']} ${
                selectedProviders.includes(provider.id)
                    ? styles['selected']
                    : ''
            }`}
            onClick={onSelectHandler(provider.id, false)}
        >
            <img src={provider.icon} alt="provider-icon" />
        </div>
    ))
}

export default Providers