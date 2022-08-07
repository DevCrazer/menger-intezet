import React from 'react'
import PostList from '../posts/post-list/PostList'
import FeaturedPosts from './featured-posts/FeaturedPosts'
import Intro from './intro/Intro'
import styles from "./LandingPage.module.scss"

export default function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <Intro />
      <FeaturedPosts />
      <PostList displayImages={false} />
    </div>
  )
}
