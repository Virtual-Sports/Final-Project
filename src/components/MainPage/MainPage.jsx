import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './MainPage.module.css'

import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import AllGames from '../AllGames/AllGames'
import { fetchData } from '../../redux/actions/data'
import { mainPageSelector } from './MainPage.selector.js'
import LoginModal from '../modals/LoginModal'
import RegistrationModal from '../modals/RegistrationModal'
import useToken from '../hooks/useToken'

function MainPage() {
    const dispatch = useDispatch()
    const { token, setToken } = useToken()
    const { filtersVisibility, categories, providers } = useSelector(
        mainPageSelector
    )
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)
    const [
        isRegistrationModalVisible,
        setIsRegistrationModalVisible,
    ] = useState(false)

    useEffect(() => {
        dispatch(fetchData())
    }, [])

    return (
        <div className={styles['container']}>
            <Header
                isMainPage={true}
                token={token}
                setToken={setToken}
                setIsLoginModalVisible={setIsLoginModalVisible}
                setIsRegistrationModalVisible={setIsRegistrationModalVisible}
            />

            <div className={styles['main-content']}>
                <div className={styles['sidebar']}>
                    <Sidebar categories={categories} providers={providers} />
                </div>

                {!filtersVisibility ? (
                    <div className={styles['games-container']}>
                        <AllGames />
                    </div>
                ) : (
                    <></>
                )}
                {isLoginModalVisible && (
                    <LoginModal
                        setToken={setToken}
                        setIsLoginModalVisible={setIsLoginModalVisible}
                        setIsRegistrationModalVisible={
                            setIsRegistrationModalVisible
                        }
                    />
                )}
                {isRegistrationModalVisible && (
                    <RegistrationModal
                        setToken={setToken}
                        setIsRegistrationModalVisible={
                            setIsRegistrationModalVisible
                        }
                    />
                )}
            </div>
        </div>
    )
}

export default MainPage
