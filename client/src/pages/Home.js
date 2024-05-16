import React from 'react'
import Layout from '../components/LayOut/LayOut'
import { useAuth } from '../context/auth'

const HomePage = () => {
  const[auth ,setAuth] =useAuth();
  return (
    <Layout title={"E Commerce Website"}>
      <h1> Home Page</h1>
      <pre>{JSON.stringify(auth,null , 4 )}</pre>
    </Layout>
  )
}

export default HomePage
