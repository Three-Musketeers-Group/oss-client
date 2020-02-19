import React, { useEffect, useState } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "../../lib/vdir/types";
import { Vdir } from "../../lib/vdir";
import { fileContextMenu } from "../../helper/contextMenu";
import { RootState } from "../../store";
import { changeNotifier } from "../../store/app/actions";
import Icon from "../Icon";
import { dateFormatter, fileSizeFormatter } from "../../helper/utils";

const Table = ({ vdir }: { vdir: Vdir }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<Item[]>([]);

  const selectNotifier = (state: RootState) => state.app.notifier;
  const notifier = useSelector(selectNotifier);

  useEffect(() => {
    setFiles(vdir.listFiles());
  }, [notifier, vdir]);

  return (
    <div className="main-table-wrapper">
      <table className="main-table">
        <thead>
          <tr className="main-table__row">
            <th className="main-table__row_cell">#</th>
            <th className="main-table__row_cell">文件名</th>
            <th className="main-table__row_cell">大小</th>
            <th className="main-table__row_cell">修改日期</th>
          </tr>
        </thead>
        <tbody>
          {files.map((item: Item, index) =>
            Vdir.isDir(item) ? (
              // 文件夹
              <tr
                key={item.name}
                className="main-table__row"
                onContextMenu={() => fileContextMenu(item.name, vdir)}
                onDoubleClick={() => {
                  dispatch(changeNotifier());
                  vdir.changeDir(item.name);
                  setFiles(vdir.listFiles());
                  console.log(vdir.getNav());
                }}
              >
                <td className="main-table__row_cell index">{index}</td>
                <td className="main-table__row_cell title">
                  <Icon className="icon" />
                  <span>{item.name}</span>
                </td>
                <td className="main-table__row_cell size">
                  {fileSizeFormatter(item.size)}
                </td>
                <td className="main-table__row_cell date">
                  {dateFormatter(item.lastModified)}
                </td>
              </tr>
            ) : (
              // 文件
              <tr
                key={item.name}
                className="main-table__row"
                onContextMenu={() => fileContextMenu(item.name, vdir)}
                onDoubleClick={() => {}}
              >
                <td className="main-table__row_cell index">{index}</td>
                <td className="main-table__row_cell title">
                  <Icon className="icon" filename={item.name} />
                  <span>{item.name}</span>
                </td>
                <td className="main-table__row_cell size">
                  {fileSizeFormatter(item.size)}
                </td>
                <td className="main-table__row_cell date">
                  {dateFormatter(item.lastModified)}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;