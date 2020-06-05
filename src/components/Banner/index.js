import React, { Component } from 'react';
import "../../styles/Banner.css";

export default class Banner extends Component {
    render() {
        return (
            <div className="header">
                <h1>Employee Directory</h1>
                <p>Click on carrots to filter by heading or use the search box to narrow your results.</p>
            </div>
        )
    }
}