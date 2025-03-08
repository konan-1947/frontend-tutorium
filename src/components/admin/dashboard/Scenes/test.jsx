import React, { useEffect , useState} from 'react';
import getTutorList from '../../../../hooks/admin/getTutorList'
const TutorList = () => {

  const [tutorData, setTutorData] = useState(null);

  // Hàm để lấy dữ liệu trước khi render
  const fetchData = async () => {
    try {
      const data = await getTutorList();
      setTutorData(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu giảng viên: ", error);
    }
  };

  // Dùng useEffect để gọi fetchData khi component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Hiển thị loading khi dữ liệu chưa có
  if (!tutorData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {tutorData.data && tutorData.data.length > 0 ? (
        tutorData.data.map((tutor) => (
          <div key={tutor.userid} style={{ marginBottom: '20px' }}>
            <h3>{tutor.User.displayname}</h3>
            <p><strong>Chuyên môn:</strong> {tutor.description}</p>
            <p><strong>Địa chỉ:</strong> {tutor.User.address}</p>
            <p><strong>Email:</strong> {tutor.User.email}</p>
            <p><strong>Ngày sinh:</strong> {new Date(tutor.User.dateofbirth).toLocaleDateString()}</p>
            <p><strong>Mức lương mong muốn:</strong> {tutor.expectedsalary} triệu đồng</p>
            <p><strong>Video mô tả:</strong> <a href={tutor.descriptionvideolink} target="_blank" rel="noopener noreferrer">Xem Video</a></p>
            <p><strong>Social Credit:</strong> {tutor.socialcredit}</p>
          </div>
        ))
      ) : (
        <p>No tutors available</p>
      )}
    </div>
  );
};

export default TutorList;
