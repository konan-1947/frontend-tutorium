import { Box, Button, Typography, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../Header";
import { useGetTutorDetail } from "../../../../hooks/admin/getTutorDetail;";
import { useVerifyTutor } from "../../../../hooks/admin/verifyTutor"; // Hook giả định
// import { useRejectTutor } from "../../../../hooks/admin/useRejectTutor"; // Hook giả định
import { useNavigate, useParams } from "react-router-dom"; // Để điều hướng sau khi xử lý
import { use } from "react";

const TutorDetail = () => {
    const {userid} = useParams();
  const { mutate: getTutorDetail, data: tutorDetail, isLoading, error: fetchError } = useGetTutorDetail();
  const { mutate: verifyTutor } = useVerifyTutor();
//   const { mutate: rejectTutor } = useRejectTutor();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  // Lấy dữ liệu gia sư khi component mount
  useEffect(() => {
    getTutorDetail(userid);
  }, [getTutorDetail]);
console.log(tutorDetail);
  // Xử lý xác minh gia sư
  const handleVerify = () => {
    if (window.confirm("Bạn có chắc chắn muốn xác minh gia sư này?")) {
      verifyTutor(userid, {
        onSuccess: () => {
            alert("Đã gửi thông báo tới gia sư");
        },
        onError: (error) => {
          setAlertMessage("Xác minh thất bại: " + error.message);
          setAlertType("error");
        },
      });
    }
  };

  // Xử lý từ chối gia sư
//   const handleReject = () => {
//     if (window.confirm("Bạn có chắc chắn muốn từ chối gia sư này?")) {
//       rejectTutor(tutorDetail.data.userid, {
//         onSuccess: () => {
//           setAlertMessage("Gia sư đã bị từ chối thành công!");
//           setAlertType("success");
//           setTimeout(() => navigate("/admin/tutors"), 2000); // Quay lại danh sách sau 2 giây
//         },
//         onError: (error) => {
//           setAlertMessage("Từ chối thất bại: " + error.message);
//           setAlertType("error");
//         },
//       });
//     }
//   };

  if (isLoading) {
    return <Box m="20px">Đang tải dữ liệu...</Box>;
  }

  if (fetchError) {
    return <Box m="20px">Lỗi khi tải dữ liệu: {fetchError.message}</Box>;
  }

  if (!tutorDetail || !tutorDetail.data) {
    return <Box m="20px">Không có dữ liệu gia sư.</Box>;
  }

  const tutor = tutorDetail.data.User || tutorDetail.data; // Linh hoạt với cấu trúc dữ liệu

  return (
    <Box m="20px">
      <Header title="CHI TIẾT GIA SƯ" subtitle="Thông tin chi tiết của gia sư" />

      <Box display="grid" gap="20px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
       
        <Typography variant="h6" sx={{ gridColumn: "span 4" }}>
          <strong>Tên:</strong> {tutor.displayname || "Không có tên"}
        </Typography>
        <Typography variant="h6" sx={{ gridColumn: "span 4" }}>
          <strong>Địa chỉ:</strong> {tutor.address || "Không có địa chỉ"}
        </Typography>
        <Typography variant="h6" sx={{ gridColumn: "span 4" }}>
          <strong>Email:</strong> {tutor.email || "Không có email"}
        </Typography>
        <Typography variant="h6" sx={{ gridColumn: "span 4" }}>
          <strong>Ngày sinh:</strong>{" "}
          {tutor.dateofbirth
            ? new Date(tutor.dateofbirth).toLocaleDateString("vi-VN")
            : "Không có ngày sinh"}
        </Typography>
        <Typography variant="h6" sx={{ gridColumn: "span 4" }}>
          <strong>Mô tả:</strong> {tutor.description || "Không có mô tả"}
        </Typography>
        <Typography variant="h6" sx={{ gridColumn: "span 4" }}>
          <strong>Link video mô tả:</strong>{" "}
          {tutor.descriptionvideolink ? (
            <a href={tutor.descriptionvideolink} target="_blank" rel="noopener noreferrer">
              {tutor.descriptionvideolink}
            </a>
          ) : (
            "Không có link video"
          )}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="end" mt="20px" gap="10px">
        {alertMessage && (
          <Alert severity={alertType} sx={{ width: "100%", mr: 2 }}>
            {alertMessage}
          </Alert>
        )}
        <Button
          variant="contained"
          color="success"
          onClick={handleVerify}
          disabled={isLoading}
        >
          Xác minh
        </Button>
        <Button
          variant="contained"
          color="error"
        //   onClick={handleReject}
          disabled={isLoading}
        >
          Từ chối
        </Button>
      </Box>
    </Box>
  );
};

export default TutorDetail;