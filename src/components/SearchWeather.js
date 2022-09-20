import * as React from "react";
import axios from 'axios';

export default function SearchWeather() {
    const [city, setCity] = React.useState("Delhi");
    const [weatherData, setWeatherData] = React.useState(null);


    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    const apiKey="e72c862279f13bdcf2dae3e42859297d";

    const getWeatherData = (city) => {
        try {
            axios.get(baseUrl + `q=${city}&appid=${apiKey}`).then((data) => setWeatherData(data));
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        
        getWeatherData(city);
    }, [city]);

    //date
    const today = new Date();
    const date = today.getDate();
    const year = today.getFullYear();
    const month = today.toLocaleString("default", { month: 'long' });
    const day = today.toLocaleString("default", { weekday: 'long' });

    const handleSubmit = (event) =>{
        event.preventDefault();
        getWeatherData(city);
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className='col-lg-4 col-md-6'>
                        <div className="card text-white text-center ">
                            <img src="https://images.unsplash.com/photo-1500817487388-039e623edc21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZSUyMHZlcnRpY2FsfGVufDB8fDB8fA%3D%3D&w=1000&q=80" className="card-img" alt="..." height="800" width="600"/>
                            <div className="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-4 ">
                                        <input
                                            type="search"
                                            className="form-control"
                                            placeholder="Search City"
                                            aria-label="Search City"
                                            aria-describedby="basic-addon2"
                                            name='search'
                                            onChange={(e) => setCity(e.target.value)}
                                            required

                                        />
                                        
                                    </div>
                                </form>
                                {weatherData !== null ? (
                                    <div className="bg-dark bg-opacity-50 py-3">
                                        <h2 className="card-title">{weatherData.data.name} , {weatherData.data.sys.country}</h2>
                                        <p className="card-text lead">
                                            {day}
                                            <br />
                                            {month} {date},{year}
                                        </p>
                                        <hr />
                                        <img src={`http://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`} alt="...." height="150" width="150" />
                                        <h1 className='mb-5'>{(weatherData.data.main.temp-273.15).toFixed(2)}&deg; C</h1>
                                        <h4 className='mb-0'>{weatherData.data.weather[0].main}</h4>
                                        <h5 className="lead pt-3 pb-3">{(weatherData.data.main.temp_min-273.15).toFixed(2)} &deg;C | {(weatherData.data.main.temp_max-273.15).toFixed(2)} &deg;C</h5>
                                    </div>
                                ) : null}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
