import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/find.css';
import '../../../assets/css/schedule.css';
import { FaStar } from 'react-icons/fa';
import { Button } from "./ButtonPopup";
import { useNavigate } from 'react-router-dom';
import { useSearchTutors } from '../../../hooks/search/learnerSearchTutor'; // Import custom hook
import Uia from '../../../assets/img/ui.gif'; // GIF loading
import { Box, MenuItem, Select, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const TutorSearch = () => {
    const { mutate, isLoading, error, data } = useSearchTutors();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Trạng thái loading cho dữ liệu gửi đi

    const [search, setSearch] = useState(''); // Trạng thái loading cho dữ liệu gửi đi
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [userAddress, setUserAddress] = useState('');

    useEffect(() => {
        // Lấy dữ liệu đã lưu từ localStorage
        const savedData = JSON.parse(localStorage.getItem('chooseCustomData'));
        if (savedData) {
          setCategory(savedData.category);
          setAddress(savedData.address);
       
        }
      }, []);
    
    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true); // Bắt đầu loading khi người dùng bấm gửi

        const form = new FormData(e.target); // Collect the form data
        mutate(form, {
            onSettled: () => {
                setLoading(false); // Dừng loading khi mutate hoàn thành
            }
        });
    };

    // Log the data for debugging purposes
    console.log('Fetched Data:', data);

    // Handle rendering the tutor results
    const renderTutors = (tutors) => {
        return (
            <div className="Container-card">
                {tutors.map((tutor, index) => (
                    <li key={index}>
                        <div className="tutor-card border p-3 rounded container">
                            <div className="row align-items-center">
                                <div className="col-md-2 tutor-image text-center">
                                    <img onClick={() => navigate("/details")} src={tutor.imageUrl} alt="Tutor" className="tutor-avatar rounded img-fluid" />
                                </div>
                                <div className="col-md-7">
                                    <div className="d-flex">
                                        <h4 className="fw-bold mb-0">{tutor.User?.displayname}</h4>
                                        <span className="ms-2">{tutor.User?.address}</span>
                                        <span className="badge ms-2">
                                            {tutor.distance && (
                                                <p className="text-muted"> Distance: {tutor.distance} km</p>
                                            )}
                                        </span>
                                    </div>
                                    <p className="text-muted">Lĩnh vực {tutor.Categories ? tutor.Categories.map(cat => cat.categoryname).join(', ') : 'No categories'}</p>
                                    <p className="tutor-description"><strong>{tutor.description}</strong></p>
                                </div>
                                <div className="col-md-3 text-end tutor-price-rating">
                                    <div className="row">
                                        <div className="col-6 text-start">
                                            <p className="mb-1 tutor-rating"><FaStar className="text-warning" /> <strong>{tutor.socialcredit}</strong></p>
                                            <p className="text-muted"> Điểm đánh giá</p>
                                        </div>
                                        <div className="col-6 text-end">
                                            <p className="fw-bold tutor-price">${tutor.expectedsalary}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12 text-end">
                                    <Button className="btn btn-pink me-2" onClick={() => navigate("/details")}>Xem chi tiết</Button>
                                    <button className="btn btn-outline-secondary" onClick={() => handleFavorite(tutor)}>Nhắn tin</button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </div>
        );
    };

    return (
        <div className="tutorSearch-body">

            <Box
                sx={{

                    paddingTop: 4,
                    width: '100%',
                    maxWidth: 1100,
                    margin: 'auto',
                    padding: '16px 24px',
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >


                <form onSubmit={handleSearch}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <div>
                            <TextField
                                sx={{ flex: 2,width: '120%' }}
                                placeholder="Tìm kiếm"
                                name="displayname"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}

                            />
                        </div>
                        <div>

                            <Select
                                sx={{ marginLeft: 3, width: '100%' }}
                                value={category} // Bind the state to the Select value
                                onChange={(e) => setCategory(e.target.value)} // Update the state on change
                                name="category"
                                displayEmpty
                            >
                                <MenuItem value="" >Lĩnh vực</MenuItem>
                                <MenuItem value="Tiếng Anh">Tiếng Anh</MenuItem>
                                <MenuItem value="Toán Học">Toán</MenuItem>
                            </Select>
                        </div>

                        <div>
                        <TextField
                                sx={{ flex: 2 }}
                                placeholder="Địa chỉ của của gia sư"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}

                            />
                        </div>
                        <div>
                            <TextField
                                sx={{ flex: 2 }}
                                placeholder="Địa chỉ của bạn"
                                name="userAddress"
                                value={userAddress}
                                onChange={(e) => setUserAddress(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}

                            />
                        </div>
                        <button type="submit" disabled={loading || isLoading}>
                            {loading || isLoading ? 'Searching...' : 'Search Tutors'}
                        </button>
                    </Box>
                </form>


                {error && <p>Error fetching data: {error.message}</p>}

                {/* Hiển thị spinner khi loading */}
                {loading || isLoading ? (
                    <div className="text-center my-4">

                        <img src={Uia} alt="Loading..." className="img-fluid" /> {/* Optional loading GIF */}
                    </div>
                ) : null}

                {/* Render tutor data */}
                {data ? (
                    Array.isArray(data) ? (
                        renderTutors(data)
                    ) : data.tutors && Array.isArray(data.tutors) ? (
                        renderTutors(data.tutors)
                    ) : (
                        <p>No tutors found or invalid data structure</p>
                    )
                ) : null}

            </Box>
        </div>
    );
};

export default TutorSearch;
