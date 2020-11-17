import logout from 'app/auth/mutations/logout'
import { useCurrentUser } from 'app/hooks/useCurrentUser'
import { Link, useMutation } from 'blitz'
import React from 'react'
import styles from './index.module.scss'

export const Header = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
      <div>
        <img src="/logo.png" alt="blitz.js" width="200"/>
      </div>
      <nav>
        <ul className={styles.navList}>
          {currentUser ?
            <li className={styles.navItem}>
              <button
                className={styles.navBtn}
                onClick={async () => {
                  await logoutMutation()
                }}
              >
                Logout
              </button>
            </li>
          :
          <>
            <li className={styles.navItem}>
              <Link href="/signup">
                <a className={styles.navLink}>
                  Sign Up
                </a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/login">
                <a className={styles.navLink}>
                  Login
                </a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/todos">
                <a className={styles.navLink}>
                  Todos
                </a>
              </Link>
            </li>
          </>

        }
        </ul>
      </nav>
      </div>
    </header>
  )
}
