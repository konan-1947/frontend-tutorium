import React, { useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { UseGetListCompletedContract } from "../../../hooks/tutor/getListCompleted"; // Hook mới để lấy danh sách completed contracts
import { useDoneContractByTutor } from "../../../hooks/tutor/usedoneContractByTutor";

const ListCompletedContracts = () => {
  // Sử dụng hook để lấy danh sách contract đã hoàn thành (useQuery)
  const { data: contracts = [], isLoading, error,mutate: refetch } = UseGetListCompletedContract();

  const { mutate: markDone } = useDoneContractByTutor({
    onSuccess: () => {
      refetch(); // Tải lại danh sách contract sau khi đánh dấu
      alert("Contract đã được đánh dấu Done!");
    },
    onError: (error) => {
      alert("Đánh dấu contract thất bại: " + error.message);
    },
  });

  // Tự động làm mới dữ liệu khi component mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Hàm xử lý khi nhấn nút Done
  const handleDone = (contractId) => {
    markDone(contractId);
  };

  // Debug dữ liệu
  console.log("Completed Contracts:", contracts);

  if (isLoading) {
    return <div className="text-center mt-5 text-primary">Đang tải danh sách contract...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger fw-bold">Lỗi tải dữ liệu: {error.message}</div>;
  }

  return (
    <Container className="my-5" style={{ maxWidth: "1000px" }}>
      <h2 className="text-center mb-4 text-primary fw-bold">Danh sách hợp đồng đã hoàn thành</h2>
      <Table striped bordered hover responsive>
        <thead className="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Mục tiêu</th>
            <th>Thời gian bắt đầu</th>
            <th>Thời gian kết thúc</th>
            <th>Trạng thái</th>
            <th>Tên gia sư</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.contractid}>
              <td>{contract.contractid}</td>
              <td>{contract.target}</td>
              <td>{new Date(contract.timestart).toLocaleDateString("vi-VN")}</td>
              <td>{new Date(contract.timeend).toLocaleDateString("vi-VN")}</td>
              <td>{contract.status}</td>
              <td>{contract.tutorname}</td>
              <td>
                <Button
                  onClick={() => {markDone(contract.contractid),window.location.reload();}}
                  style={{
                    background: "linear-gradient(90deg, #007bff, #00c4ff)", // Màu xanh dương cho nút Done
                    border: "none",
                  }}
                >
                  Done
                </Button>
              </td>
            </tr>
          ))}
          {contracts.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                Không có contract đã hoàn thành nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListCompletedContracts;