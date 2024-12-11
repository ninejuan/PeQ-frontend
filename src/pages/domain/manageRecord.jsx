import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import { Properties } from "../../constants/Properties";
import Cookies from "js-cookie";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 40px 20px;
  background-color: ${Colors.BACKGROUND};
  color: ${Colors.TEXT};
`;

const Card = styled.div`
  background-color: ${Colors.BACKGROUND_SECONDARY};
  border-radius: 12px;
  padding: 32px;
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 32px;
  color: ${Colors.TEXT};
`;

const RecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RecordItem = styled.div`
  background-color: ${Colors.BACKGROUND_THIRD};
  border-radius: 8px;
  padding: 16px;
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  align-items: center;
  gap: 16px;
`;

const RecordType = styled.span`
  font-weight: bold;
  color: ${Colors.PRIMARY};
`;

const RecordValue = styled.span`
  color: ${Colors.TEXT_SECONDARY};
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${(props) =>
    props.variant === "delete" ? "#ff6b6b" : Colors.PRIMARY};
  color: ${Colors.TEXT};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const AddRecordForm = styled.form`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 16px;
  margin-bottom: 32px;
  align-items: start;
`;

const Select = styled.select`
  padding: 8px 12px;
  background-color: ${Colors.BACKGROUND_THIRD};
  border: 1px solid ${Colors.BORDER};
  border-radius: 4px;
  color: ${Colors.TEXT};
`;

const Input = styled.input`
  padding: 8px 12px;
  background-color: ${Colors.BACKGROUND_THIRD};
  border: 1px solid ${Colors.BORDER};
  border-radius: 4px;
  color: ${Colors.TEXT};
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin: 16px 0;
`;

const EditButton = styled(Button)`
  background-color: ${Colors.BACKGROUND_FOURTH};
  margin-right: 8px;
`;

const EditForm = styled.form`
  display: grid;
  grid-template-columns: 100px 1fr auto auto;
  gap: 16px;
  align-items: center;
  background-color: ${Colors.BACKGROUND_FOURTH};
  padding: 16px;
  border-radius: 8px;
  margin-top: 8px;
`;

const ManageRecord = () => {
  const { domain } = useParams();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [newRecord, setNewRecord] = useState({
    type: "A",
    value: "",
  });
  const [editingRecord, setEditingRecord] = useState(null);
  const [editForm, setEditForm] = useState({
    type: "",
    value: "",
  });

  const fetchRecords = async () => {
    try {
      const response = await fetch(
        `${Properties.API_URL}/domain/records/${domain}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          credentials: "include",
        }
      );

      if (response.status === 401) {
        setIsAuthenticated(false);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch records");
      }

      const data = await response.json();
      setRecords(data);
    } catch (err) {
      setError("레코드를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!domain) {
      setError("도메인 정보가 없습니다.");
      return;
    }
    fetchRecords();
  }, [domain]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Properties.API_URL}/domain/record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify({
          name: domain,
          type: newRecord.type,
          target: newRecord.value,
          proxied: true,
          ttl: 3600,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("레코드 생성에 실패했습니다.");
      }

      fetchRecords();
      setNewRecord({ type: "A", value: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (record_name, record_type) => {
    try {
      const response = await fetch(`${Properties.API_URL}/domain/record`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify({ name: record_name, type: record_type }),
        credentials: "include",
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("레코드 삭제에 실패했습니다.");
      }

      fetchRecords();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Properties.API_URL}/domain/record`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify({
          name: domain,
          old_type: editingRecord.record_type,
          type: editForm.type,
          target: editForm.value,
          proxied: true,
          ttl: 3600,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("레코드 수정에 실패했습니다.");
      }

      setEditingRecord(null);
      fetchRecords();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEditing = (record) => {
    setEditingRecord(record);
    setEditForm({
      type: record.record_type,
      value: record.record_value,
    });
  };

  const cancelEditing = () => {
    setEditingRecord(null);
    setEditForm({ type: "", value: "" });
  };

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (loading) {
    return (
      <Container>
        <Card>
          <div>Loading...</div>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Title>{domain}.peq.us 레코드 관리</Title>
        <AddRecordForm onSubmit={handleSubmit}>
          <Select
            value={newRecord.type}
            onChange={(e) =>
              setNewRecord({ ...newRecord, type: e.target.value })
            }
          >
            <option value="A">A</option>
            <option value="AAAA">AAAA</option>
            <option value="CNAME">CNAME</option>
            {/* <option value="MX">MX</option> */}
            <option value="TXT">TXT</option>
          </Select>
          <Input
            placeholder="레코드 값 입력"
            value={newRecord.value}
            onChange={(e) =>
              setNewRecord({ ...newRecord, value: e.target.value })
            }
          />
          <Button type="submit">추가</Button>
        </AddRecordForm>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <RecordList>
          {records.map((record, index) => (
            <React.Fragment key={index}>
              <RecordItem>
                <RecordType>{record.record_type}</RecordType>
                <RecordValue>{record.record_value}</RecordValue>
                <div>
                  <EditButton
                    type="button"
                    onClick={() => startEditing(record)}
                    disabled={editingRecord !== null}
                  >
                    수정
                  </EditButton>
                  <Button
                    variant="delete"
                    onClick={() => {
                      handleDelete(record.record_name, record.record_type);
                    }}
                    disabled={editingRecord !== null}
                  >
                    삭제
                  </Button>
                </div>
              </RecordItem>
              {editingRecord?.record_name === record.record_name && (
                <EditForm onSubmit={handleEdit}>
                  <Select
                    value={editForm.type}
                    onChange={(e) =>
                      setEditForm({ ...editForm, type: e.target.value })
                    }
                  >
                    <option value="A">A</option>
                    <option value="AAAA">AAAA</option>
                    <option value="CNAME">CNAME</option>
                    <option value="TXT">TXT</option>
                  </Select>
                  <Input
                    value={editForm.value}
                    onChange={(e) =>
                      setEditForm({ ...editForm, value: e.target.value })
                    }
                    placeholder="레코드 값 입력"
                  />
                  <Button type="submit">저장</Button>
                  <Button type="button" onClick={cancelEditing}>
                    취소
                  </Button>
                </EditForm>
              )}
            </React.Fragment>
          ))}
          {records.length === 0 && (
            <RecordItem>
              <RecordValue
                style={{ gridColumn: "1 / -1", textAlign: "center" }}
              >
                등록된 레코드가 없습니다.
              </RecordValue>
            </RecordItem>
          )}
        </RecordList>
      </Card>
    </Container>
  );
};

export default ManageRecord;
