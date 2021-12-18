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

            <div className="cars">
                <div>
                    <img className="home-page__car speed-fast" src={Car} />
                </div>
                <div>
                    <img className="home-page__car speed-medium" src={Car} />
                </div>
                <div>
                    <img className="home-page__car speed-slow" src={Car} />
                </div>
            </div>

        </div>
    )
};

export default HomePage;