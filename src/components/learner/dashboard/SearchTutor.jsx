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

    // Khởi tạo state với tất cả các trường cần thiết
    const [formData, setFormData] = useState({
        search: '',
        category: '',
        address: '',
        userAddress: '',
        salaryRange: [0, 1000000],
        socialcreditsortasc: 'false', // Khởi tạo mặc định là giảm dần
    });
    const [loading, setLoading] = useState(false);

    // Lấy danh mục khi component mount
    useEffect(() => {
        getCategories();
        AOS.init({ duration: 500 });
    }, []);

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Xử lý thay đổi khoảng lương
    const handleSalaryChange = (event, newValue) => {
        setFormData((prev) => ({
            ...prev,
            salaryRange: newValue,
        }));
    };

    // Định dạng tiền tệ
    const formatSalary = (value) => {
        return `${value.toLocaleString('vi-VN')} VND`;
    };

    // Chuyển đổi sắp xếp điểm đánh giá
    const handleSortChange = () => {
        setFormData((prev) => ({
            ...prev,
            socialcreditsortasc: prev.socialcreditsortasc === 'true' ? 'false' : 'true',
        }));
    };

    // Xử lý tìm kiếm
    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);

        const searchData = new FormData();
        searchData.append('displayname', formData.search || ''); // Nếu rỗng thì gửi chuỗi rỗng
        searchData.append('category', formData.category || '');
        searchData.append('address', formData.address || '');
        searchData.append('userAddress', formData.userAddress || '');
        searchData.append('expectedsalary', `${formData.salaryRange[0]}-${formData.salaryRange[1]}`);
        searchData.append('socialcreditsortasc', formData.socialcreditsortasc);

        // Log dữ liệu để debug
        for (let pair of searchData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        mutate(searchData, {
            onSuccess: () => {
                console.log('Search successful:', data);
            },
            onError: (err) => {
                console.error('Search error:', err);
            },
            onSettled: () => setLoading(false),
        });
    };

    // Form tìm kiếm
    const renderSearchForm = () => (
        <form onSubmit={handleSearch}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <TextField
                    sx={{ flex: 2, minWidth: '200px' }}
                    placeholder="Tìm kiếm gia sư"
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

                <Select
                    sx={{ flex: 1, minWidth: '150px' }}
                    value={formData.category}
                    onChange={handleInputChange}
                    name="category"
                    displayEmpty
                >
                    <MenuItem value="">Tất cả danh mục</MenuItem>
                    {categoriesData?.data?.map((category) => (
                        <MenuItem key={category.id} value={category.categoryname}>
                            {category.categoryname}
                        </MenuItem>
                    ))}
                </Select>

                <TextField
                    sx={{ flex: 2, minWidth: '200px' }}
                    placeholder="Địa chỉ gia sư"
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



                <Box sx={{ width: '100%', padding: '10px 0' }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Box sx={{ flex: 1, backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
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
                        <Box sx={{ flex: '0 0 auto' }}>
                            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                Sắp xếp điểm:
                            </p>
                            <Button
                                onClick={handleSortChange}
                                variant="outlined"
                                sx={{ width: '120px' }}
                            >
                                {formData.socialcreditsortasc === 'true' ? 'Tăng dần' : 'Giảm dần'}
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || isLoading}
                    sx={{ backgroundColor: '#1976d2', padding: '10px 20px', minWidth: '120px' }}
                >
                    {loading || isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
                </Button>
            </Box>
        </form>
    );

    // Hiển thị danh sách gia sư
    const renderTutors = (tutors) => (
        <div className="Container-card" data-aos="fade-up">
            {tutors.map((tutor) => (
                <div key={`tutor-${tutor.userid}`} className="tutor-card border p-3 rounded mb-3">
                    <div className="row align-items-center">
                        <div className="col-md-2 text-center">
                            <img
                                onClick={() => navigate(`/learner/detailTutor/${tutor.userid}`, {
                                    state: { userid: tutor.userid },
                                })}
                                src={tutor.User?.imgurl || Uia}
                                alt="Tutor"
                                className="tutor-avatar rounded img-fluid"
                                style={{
                                    cursor: 'pointer',
                                    width: '100px', // Đặt kích thước cố định
                                    height: '100px', // Đặt kích thước cố định
                                    objectFit: 'cover', // Cắt ảnh để vừa khung
                                    borderRadius: '50%', // Nếu muốn ảnh tròn
                                }}
                            />
                        </div>

                        <div className="col-md-6">
                            <div className="d-flex align-items-center">
                                <h4 className="fw-bold mb-2 me-3">{tutor.User?.displayname}</h4>
                                <span className="text-muted">{tutor.User?.address}</span>
                            </div>
                            {tutor.distance && (
                                <p className="text-muted">Khoảng cách: {tutor.distance.toFixed(2)} km</p>
                            )}
                            <p className="text-muted">
                                Lĩnh vực: {tutor.Categories?.length > 0
                                    ? tutor.Categories.map((cat) => cat.categoryname).join(', ')
                                    : 'Không có danh mục'}
                            </p>
                            <p className="tutor-description"><strong>{tutor.description}</strong></p>
                        </div>
                        <div className="col-md-4 text-end">
                            <div className="row">
                                <div className="col-6">
                                    <p className="text-muted fs-8">Điểm đánh giá</p>
                                    <p>
                                        <FaStar className="text-warning" /> <strong>{tutor.socialcredit}</strong>
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p className="text-muted fs-8">Lương mong muốn</p>
                                    <p className="fw-bold tutor-price">{formatSalary(tutor.expectedsalary)}</p>
                                </div>
                            </div>
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    navigate(`/learner/detailTutor/${tutor?.User.username}`, {
                                        state: { username: tutor?.User.username, userid: tutor.userid },
                                    })
                                }
                            >
                                Xem chi tiết
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

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
                    gap: 2,
                }}
            >
                {renderSearchForm()}

                {error && (
                    <p className="text-danger text-center">Lỗi khi tải dữ liệu: {error.message}</p>
                )}

                {(loading || isLoading) && (
                    <div className="text-center my-4">
                        <img src={Uia} alt="Loading..." className="img-fluid" style={{ maxWidth: '150px' }} />
                    </div>
                )}

                {data && (
                    Array.isArray(data) && data.length > 0 ? (
                        renderTutors(data)
                    ) : data?.tutors && Array.isArray(data.tutors) && data.tutors.length > 0 ? (
                        renderTutors(data.tutors)
                    ) : (
                        <p className="text-center text-muted">Không tìm thấy gia sư phù hợp</p>
                    )
                )}
            </Box>
        </div>
    );
};

export default TutorSearch;