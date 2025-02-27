import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Typography, Tab, Tabs, Avatar, List, ListItem, ListItemText, Divider, Grid, Paper, TextField } from '@mui/material';

const UserProfile = () => {
    const [selectedTab, setSelectedTab] = useState(0); // Mặc định chọn Tab "Thông tin"

    // Dữ liệu mẫu cho thông tin người dùng
    const userInfo = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-789",
        dob: "1990-01-01",
        address: "123 Main St, City, Country",
        field: "Software Development",
    };

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

    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: 'white', paddingTop: 0 }}>
            {/* Sidebar */}
            <Box sx={{ width: 250, backgroundColor: '#3e6cad', color: 'white', padding: 3, borderRadius: 2, paddingTop: 5 }}>
                <Avatar
                    src="https://via.placeholder.com/150"
                    sx={{ width: 100, height: 100, marginBottom: 2, marginLeft: 'auto', marginRight: 'auto', border: '2px solid #ffffff' }}
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
                        '& .MuiTab-root': {
                            color: 'white',  // Đảm bảo tất cả các Tab có màu chữ trắng
                        },
                        '& .Mui-selected': {
                            color: '#f6cae4', // Chỉnh màu khi tab được chọn (tùy chỉnh màu theo yêu cầu)
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
                            <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Tên:</strong> {userInfo.name}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Email:</strong> {userInfo.email}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Số điện thoại:</strong> {userInfo.phone}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Ngày sinh:</strong> {userInfo.dob}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Địa chỉ:</strong> {userInfo.address}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}><strong>Lĩnh vực:</strong> {userInfo.field}</Typography>
                        </Box>
                    )}

                    {selectedTab === 1 && (
                        <Box sx={{ color: '#333', padding: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Khóa học đang học</Typography>
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
