import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Typography, Tab, Tabs, Avatar, List, ListItem, ListItemText, Divider, Paper, TextField, Button } from '@mui/material';

const UserProfile = () => {
    const [selectedTab, setSelectedTab] = useState(0); // Mặc định chọn Tab "Thông tin"
    const [editing, setEditing] = useState(false); // Trạng thái để kiểm tra đang sửa hay không
    const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150"); // Mặc định ảnh profile
    const [userInfo, setUserInfo] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-789",
        dob: "1990-01-01",
        address: "123 Main St, City, Country",
        field: "Software Development",
    });

    // Dữ liệu mẫu cho khóa học và gia sư
    const courses = [
        { id: 1, name: "React for Beginners" },
        { id: 2, name: "Advanced JavaScript" },
    ];

    const tutors = [
        { id: 1, name: "Jane Smith" },
        { id: 2, name: "Mike Johnson" },
    ];

    // Xử lý khi chọn tab
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    // Xử lý thay đổi thông tin người dùng
    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Lưu thông tin khi nhấn nút "Lưu"
    const handleSave = () => {
        setEditing(false);
    };

    // Hủy chế độ sửa thông tin
    const handleCancel = () => {
        setEditing(false);
    };

    // Xử lý thay đổi ảnh profile
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Cập nhật ảnh mới
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: 'white', paddingTop: 0 }}>
            {/* Sidebar */}
            <Box sx={{ width: 250, backgroundColor: '#3e6cad', color: 'white', padding: 3, borderRadius: 2, paddingTop: 5 }}>
                <Avatar
                    src={profileImage} // Hiển thị ảnh profile
                    sx={{ width: 100, height: 100, marginBottom: 2, marginLeft: 'auto', marginRight: 'auto', border: '2px solid #ffffff' }}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} // Xử lý thay đổi ảnh
                    style={{ display: 'none',marginBottom:10 }}
                    id="file-input"
                />

                <Typography variant="h6" align="center" sx={{ marginBottom: 2, fontWeight: 600 }}>
                    {userInfo.name}
                </Typography>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    orientation="vertical"
                    sx={{
                        borderRight: 2, borderColor: 'divider', color: 'white',
                         // Đảm bảo tất cả các Tab có màu chữ trắng
                       
                        '& .Mui-selected': {
                            color: '#ff6172', // Chỉnh màu khi tab được chọn (tùy chỉnh màu theo yêu cầu)
                        }
                    }}
                >
                    <Tab sx={{ color: 'white' }} label="Thông tin" />
                    <Tab sx={{ color: 'white' }} label="Khóa học" />
                    <Tab sx={{ color: 'white' }} label="Gia sư" />
                </Tabs>
            </Box>

            {/* Content */}
            <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: '#f8f9fa' }}>
                <Paper sx={{ padding: 3, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: 3 }}>
                    {/* Tab Content */}
                    {selectedTab === 0 && (
                        <Box sx={{ color: '#333', padding: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Thông tin người dùng</Typography>
                            <Divider sx={{ marginBottom: 2 }} />
                            {editing ? (
                                <>
                                    <label htmlFor="file-input">
                                        <Button variant="contained" component="span" sx={{ marginTop: 2 }}>Thay đổi ảnh</Button>
                                    </label>
                                    <TextField
                                        label="Tên"
                                        name="name"
                                        value={userInfo.name}
                                        onChange={handleUserInfoChange}
                                        fullWidth
                                        sx={{ marginBottom: 2,marginTop:2 }}
                                    />
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={userInfo.email}
                                        onChange={handleUserInfoChange}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        label="Số điện thoại"
                                        name="phone"
                                        value={userInfo.phone}
                                        onChange={handleUserInfoChange}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        label="Ngày sinh"
                                        name="dob"
                                        value={userInfo.dob}
                                        onChange={handleUserInfoChange}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        label="Địa chỉ"
                                        name="address"
                                        value={userInfo.address}
                                        onChange={handleUserInfoChange}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        label="Lĩnh vực"
                                        name="field"
                                        value={userInfo.field}
                                        onChange={handleUserInfoChange}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Button onClick={handleCancel} variant="outlined" color="secondary">Hủy</Button>
                                        <Button onClick={handleSave} variant="contained" color="primary">Lưu</Button>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Tên:</strong> {userInfo.name}</Typography>
                                    <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Email:</strong> {userInfo.email}</Typography>
                                    <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Số điện thoại:</strong> {userInfo.phone}</Typography>
                                    <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Ngày sinh:</strong> {userInfo.dob}</Typography>
                                    <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Địa chỉ:</strong> {userInfo.address}</Typography>
                                    <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Lĩnh vực:</strong> {userInfo.field}</Typography>
                                    <Button onClick={() => setEditing(true)} variant="contained" color="primary">Sửa thông tin</Button>
                                </>
                            )}
                        </Box>
                    )}

                    {selectedTab === 1 && (
                        <Box sx={{ color: '#333', padding: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Buổi đang học</Typography>
                            <Divider sx={{ marginBottom: 2 }} />
                            <List>
                                {courses.map(course => (
                                    <ListItem key={course.id}>
                                        <ListItemText primary={course.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}

                    {selectedTab === 2 && (
                        <Box sx={{ color: '#333', padding: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Gia sư đang theo dõi</Typography>
                            <Divider sx={{ marginBottom: 2 }} />
                            <List>
                                {tutors.map(tutor => (
                                    <ListItem key={tutor.id}>
                                        <ListItemText primary={tutor.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default UserProfile;
