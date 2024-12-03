import nodemailer from'nodemailer'
import {google} from 'googleapis'

const OAuth2 = google.auth.OAuth2
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const user = process.env.USER;

const OAuth2_client = new OAuth2(clientId , clientSecret)
OAuth2_client.setCredentials({refresh_token : refreshToken});


  function send_email (name , recipent , message){
    const access_token = OAuth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            type : 'OAUTH2',
            user : user,
            clientId : clientId,
            clientSecret : clientSecret,
            refreshToken : refreshToken,
            accessToken : access_token

        }

    })
    const mailOptions  = {
        from : ` BHARAT THE LEGEND <${user}>`,
        to :recipent,
        subject : "Check Your Email",
        html : get_html_message(name , message)
    }

    transport.sendMail(mailOptions , function(error , result) {
         if(error ){
          console.log('Error' , error);
         }
         else{
            console.log('Success ' , result);
         }
         transport.close();
    })
}

function get_html_message(name , message){
 return (`<h1> Hi ${name} , OTP for Password Reset is ${message} </h1>`)
}



// send_email("Sharad" , 'vivek1217.work@gmail.com');
export default send_email;