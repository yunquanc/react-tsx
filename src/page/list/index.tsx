import React, { useEffect, useState } from "react";
import { Collapse, Table } from "antd";
import { CAPI } from "../../lib";
import moment from "moment";
import "./index.less";
const _CAPI = new CAPI();
const { Panel } = Collapse;

const List = (props: any) => {
  // 初始值
  const [data, setData] = useState([] as any[]);

  useEffect(() => {
    let loading = async () => {
      let arr = await _CAPI.list();
      setData(arr.data.data.list);
    };
    loading();
  }, []);

  const _props: any = props;
  const _arr: any[] = [1, 2, 3, 4, 5, 6, 7];

  const columns: any = [
    {
      title: "开始时间",
      render: (text: any) => {
        return moment(text[0] || "").format("YYYY-MM-DD HH:mm");
      },
    },
    {
      title: "结束时间",
      render: (text: any) => {
        return moment(text[1] || "").format("YYYY-MM-DD HH:mm");
      },
    },
  ];

  return (
    <div>
      <Collapse defaultActiveKey={data[0] && data[0]["_id"]}>
        {data.map((e) => {
          return (
            <Panel
              header={moment(e["date"] || "").format("YYYY-MM-DD")}
              key={e["_id"]}
              extra={`总小时数：${Math.floor(e["all"] * 100) / 100}`}
            >
              <Table
                pagination={false}
                key={`table-${e["_id"]}-${Math.random()}`}
                rowKey={(row: any) => {
                  return `${e["_id"]}-${Math.random()}`;
                }}
                columns={columns}
                dataSource={e["timeList"]}
              />
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default List;
