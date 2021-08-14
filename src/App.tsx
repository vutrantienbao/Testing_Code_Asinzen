import React, { useState } from "react";
import {
  Table,
  Tag,
  Space,
  Modal,
  Button,
  Select,
  Checkbox,
  Input,
} from "antd";
import "antd/dist/antd.css";

interface Object {
  key: string;
  google: string;
  sheet: number;
  export: string;
}

type Data = Array<{
  google: string;
  sheet: number;
  export: string;
}>;

const objectInsert: Object = {} as any;

const columns = [
  {
    title: "Google spreadsheet",
    dataIndex: "google",
    key: "google",
  },
  {
    title: "Google sheet",
    dataIndex: "sheet",
    key: "sheet",
  },
  {
    title: "Export Profile",
    dataIndex: "export",
    key: "export",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const { Option } = Select;

function App() {
  const [data, setData] = useState<Data>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stateFrom, setStateFrom] = useState<string>("");
  const [stateTo, setStateTo] = useState<string>("");
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const showModal = (): void => {
    setIsModalVisible(true);
  };
  const handleSave = (): void => {
    /* console.log(objectInsert); */
    //Check tick box
    checkBox
      ? stateFrom === "" && stateTo === ""
        ? console.log("fail")
        : (objectInsert.export = stateFrom + ":" + stateTo)
      : console.log("null");
    //Check empty object
    Object.keys(objectInsert).length === 0
      ? console.log("null")
      : setData([objectInsert]);

    /* console.log(Object.keys(objectInsert).length); */
    setIsModalVisible(false);
  };
  let handleChangeGoogle = (value: any): void => {
    objectInsert.google = value;
    /* console.log(`selected ${value}`); */
  };
  let handleChangeSheet = (value: any): void => {
    objectInsert.sheet = value;
    /* console.log(`selected ${value}`); */
  };
  let onChangeFrom = (e: any): void => {
    setStateFrom(e.target.value);
    /* console.log(`change ${e.target.value}`); */
  };
  let onChangeTo = (e: any): void => {
    setStateTo(e.target.value);
    /* console.log(`change ${e.target.value}`); */
  };
  const handleCheckBox = (e: any): void => {
    setCheckBox(e.target.checked);
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="flex items-center flex-col m-20">
      <div className="mb-8 font-bold text-center">
        Google Sheet Configuration
      </div>
      <div className="flex flex-row mb-8">
        <div className="mr-8">Google status </div>
        <div className="mr-8 text-blue-700">
          Connected with &lt;&lt;email&gt;&gt;{" "}
        </div>
        <div className="mr-8 border bg-red-700">
          <button className="m-2 text-white">Disconnect</button>{" "}
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <div className="border bg-blue-700 mt-8">
        <button className="m-2 text-white" onClick={showModal}>
          Add New Google Sheet
        </button>

        <Modal
          visible={isModalVisible}
          footer={[<Button onClick={handleSave}>Save</Button>]}
        >
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col items-center font-bold">
              <p>Add New Google Sheet</p>
            </div>
            <p className="font-bold">
              Step 1: Select your Google spreadsheet and sheet
            </p>
            <div>
              <Select
                defaultValue="Select your Google spreadsheet"
                style={{ width: 300 }}
                onChange={handleChangeGoogle}
              >
                <Option value="OA purchases">OA purchases</Option>
              </Select>
            </div>
            <div>
              <Select
                defaultValue="Select your sheet"
                style={{ width: 300 }}
                onChange={handleChangeSheet}
              >
                <Option value="March21">March21</Option>
              </Select>
            </div>
            <p className="font-bold">Step 2: Define header row</p>
            <Checkbox onChange={handleCheckBox}>
              Yes, my sheet contains header row
            </Checkbox>
            <div>
              <p>
                My header rows start from cell{" "}
                <Input
                  placeholder="From"
                  style={{ width: 80 }}
                  onChange={onChangeFrom}
                />{" "}
                and end on cell{" "}
                <Input
                  placeholder="To"
                  style={{ width: 80 }}
                  onChange={onChangeTo}
                />
                . For example: from cell A1 to cell AC1
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
