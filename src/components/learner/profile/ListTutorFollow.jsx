import React, { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Divider, Avatar, Button } from '@mui/material';
import { useGetListTutorFollow } from '../../../hooks/learner/getListTutorFollow';
import { Navigate, useNavigate } from 'react-router-dom';

const FollowedTutorsList = () => {
    const { mutate: getListTutorFollow, data: tutorData, isPending, isError, error } = useGetListTutorFollow();
    const navigate = useNavigate();

    useEffect(() => {
        getListTutorFollow(); // Gọi API mà không cần truyền learnerId
    }, [getListTutorFollow]);

    const handleViewSchedule = (username) => {
        navigate(`/calendar/${username}`); // Điều hướng đến trang lịch của gia sư
    };

    if (isPending) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
                <Typography color="textSecondary">Đang tải danh sách gia sư...</Typography>
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
                <Typography color="error">Lỗi: {error.message}</Typography>
            </Box>
        );
    }


    return (
        <Box>
            {tutorData?.data?.length > 0 ? ( // Truy cập tutorData.data thay vì tutorData.followedTutors
                <List>
                    {tutorData.data.map((tutor, index) => (
                        <React.Fragment key={index}>
                            <ListItem
                                sx={{
                                    borderRadius: 2,
                                    mb: 1,
                                    boxShadow: 1,
                                    transition: 'transform 0.2s ease',
                                    '&:hover': {
                                        transform: 'scale(1.01)',
                                        boxShadow: 3,
                                        backgroundColor: '#f8f9fa',
                                    },
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar src={tutor.imgurl} sx={{ border: '2px solid #007bff' }} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={tutor.displayname}
                                
                                />
                             
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            ) : (
                <Typography color="textSecondary">Bạn chưa theo dõi gia sư nào.</Typography>
            )}
        </Box>
    );
};

export default FollowedTutorsList;