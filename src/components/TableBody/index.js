import React, { Component } from "react";
import EmployeeTable from "../EmployeeTable";
import SearchBar from "../SearchBar";
import API from "../../utils/API";
import "./TableBody.css";

// TableBody passes prop handleSearchChange to SearchBar (then to SearchBox)
// and users, headings and handleSort to EmployeeTable
// (user is then passed to EmployeeList)
export default class TableBody extends Component {
    state = {
        users: [{}],
        order: "descend",
        filteredUsers: [{}]
    }

    headings = [
        { name: "Image", width: "10%" },
        { name: "Name", width: "10%" },
        { name: "Phone", width: "20%" },
        { name: "Email", width: "20%" },
        { name: "DOB", width: "10%" }
    ]

    handleSort = heading => {
        if (this.state.order === "descend") {
            this.setState({
                order: "ascend"
            })
        } else {
            this.setState({
                order: "descend"
            })
        }

        const compareFnc = (a, b) => {
            if (this.state.order === "ascend") {
                // account for missing values
                if (a[heading] === undefined) {
                    return 1;
                } else if (b[heading] === undefined) {
                    return -1;
                }
                // numerically
                else if (heading === "name") {
                    return a[heading].last.localeCompare(b[heading].last);
                } else if (heading === 'dob') {
                    return a[heading].date.localeCompare(b[heading].date);
                } else {
                    return a[heading].localeCompare(b[heading]);
                }
            } else {
                // account for missing values
                if (a[heading] === undefined) {
                    return 1;
                } else if (b[heading] === undefined) {
                    return -1;
                }
                // numerically
                else if (heading === "name") {
                    return b[heading].last.localeCompare(a[heading].last);
                } else if (heading === "dob") {
                    return b[heading].date.localeCompare(a[heading].date);
                } else {
                    return b[heading].localeCompare(a[heading]);
                }
            }

        }
        const sortedUsers = this.state.filteredUsers.sort(compareFnc);
        this.setState({ filteredUsers: sortedUsers });
    }

    handleSearchChange = event => {
        console.log(event.target.value);
        const filter = event.target.value;
        const filteredList = this.state.users.filter(item => {
            // merge data together, then see if user input is anywhere inside
            let values = Object.values(item)
                .join("")
                .toLowerCase();
            return values.indexOf(filter.toLowerCase()) !== -1;
        });
        this.setState({ filteredUsers: filteredList });
    }

    componentDidMount() {
        API.getUsers().then(results => {
            this.setState({
                users: results.data.results,
                filteredUsers: results.data.results
            });
        });
    }

    render() {
        return (
            <>
                <SearchBar handleSearchChange={this.handleSearchChange} />
                <div className="data-area">
                    <EmployeeTable
                        headings={this.headings}
                        users={this.state.filteredUsers}
                        handleSort={this.handleSort}
                    />
                </div>
            </>
        );
    }
}
