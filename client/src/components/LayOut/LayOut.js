import  React  from 'react';
import Header from './Header';
import Footer from './Footer';
import {Helmet} from "react-helmet";

import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children , title , description , keywords , author })=>{
    return(
        <div>
             <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                
                 <meta name="description" content={description} />
                 <meta name="keywords" content={keywords}/>
                 <meta name="author" content={author} />
                 

            </Helmet>
            <Header/>
            <main style={{minHeight:'80vh'}}>
                <ToastContainer/>
            {children }
            </main>
            <Footer/>
        </div>
    )
}

Layout.defaultProps = {
    title : 'ECommerce App ',
    description : "Mern stack project",
    keywords : "mern , react , node  , mongodb ",
    author : "Bharat"
}
export default Layout;
