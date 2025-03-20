import React, { useState, useEffect } from 'react';
import { Box, Typography, Tab, Tabs, Avatar, List, ListItem, ListItemText, Divider, Paper, TextField, Button, Grid, CircularProgress } from '@mui/material';
import { useGetLearnerDetail } from '../../../hooks/learner/getLearnerDetail';
import { useNavigate } from 'react-router-dom';
const ProfileLearner = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [editing, setEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const { mutate: getLearnerDetail, data: learnerData, isLoading, error } = useGetLearnerDetail();
    const navigate = useNavigate();
    useEffect(() => {
        getLearnerDetail();
    }, []);

    useEffect(() => {
        if (learnerData?.User) {
            setUserInfo({
                displayname: learnerData.User.displayname,
                email: learnerData.User.email,
                dateofbirth: learnerData.User.dateofbirth,
                address: learnerData.User.address,
            });
        }
    }, [learnerData]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        setEditing(false);
        // Thêm logic cập nhật thông tin user ở đây
    };

    const handleCancel = () => {
        // Reset lại thông tin khi hủy
        if (learnerData?.User) {
            setUserInfo({
                displayname: learnerData.User.displayname,
                email: learnerData.User.email,
                dateofbirth: learnerData.User.dateofbirth,
                address: learnerData.User.address,
            });
        }
        setEditing(false);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography color="error">Có lỗi xảy ra khi tải thông tin người dùng</Typography>
            </Box>
        );
    }

    const user = learnerData?.User;

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            {/* Sidebar */}
            <Paper sx={{ width: 300, p: 2, m: 2, height: 'fit-content' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Avatar
                        src={user?.avatar}
                        sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h6">{user?.displayname}</Typography>
                    <Typography color="textSecondary">{user?.email}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Tabs
                    orientation="vertical"
                    value={selectedTab}
                    onChange={handleTabChange}
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Thông tin cá nhân" />
                    <Tab label="Giảng viên theo dõi" />
                    <Tab label="Cài đặt tài khoản" />
                </Tabs>
            </Paper>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
                {selectedTab === 0 && (
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h5">Thông tin cá nhân</Typography>
                            {!editing ? (
                                <Button variant="contained" onClick={() => setEditing(true)}>
                                    Chỉnh sửa
                                </Button>
                            ) : (
                                <Box>
                                    <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
                                        Lưu
                                    </Button>
                                    <Button variant="outlined" onClick={handleCancel}>
                                        Hủy
                                    </Button>
                                </Box>
                            )}
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                {editing ? (
                                    <TextField
                                        fullWidth
                                        label="Họ và tên"
                                        name="displayname"
                                        value={userInfo.displayname || ''}
                                        onChange={handleUserInfoChange}
                                    />
                                ) : (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            Họ và tên
                                        </Typography>
                                        <Typography variant="body1">
                                            {user?.displayname || 'Chưa cập nhật'}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {editing ? (
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        value={userInfo.email || ''}
                                        onChange={handleUserInfoChange}
                                    />
                                ) : (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            Email
                                        </Typography>
                                        <Typography variant="body1">
                                            {user?.email || 'Chưa cập nhật'}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {editing ? (
                                    <TextField
                                        fullWidth
                                        label="Ngày sinh"
                                        name="dateofbirth"
                                        type="date"
                                        value={userInfo.dateofbirth || ''}
                                        onChange={handleUserInfoChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                ) : (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            Ngày sinh
                                        </Typography>
                                        <Typography variant="body1">
                                            {user?.dateofbirth ? new Date(user.dateofbirth).toLocaleDateString() : 'Chưa cập nhật'}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {editing ? (
                                    <TextField
                                        fullWidth
                                        label="Địa chỉ"
                                        name="address"
                                        value={userInfo.address || ''}
                                        onChange={handleUserInfoChange}
                                    />
                                ) : (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            Địa chỉ
                                        </Typography>
                                        <Typography variant="body1">
                                            {user?.address || 'Chưa cập nhật'}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                )}

                {selectedTab === 1 && (
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" sx={{ mb: 3 }}>Giảng viên theo dõi</Typography>
                        <List>
                            {learnerData?.LearningHistory?.map((history, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <ListItemText
                                            primary={history.Course.title}
                                            secondary={`Thời gian: ${new Date(history.createdAt).toLocaleDateString()}`}
                                        />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                )}

                {selectedTab === 2 && (
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" sx={{ mb: 3 }}>Cài đặt tài khoản</Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ mr: 2 }} 
                            onClick={() => navigate('/resetpassword')}  
                        >
                            Đổi mật khẩu
                        </Button>
                        <Button variant="outlined" color="error"
                        onClick={() => navigate('/')}  >
                            Đăng xuất
                        </Button>
                    </Paper>
                )}
            </Box>
        </Box>
    );
};

export default ProfileLearner;
