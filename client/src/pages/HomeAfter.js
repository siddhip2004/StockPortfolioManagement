import { useAuthContext } from '../hooks/useAuthContext';

const HomeAfter = () => {

    const {user} = useAuthContext();
    
    return ( 
        <div className="container">
        {user && (
            <div className="homeafter">
        <h1>WELCOME {user.username}</h1>
        <h5>Your Path to Prosperity Starts Here </h5>
        <div className="arrangepara">
        <p>At InvestSavvy, we understand that every investment decision is a step towards securing your financial future. So, learn about business schemes and financial planning to effecticely engage in the best investment option to shape a secure future for you and your family </p>
        <p>Your aspirations are our priority, and we are here to be the guardians of your financial legacy.</p>
        </div>
        </div>
        )}

</div>
     );

    
}
 
export default HomeAfter;