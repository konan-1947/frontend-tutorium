import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/find.css';
import '../../../assets/css/schedule.css';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSearchTutors } from '../../../hooks/learner/learnerSearchTutor';
import { useGetCategories } from '../../../hooks/category/getCategories';
import Uia from '../../../assets/img/ui.gif';
import { Box, Button, MenuItem, Select, InputAdornment, TextField, Slider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TutorSearch = () => {
    const { mutate, isLoading, error, data } = useSearchTutors();
    const { mutate: getCategories, data: categoriesData } = useGetCategories();
    const navigate = useNavigate();

    // States
    const [formData, setFormData] = useState({
        search: '',
        category: '',
        address: '',
        userAddress: '',
        salaryRange: [0, 1000000],
        socialCredit: ''
    });
    const [loading, setLoading] = useState(false);

    // Effects
    useEffect(() => {
        getCategories();
        const savedData = JSON.parse(localStorage.getItem('chooseCustomData'));
        if (savedData) {
            setFormData(prev => ({
                ...prev,
                category: savedData.category,
                address: savedData.address
            }));
        }
        AOS.init({ duration: 1000 });
    }, []);

    // Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSalaryChange = (event, newValue) => {
        setFormData(prev => ({
            ...prev,
            salaryRange: newValue
        }));
    };

    const formatSalary = (value) => {
        return `${value.toLocaleString('vi-VN')} VND`;
    };
    const handleSortChange = () => {
        setFormData(prev => ({
            ...prev,
            socialcreditsortasc: prev.socialcreditsortasc === 'true' ? 'false' : 'true'
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);

        const searchData = new FormData();
        searchData.append('displayname', formData.search);
        searchData.append('category', formData.category);
        searchData.append('address', formData.address);
        searchData.append('userAddress', formData.userAddress);

        // Sửa cách gửi salary range
        searchData.append('expectedsalary', `${formData.salaryRange[0]}-${formData.salaryRange[1]}`);

        searchData.append('socialcreditsortasc', formData.socialcreditsortasc);


        // Log để debug
        console.log('Search Data:', {
            displayname: formData.search,
            category: formData.category,
            address: formData.address,
            userAddress: formData.userAddress,
            expectedsalary: `${formData.salaryRange[0]}-${formData.salaryRange[1]}`,
            minSocialCredit: formData.socialCredit || 0
        });

        mutate(searchData, {
            onSettled: () => setLoading(false)
        });
    };

    // Render functions
    const renderSearchForm = () => (
        <form onSubmit={handleSearch}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {/* Search Input */}
                <div>
                    <TextField
                        sx={{ flex: 2, width: '120%' }}
                        placeholder="Tìm kiếm"
                        name="search"
                        value={formData.search}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                {/* Category Select */}
                <div>
                    <Select
                        sx={{ marginLeft: 3, width: '100%' }}
                        value={formData.category}
                        onChange={handleInputChange}
                        name="category"
                        displayEmpty
                    >
                        <MenuItem value="">Lĩnh vực</MenuItem>
                        {categoriesData?.data?.map((category) => (
                            <MenuItem
                                key={category.id}
                                value={category.categoryname}
                            >
                                {category.categoryname}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                {/* Address Fields */}
                <div>
                    <TextField
                        sx={{ flex: 2 }}
                        placeholder="Địa chỉ của gia sư"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
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
                        value={formData.userAddress}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                {/* Salary and Rating Filters */}
                <div style={{ width: '100%', padding: '20px 10px' }}>
                    <Box sx={{ width: '100%', display: 'flex', gap: 2, padding: '10px' }}>
                        {/* Salary Slider */}
                        <Box sx={{
                            flex: 1,
                            backgroundColor: '#f5f5f5',
                            padding: '15px',
                            borderRadius: '8px'
                        }}>
                            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                Học phí/giờ:
                            </p>
                            <Slider
                                value={formData.salaryRange}
                                onChange={handleSalaryChange}
                                valueLabelDisplay="auto"
                                valueLabelFormat={formatSalary}
                                min={0}
                                max={1000000}
                                step={50000}
                                size="small"
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, fontSize: '12px' }}>
                                <span>{formatSalary(formData.salaryRange[0])}</span>
                                <span>{formatSalary(formData.salaryRange[1])}</span>
                            </Box>
                        </Box>
                        <Box sx={{  }}>
                        {/* Rating Select */}
                        Sắp xếp theo điểm đánh giá
                        <Button
                        
                            onClick={handleSortChange}
                            variant="outlined"
                            size="small"
                            sx={{
                                minWidth: 'auto',
                                padding: '8px',
                                borderColor: '#ced4da',
                                width: '100%',
                                backgroundColor: 'white',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ced4da'
                                }
                            }}
                        >
                            {formData.socialcreditsortasc === 'true' ? 'tăng dần' : 'giảm dần'}
                        </Button>
                        </Box>
                    </Box>
                </div>

                {/* Search Button */}
                <button type="submit" disabled={loading || isLoading}>
                    {loading || isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
                </button>
            </Box>
        </form>
    );

    const renderTutors = (tutors) => (
        <div className="Container-card" data-aos="fade-up">
            {tutors.map((tutor, index) => (
                <li key={index}>
                    <div className="tutor-card border p-3 rounded container">
                        <div className="row align-items-center">
                            <div className="col-md-2 tutor-image text-center">
                                <img
                                    onClick={() => navigate(`/learner/detailTutor/:${tutor.userid}`, {
                                        state: { userid: tutor.userid }
                                    })}
                                    src={tutor.User?.imgurl}
                                    alt="Tutor"
                                    className="tutor-avatar rounded img-fluid"
                                />
                            </div>
                            <div className="col-md-5">
                                <div className="d-flex">
                                    <h4 className="fw-bold mb-0">{tutor.User?.displayname}</h4>
                                    <span className="ms-2">{tutor.User?.address}</span>
                                    {tutor.distance && (
                                        <span className="badge ms-2">
                                            <p className="text-muted">Distance: {tutor.distance} km</p>
                                        </span>
                                    )}
                                </div>
                                <p className="text-muted">
                                    Lĩnh vực {tutor.Categories ? tutor.Categories.map(cat => cat.categoryname).join(', ') : 'No categories'}
                                </p>
                                <p className="tutor-description"><strong>{tutor.description}</strong></p>
                            </div>
                            <div className="col-md-5 text-end tutor-price-rating">
                                <div className="row">
                                    <div className="col-6 text-end">
                                        <p className="text-muted fs-8">Điểm đánh giá</p>
                                        <p className="text-end">
                                            <FaStar className="text-warning" />
                                            <strong>{tutor.socialcredit}</strong>
                                        </p>
                                    </div>
                                    <div className="col-6 text-end">
                                        <p className="text-muted fs-8">Lương mong muốn</p>
                                        <p className="fw-bold tutor-price">{tutor.expectedsalary} VND</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12 text-end">
                                <Button
                                    className="btn me-2"
                                    onClick={() => navigate(`/learner/detailTutor/:${tutor.userid}`, {
                                        state: { userid: tutor.userid }
                                    })}
                                >
                                    Xem chi tiết
                                </Button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </div>
    );

    return (
        <div className="tutorSearch-body">
            <Box sx={{
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
            }}>
                {renderSearchForm()}

                {error && <p>Error fetching data: {error.message}</p>}

                {(loading || isLoading) && (
                    <div className="text-center my-4">
                        <img src={Uia} alt="Loading..." className="img-fluid" />
                    </div>
                )}

                {data && (
                    Array.isArray(data) ? renderTutors(data) :
                        data.tutors && Array.isArray(data.tutors) ? renderTutors(data.tutors) :
                            <p>Không tìm thấy gia sư phù hợp</p>
                )}
            </Box>
        </div>
    );
};

export default TutorSearch;
