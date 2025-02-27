import React, { useState } from 'react';
import { Box, MenuItem, Select, Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const TutorListing = () => {
    const [filters, setFilters] = useState({
        learn: '',
        price: '',
        country: '',
        availability: '',
        sortBy: '',
        search: ''
    });

    // Xử lý thay đổi giá trị filter
    const handleFilterChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.value });
    };

    return (
        
        <Box 
            sx={{ 
                marginTop: 4,
                width: '90%', 
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
            {/* Hàng đầu tiên: Các bộ lọc */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <Select sx={{ flex: 1 }} displayEmpty value={filters.learn} name="learn" onChange={handleFilterChange}>
                    <MenuItem value="" disabled>Lĩnh vực</MenuItem>
                    <MenuItem value="english">Tiếng Anh</MenuItem>
                    <MenuItem value="spanish">Toán</MenuItem>
                </Select>

                <Select sx={{ flex: 1 }} displayEmpty value={filters.price} name="price" onChange={handleFilterChange}>
                    <MenuItem value="" disabled>Giá cả</MenuItem>
                    <MenuItem value="low">$3 - $10</MenuItem>
                    <MenuItem value="medium">$10 - $20</MenuItem>
                </Select>

                <Select sx={{ flex: 1 }} displayEmpty value={filters.country} name="country" onChange={handleFilterChange}>
                    <MenuItem value="" disabled>Country of birth</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                    <MenuItem value="uk">UK</MenuItem>
                </Select>

                <Select sx={{ flex: 1 }} displayEmpty value={filters.availability} name="availability" onChange={handleFilterChange}>
                    <MenuItem value="" disabled>I'm available</MenuItem>
                    <MenuItem value="morning">Morning</MenuItem>
                    <MenuItem value="evening">Evening</MenuItem>
                </Select>
            </Box>

            {/* Hàng thứ hai: Sort và Search */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                <Select sx={{ flex: 1 }} displayEmpty value={filters.sortBy} name="sortBy" onChange={handleFilterChange}>
                    <MenuItem value="" disabled>Sort by: Our top picks</MenuItem>
                    <MenuItem value="low-high">Price: Low to High</MenuItem>
                    <MenuItem value="high-low">Price: High to Low</MenuItem>
                </Select>

                <TextField 
                    sx={{ flex: 2 }} 
                    placeholder="Tìm kiếm" 
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Box>
    );
};

export default TutorListing;
