import React, { useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetActiveContracts } from "../../../hooks/learner/getListActive";
import { useCompletedContractByLearner } from "../../../hooks/learner/completedContractByLearner";

const ActiveContractsList = () => {
  // Sử dụng hook để lấy danh sách contract active (useQuery)
  const { data: contracts = [], isLoading, error,mutate: refetch } = useGetActiveContracts();

  // Sử dụng hook để hoàn thành contract (useMutation)
  const { mutate: completeContract } = useCompletedContractByLearner({
    onSuccess: () => {
     window.location.reload();
      alert("Contract đã được hoàn thành!");
    },
    onError: (error) => {
      alert("Hoàn thành contract thất bại: " + error.message);
    },
  });

  // Tự động làm mới dữ liệu khi component mount (nếu cần)
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Hàm xử lý khi nhấn nút Completed
 
   
 

  // So sánh timeend với thời gian hiện tại
  const isContractExpired = (timeend) => {
    const now = new Date();
    const endDate = new Date(timeend);
    return endDate > now;
  };

  // Debug dữ liệu
  console.log("Contracts:", contracts);

  if (isLoading) {
    return <div className="text-center mt-5 text-primary">Đang tải danh sách contract...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger fw-bold">Lỗi tải dữ liệu: {error.message}</div>;
  }

  return (
    <Container className="my-5" style={{ maxWidth: "1000px" }}>
      <h2 className="text-center mb-4 text-primary fw-bold">Danh sách hợp đồng đang hoạt động</h2>
      <Table striped bordered hover responsive>
        <thead className="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Mục tiêu</th>
            <th>Thời gian bắt đầu</th>
            <th>Thời gian kết thúc</th>
            <th>Trạng thái</th>
          
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => {
            const expired = isContractExpired(contract.timeend);
            return (
              <tr key={contract.contractid}>
                <td>{contract.contractid}</td>
                <td>{contract.target}</td>
                <td>{new Date(contract.timestart).toLocaleDateString("vi-VN")}</td>
                <td>{new Date(contract.timeend).toLocaleDateString("vi-VN")}</td>
                <td>{contract.status}</td>
             
                <td>
                  <Button
                    onClick={() =>  completeContract(contract.contractid) }
                    disabled={expired}
                    style={{
                      background: expired
                        ? "linear-gradient(90deg, #dc3545, #ff6b6b)" // Màu đỏ khi hết hạn
                        : "linear-gradient(90deg, #28a745, #4cd964)", // Màu xanh khi còn hạn
                      border: "none",
                    }}
                  >
                    {expired ? "Chưa đến hạn" : "Hoàn thành"}
                  </Button>
                </td>
              </tr>
            );
          })}
          {contracts.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                Không có contract active nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ActiveContractsList;