import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import { connect } from "react-redux"
import { setAnything } from "../redux/actions/main"

const mapStateToProps = (state: any) => {
  return {
    anything: state.main.anything,
  }
}

const mapDispatchToProps = {
  setAnything,
}

const Home: NextPage = (props: any) => {
  const { setAnything, anything } = props;

  React.useEffect(() => {
    setAnything("!");
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {anything}
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

