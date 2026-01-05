import React, { useState } from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Select,
  Button,
  Modal,
  Form,
  Input,
  Spin,
} from "antd";
import {
  useGetAllAppliance,
  usePostAppliance,
  useUpdateAppliance,
} from "../../hooks/api/useJob";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const JobModal = ({ open, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  // set initial values saat modal dibuka
  React.useEffect(() => {
    form.setFieldsValue(initialValues || {});
  }, [initialValues, form]);

  const handleOk = async () => {
    const values = await form.validateFields();
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Edit Lamaran" : "Tambah Lamaran"}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Save"
      destroyOnClose
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Company"
          name="company"
          rules={[{ required: true, message: "Company is required" }]}
        >
          <Input placeholder="Google" />
        </Form.Item>

        <Form.Item
          label="Position"
          name="position"
          rules={[{ required: true, message: "Position is required" }]}
        >
          <Input placeholder="Frontend Developer" />
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select placeholder="Select status">
            <Option value="applied">Applied</Option>
            <Option value="interview">Interview</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Job Type" name="typeJob" rules={[{ required: true }]}>
          <Select placeholder="Select job type">
            <Option value="full-time">Full Time</Option>
            <Option value="part-time">Part Time</Option>
            <Option value="freelance">Freelance</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select location">
            <Option value="wfh">WFH</Option>
            <Option value="onsite">Onsite</Option>
            <Option value="hybrid">Hybrid</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Note" name="note">
          <Input.TextArea rows={3} placeholder="Apply via LinkedIn" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default function HomePage() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [open, setOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const { data: jobs, isLoading, isError } = useGetAllAppliance();
  const postJob = usePostAppliance();
  const updateJob = useUpdateAppliance();

  const handleSubmit = (data) => {
    if (editingJob) {
      updateJob.mutate({ jobId: editingJob._id, jobData: data });
    } else {
      postJob.mutate(data);
    }
    setOpen(false);
    setEditingJob(null);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setOpen(true);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={Array.from({ length: 3 }).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>

      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
        />

        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <JobModal
            open={open}
            onCancel={() => {
              setOpen(false);
              setEditingJob(null);
            }}
            onSubmit={handleSubmit}
            initialValues={editingJob}
          />

          <Button type="primary" onClick={() => setOpen(true)}>
            Tambah Lamaran
          </Button>

          <div style={{ marginTop: 20 }}>
            {isLoading && <Spin />}
            {isError && <p style={{ color: "red" }}>Failed to load data!</p>}
            {jobs &&
              jobs.map((job) => (
                <div
                  key={job._id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 10,
                  }}
                >
                  <p>
                    <strong>Company:</strong> {job.company}
                  </p>
                  <p>
                    <strong>Position:</strong> {job.position}
                  </p>
                  <p>
                    <strong>Status:</strong> {job.status}
                  </p>
                  <p>
                    <strong>Type Job:</strong> {job.typeJob}
                  </p>
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Note:</strong> {job.note}
                  </p>
                  <Button type="link" onClick={() => handleEdit(job)}>
                    Edit
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        <a href="http://" style={{ fontWeight: "bold", color: "black" }}>
          Wira
        </a>{" "}
        Ananda ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}
