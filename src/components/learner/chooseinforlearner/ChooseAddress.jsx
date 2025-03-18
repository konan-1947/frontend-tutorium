import React,{ useState, useEffect } from 'react';
import { MenuItem, Select,TextField ,Button,Box} from '@mui/material';
import '../../../../src/assets/css/ChooseAddress.css';
import Gif from '../../../../src/assets/img/output-onlinegiftools.gif';
const Step2 = ({ formData, setFormData, prevStep, nextStep }) => {
    const [address, setAddress] = useState('');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    useEffect(() => {
        // Lấy dữ liệu đã lưu từ localStorage
        const savedData = JSON.parse(localStorage.getItem('chooseCustomData'));
        if (savedData) {
            setAddress(savedData.address);
        }
    }, []);
    const handleSelect = (e) => {
        e.preventDefault();
    }
    return (
            <form onSubmit={handleSelect}>
                <div className="step-section2">
                    <div className="div-color">
                        <img src={Gif} alt="Gif" />
                    </div>
                    <div className="form-section2">

                        <p className="subheading">Nhập địa chỉ của bạn:</p>

                        {/* Address Section */}
                        <div className="section2">
                            <TextField
                                name="address"
                                value={address}
                                onChange={(e) => { setAddress(e.target.value), handleInputChange }}
                              
                                placeholder="Nhập địa chỉ của bạn"
                            />
                        </div>

                        <div className="navigation-buttons2">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={prevStep}
                            >
                                Quay lại
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={nextStep}
                            >
                                Tiếp theo
                            </Button>
                        </div>
                    </div>

                    
                </div>
            </form>
       
    );
};

export default Step2;
