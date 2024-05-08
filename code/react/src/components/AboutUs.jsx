import { useNavigate } from "react-router-dom";
import Navigation from './Navigation';
import './AboutUs.css'
export default function AboutUs() {

    const navigate = useNavigate();

    const homeButton = () => {
        return <button
            onClick={(e) => {
                e.preventDefault();
                navigate('/');
            }} style={{position: "fixed", top: 0, left: 0, margin: 10, padding: 10}}
        >
            Home
        </button>
    }

    return (
        <div className="aboutPage">
            <Navigation />
            <h1 style={{textAlign: "center"}}>About Pictogram</h1>
            <p className="aboutTextBody" style={{textAlign: "center"}}>Pictures are worth 1000 words. Pictogram is a multi-purpose application that allows users to
                express themselves with photos or show off their artistic ability. On one side of the app, users
                can to post their photos to a live feed for other users to view. On the other side, users can draw
                images, memes or anything else and post them. Other users can try to guess what the 
                drawing is. Whoever has the most correct guesses will top the leaderboad, so make it challenging! Whatever you decide to post
                or draw, Pictogram is meant to be a hub for creativity and entertainment. Show us what you've got!
            </p>
            <p className="aboutTextBody">
                <b>How we built Pictogram</b><br />
                React - We use React to serve the front end of our application<br /><br />

                Firebase Authentication - Firebase authenticates users and we utilize login functionality such that users must be logged in to have full access to the application’s features. <br /><br />

                MongoDB - We use MongoDB to store user data and image/guess data for that user<br /><br />
                
                <b>Independent technologies we used</b><br />

                Fabric.js - Fabric.js serves as the engine for our client-side image manipulation tools<br />
                http://fabricjs.com/<br /><br />

                Docker - Docker was used to containerize our web application and package CLI tools.<br />

            </p>
            <div>
                {homeButton()}
            </div>
        </div>
    )
}