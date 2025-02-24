import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/sort.css';

const TutorListing = () => {
    return (
        <div className="tutor-listing-container">


            {/* Filter Section */}
            <div className="filter-section mb-4">
                <div className="row g-3">
                    <div className="col-md-3">
                        <select className="form-select">
                            <option selected>I want to learn</option>
                            <option value="1">English</option>
                            <option value="2">Spanish</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select">
                            <option selected>Price per lesson</option>
                            <option value="1">$3 - $10</option>
                            <option value="2">$10 - $20</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select">
                            <option selected>Country of birth</option>
                            <option value="1">USA</option>
                            <option value="2">UK</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select">
                            <option selected>I'm available</option>
                            <option value="1">Morning</option>
                            <option value="2">Evening</option>
                        </select>
                    </div>
                </div>

                <div className="row  mt-3">
                    <div className="col-md-2">
                        <button className=" btn-outline-secondary ">Specialties</button>
                    </div>
                    <div className="col-md-2">
                        <button className=" btn-outline-secondary">Also speaks</button>
                    </div>
                    <div className="col-md-2">
                        <button className=" btn-outline-secondary ">Native speaker</button>
                    </div>
                    <div className="col-md-2">
                        <button className="btn-outline-secondary">Tutor categories</button>
                    </div>
                    <div  className="col-md-2">
                        <select  className="form-select sort-wide">
                            <option selected>Sort by: Our top picks</option>
                            <option value="1">Price: Low to High</option>
                            <option value="2">Price: High to Low</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <div className="input-group">
                            <span className="input-group-text">🔍</span>
                            <input type="text" className="form-control" placeholder="Search by name or keyword" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TutorListing;
