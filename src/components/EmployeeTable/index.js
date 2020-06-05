import React from "react";
import EmployeeList from "../EmployeeList";
import "../../styles/EmployeeTable.css";

function EmployeeTable({ headings, users, handleSort }) {
    return (
        <div className="datatable mt-5">
            <table
                id="table"
                className="table table-striped table-hover table-condensed"
            >
                <thead>
                    <tr>
                        {headings.map(({ name, width }) => {
                            return (
                                <th
                                    className="col"
                                    key={name}
                                    style={{ width }}
                                    onClick={() => {
                                        handleSort(name.toLowerCase());
                                    }}
                                >
                                    {name}
                                    <span className="pointer"></span>
                                </th>
                            );
                        })}
                    </tr>
                </thead>

                <EmployeeList users={users} />
            </table>
        </div>
    );
}

export default EmployeeTable;