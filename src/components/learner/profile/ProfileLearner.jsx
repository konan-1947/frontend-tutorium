import React, { useState, useEffect } from 'react';
import { Box, Typography, Tab, Tabs, Avatar, Divider, Paper, TextField, Button, Grid, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useGetLearnerDetail } from '../../../hooks/learner/getLearnerDetail';
import { useNavigate } from 'react-router-dom';
import { useUpdateLearner } from '../../../hooks/learner/updateLearner';
import { useGetCategories } from '../../../hooks/category/getCategories';
import FollowedTutorsList from './ListTutorFollow';
import useGetListAllContracts from '../../../hooks/learner/getListAllContracts';
import ListAllContract from './ListAllContract';
import { useDeleteAccount } from '../../../hooks/learner/deleteAccount';
import ListContractActive from './ListContractActive';
const ProfileLearner = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [editing, setEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const { mutate: getLearnerDetail, data: learnerData, isPending: isLoading, error } = useGetLearnerDetail();
    const { mutate: updateLearner } = useUpdateLearner();
    const { mutate: getCategories, data: categories } = useGetCategories();
    const navigate = useNavigate();

    useEffect(() => {
        getLearnerDetail(); // Gọi API để lấy thông tin người học
        getCategories();
    }, [getLearnerDetail, getCategories]);
    console.log(learnerData);
    useEffect(() => {
        if (learnerData?.User) {
            setUserInfo({

                displayname: learnerData.User.displayname,
                imgurl: learnerData.User.imgurl,
                dateofbirth: learnerData.User.dateofbirth,
                address: learnerData.User.address,
                learninggoal: learnerData.learninggoal,
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
    const { mutate: deleteAccount,isError } = useDeleteAccount();
    const handleDelete = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!")) {
            deleteAccount(null, {
            onSuccess: () => {
                alert("Tài khoản đã được xóa thành công.");
                navigate('/');
            },
            onError: (err) => {
                console.error("Delete error:", err);
                const errorMessage = err?.response?.data?.message || "Xóa tài khoản thất bại, vui lòng thử lại!";
                alert(errorMessage);
            },
            });
        }
    };
    const handleSave = () => {
        updateLearner(userInfo, {
            onSuccess: () => {
                setEditing(false);
                getLearnerDetail(); // Cập nhật lại thông tin sau khi lưu
            },
            onError: (err) => {
                console.error("Update error:", err);
                alert("Cập nhật thông tin thất bại, vui lòng thử lại!");
            },
        });
    };

    const handleCancel = () => {
        if (learnerData?.User) {
            setUserInfo({

                displayname: learnerData.User.displayname,
                imgurl: learnerData.User.imgurl,
                dateofbirth: learnerData.User.dateofbirth,
                address: learnerData.User.address,
                learninggoal: learnerData.learninggoal,
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
            <Paper sx={{ width: 300, p: 2, m: 2, height: 'fit-content', boxShadow: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Avatar
                        src={user?.imgurl}
                        sx={{ width: 100, height: 100, mb: 2, border: '2px solid #007bff' }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>{user?.displayname}</Typography>
                    <Typography color="textSecondary">{user?.username}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Tabs
                    orientation="vertical"
                    value={selectedTab}
                    onChange={handleTabChange}
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Thông tin cá nhân" sx={{ fontWeight: selectedTab === 0 ? 'bold' : 'normal', color: selectedTab === 0 ? '#007bff' : 'inherit' }} />
                    <Tab label="Giảng viên theo dõi" sx={{ fontWeight: selectedTab === 1 ? 'bold' : 'normal', color: selectedTab === 1 ? '#007bff' : 'inherit' }} />
                    <Tab label="Lịch sử đăng ký" sx={{ fontWeight: selectedTab === 2 ? 'bold' : 'normal', color: selectedTab === 2 ? '#007bff' : 'inherit' }} />
                    <Tab label="Lịch học chính thức" sx={{ fontWeight: selectedTab === 3 ? 'bold' : 'normal', color: selectedTab === 3 ? '#007bff' : 'inherit' }} />
                    <Tab label="Cài đặt tài khoản" sx={{ fontWeight: selectedTab === 4 ? 'bold' : 'normal', color: selectedTab === 4 ? '#007bff' : 'inherit' }} />

                </Tabs>
            </Paper>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
                {selectedTab === 0 && (
                    <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#007bff' }}>Thông tin cá nhân</Typography>
                            {!editing ? (
                                <Button
                                    variant="contained"
                                    onClick={() => setEditing(true)}
                                    sx={{ background: 'linear-gradient(90deg, #007bff, #00c4ff)', color: '#fff' }}
                                >
                                    Chỉnh sửa
                                </Button>
                            ) : (
                                <Box>
                                    <Button
                                        variant="contained"
                                        onClick={handleSave}
                                        sx={{ mr: 1, background: 'linear-gradient(90deg, #007bff, #00c4ff)', color: '#fff' }}
                                    >
                                        Lưu
                                    </Button>
                                    <Button variant="outlined" onClick={handleCancel} sx={{ borderColor: '#007bff', color: '#007bff' }}>
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
                                        label="URL ảnh đại diện"
                                        name="imgurl"
                                        value={userInfo.imgurl || ''}
                                        onChange={handleUserInfoChange}
                                    />
                                ) : (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            URL ảnh đại diện
                                        </Typography>
                                        <Typography variant="body1">
                                            {user?.imgurl ? <a href={user.imgurl} target="_blank" rel="noopener noreferrer">Xem ảnh</a> : 'Chưa cập nhật'}
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
                                        InputLabelProps={{ shrink: true }}
                                    />
                                ) : (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            Ngày sinh
                                        </Typography>
                                        <Typography variant="body1">
                                            {user?.dateofbirth ? new Date(user.dateofbirth).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
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
                            <Grid item xs={12} md={6}>
                                {editing ? (
                                    <TextField
                                        fullWidth
                                        label="Mục tiêu học tập"
                                        name="learninggoal"
                                        value={userInfo.learninggoal || ''}
                                        onChange={handleUserInfoChange}
                                        multiline
                                        rows={4}
                                    />
                                ) : (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            Mục tiêu học tập
                                        </Typography>
                                        <Typography variant="body1">
                                            {learnerData?.learninggoal || 'Chưa cập nhật'}
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                )}

                {selectedTab === 1 && (
                    <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#007bff' }}>
                            Giảng viên theo dõi
                        </Typography>
                        <FollowedTutorsList />
                    </Paper>
                )}
                {selectedTab === 2 && (
                    <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#007bff' }}>
                            Lịch học đã đăng ký
                        </Typography>
                        <ListAllContract />
                    </Paper>
                )}

                {selectedTab === 4 && (
                    <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#007bff' }}>Cài đặt tài khoản</Typography>
                        <Button
                            variant="contained"
                            sx={{ mr: 2, background: 'linear-gradient(90deg, #007bff, #00c4ff)', color: '#fff' }}
                            onClick={() => navigate('/resetpassword')}
                        >
                            Đổi mật khẩu
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => navigate('/')}
                        >
                            Đăng xuất
                        </Button>
                        <Button
                            style={{ backgroundColor: '#ff3e3e', color: 'white',marginLeft: '15px' }}
                            variant="outlined"
                            color="error"
                         
                            onClick={() => handleDelete()}
                        >
                            Xoá tài khoản
                        </Button>
                    </Paper>
                )}
                    {selectedTab === 3 && (
                    <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#007bff' }}>Lịch học chính thức</Typography>
                        <ListContractActive/>
                    </Paper>
                )}
            </Box>
        </Box>
    );
};

export default ProfileLearner;