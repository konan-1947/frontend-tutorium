import React, { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Divider, Avatar, Button } from '@mui/material';
import { useGetListFollower } from '../../../hooks/tutor/getListFollower';
import { Navigate, useNavigate } from 'react-router-dom';
import { useGetTutorDetail } from "../../../hooks/tutor/getTutorDetail";
const FollowedTutorsList = () => {
    const { mutate: getListFollower, data: ListFollower, isPending, isError, error } = useGetListFollower();
    const { mutate: getTutorDetail, data: tutordata } = useGetTutorDetail();
    const navigate = useNavigate();

    useEffect(() => {
        getTutorDetail(); // Gọi API mà không cần truyền learnerId
    }, [getTutorDetail]);
    const username = tutordata?.data?.User?.username;
    useEffect(() => {
        getListFollower(username);
    }, [username, getListFollower]);
    
    console.log(ListFollower);
  
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
            {ListFollower?.data?.length > 0 ? ( // Truy cập tutorData.data thay vì tutorData.followedTutors
                <List>
                    {ListFollower.data.map((tutor, index) => (
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
                <Typography color="textSecondary">Chưa có gia sư nào theo dõi bạn.</Typography>
            )}
        </Box>
    );
};

export default FollowedTutorsList;