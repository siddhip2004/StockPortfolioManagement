import girl from '../pictures/girl.png'
import boy from '../pictures/boy.png'
// import { Link } from 'react';

const About = () => {
    return ( 
        
        <div className="about">
            <div className="text">
            <h1>About Us</h1>
            </div>
            <div className="body">
        
            <a href ="https://github.com/druhi021204" target="_blank">
            <div className="descrt">
           
                <div className="image">               
                <img src= {girl} alt="github"/>
                </div>
                <p><u>Name</u>: Druhi Phutane</p>
                <p><u>Education</u>: Currently studying at VJTI, Mumbai</p>
                <p><u>Email</u>: druhiphutane@gmail.com</p>
             
            </div>
            </a>

            <a href ="https://github.com/nishatp9" target="_blank">
            <div className="descrt">
           
                <div className="image">               
                <img src= {boy} alt="github"/>
                </div>
                <p><u>Name</u>: Nishat Patil</p>
                <p><u>Education</u>: Currently studying at VJTI, Mumbai</p>
                <p><u>Email</u>: nishatpatil902@gmail.com</p>
             
            </div>
            </a>

            <a href ="https://github.com/thisisPurab" target="_blank">
            <div className="descrt">
           
                <div className="image">               
                <img src= {boy} alt="github"/>
                </div>
                <p><u>Name</u>: Purab Tamboli</p>
                <p><u>Education</u>: Currently studying at VJTI, Mumbai</p>
                <p><u>Email</u>: purabrtamboli@gmail.com</p>
             
            </div>
            </a>

            <a href ="https://github.com/siddhip2004" target="_blank">
            <div className="descrt">
           
                <div className="image">               
                <img src= {girl} alt="github"/>
                </div>
                <p><u>Name</u>: Siddhi Parekh</p>
                <p><u>Education</u>: Currently studying at VJTI, Mumbai</p>
                <p><u>Email</u>: shparekh25@gmail.com</p>
             
            </div>
            </a>
           
            {/* <div className="descrt">
                <a href="https://github.com/siddhip2004" target="_blank" rel="noreferrer">
                <img src= {boy} alt="github"/>
                </a>
                <p><u>Name</u>: Siddhi Parekh</p>
                <p><u>Education</u>: Currently studying at VJTI, Mumbai</p>
                <p><u>Email</u>: shparekh25@gmail.com</p>
            </div>

            <div className="descrt">
                <a href="https://github.com/siddhip2004" target="_blank" rel="noreferrer">
                <img src= {boy} alt="github"/>
                </a>
                <p><u>Name</u>: Siddhi Parekh</p>
                <p><u>Education</u>: Currently studying at VJTI, Mumbai</p>
                <p><u>Email</u>: shparekh25@gmail.com</p>
            </div>

            <div className="descrt">
                <a href="https://github.com/siddhip2004" target="_blank" rel="noreferrer">
                <img src= {girl} alt="github"/>
                </a>
                <p><u>Name</u>: Siddhi Parekh</p>
                <p><u>Education</u>: Currently studying at VJTI, Mumbai</p>
                <p><u>Email</u>: shparekh25@gmail.com</p>
            </div> */}
        
            </div>
        </div>
       
     );
}
 
export default About;