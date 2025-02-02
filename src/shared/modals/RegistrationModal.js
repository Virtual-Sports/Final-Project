import React, { useState } from 'react'
import styles from './Modal.module.css'
import PropTypes from 'prop-types'
import { ReactComponent as ExitLogo } from '../../resources/icons/exit.svg'
import { ReactComponent as Eye } from '../../resources/icons/eye.svg'
import { ReactComponent as EyeNo } from '../../resources/icons/eye_no.svg'
import { fetchRegistration } from '../../shared/fetchs/fetchs'
import { registrationAuthModal as messages } from '../../shared/messages'

const RegistrationModal = ({
    setIsRegistrationModalVisible,
    setIsLoginModalVisible,
    setToken,
}) => {
    const [isPasswordShow, setIsPasswordShow] = useState(false)
    const [isPassword2Show, setIsPassword2Show] = useState(false)
    const [registrationError, setRegistrationError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')

    const formData = {
        login: email,
        password: pass1,
    }

    const registration = e => {
        e.preventDefault()

        if (pass1 !== pass2) {
            setRegistrationError(messages.passwordMatchError)
            return
        }

        fetchRegistration(formData)
            .then(async response => {
                if (response.status === 200) {
                    const resParsed = await response.text()
                    setToken(resParsed)
                    setIsRegistrationModalVisible(false)
                } else if (response.status === 409) {
                    const resParsed = await response.text()
                    setRegistrationError(resParsed)
                }
            })
            .catch(err => {
                setRegistrationError(messages.networkError, err)
            })
            .finally(setIsLoading(false))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.containerHeader}>
                    <button
                        className={styles.closeButton}
                        onClick={() => setIsRegistrationModalVisible(false)}
                    >
                        <ExitLogo className={styles.svg} />
                    </button>
                    <p>Регистрация</p>
                    <span></span>
                </div>
            </div>

            <div className={styles.formWrapper}>
                <form
                    className={styles.formBlock}
                    onSubmit={e => {
                        setIsLoading(false)
                        registration(e)
                    }}
                >
                    <input
                        className={styles.input}
                        placeholder={messages.enterEmail}
                        onChange={e => {
                            setEmail(e.target.value)
                            setRegistrationError('')
                        }}
                        type="email"
                        autoComplete="email"
                    />
                    <div className={styles.inputWrapper}>
                        <input
                            className={`${styles['input']} ${
                                registrationError
                                    ? styles['password-invalid']
                                    : ''
                            }`}
                            placeholder={messages.enterPassword}
                            onChange={e => {
                                setPass1(e.target.value)
                                setRegistrationError('')
                            }}
                            minLength={8}
                            maxLength={20}
                            autoComplete="new-password"
                            type={isPasswordShow ? 'text' : 'password'}
                        />
                        <span
                            className={styles.eys}
                            onClick={() => setIsPasswordShow(!isPasswordShow)}
                        >
                            {isPasswordShow ? <Eye /> : <EyeNo />}
                        </span>
                    </div>
                    <div className={styles.inputWrapper}>
                        <input
                            className={`${styles['input']} ${
                                registrationError
                                    ? styles['password-invalid']
                                    : ''
                            }`}
                            placeholder={messages.repeatPassword}
                            onChange={e => {
                                setPass2(e.target.value)
                                setRegistrationError('')
                            }}
                            minLength={8}
                            maxLength={20}
                            autoComplete="new-password"
                            type={isPassword2Show ? 'text' : 'password'}
                        />
                        <span
                            className={styles.eys}
                            onClick={() => setIsPassword2Show(!isPassword2Show)}
                        >
                            {isPassword2Show ? <Eye /> : <EyeNo />}
                        </span>
                    </div>
                    <span className={styles.error}>{registrationError}</span>
                    <button
                        type="submit"
                        className={styles.buttonLogin}
                        disabled={
                            !email || !pass1 || !pass2 || registrationError
                        }
                    >
                        {isLoading ? messages.loading : messages.registration}
                    </button>
                    <button
                        className={styles.buttonRegistration}
                        onClick={() => {
                            setIsLoginModalVisible(true),
                                setIsRegistrationModalVisible(false)
                        }}
                    >
                        {messages.login}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegistrationModal

RegistrationModal.propTypes = {
    setIsRegistrationModalVisible: PropTypes.func,
    setIsLoginModalVisible: PropTypes.func,
    setToken: PropTypes.func,
}
