import Car from "./assets/car.png";

const HomePage = () => {
    return (
        <div className="home-page">
            <div className="home-page__first-liner">
                Parking
            </div>
            <div>
                made easy
            </div>

            <div className="home-page__messages">
                <div className="message">
                    We are monitoring on 7 new parking lots!
                </div>
                <div className="message">
                    Visit heat map tab to see
                </div>
            </div>

        </div>
    )
};

export default HomePage;