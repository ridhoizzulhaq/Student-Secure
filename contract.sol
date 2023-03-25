// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentReport {
    struct Report {
        uint256 id;
        string name;
        uint256 social;
        uint256 math;
        uint256 naturalScience;
    }

    mapping(uint256 => Report) private reports;

    event ReportCreated(
        uint256 id,
        string name,
        uint256 social,
        uint256 math,
        uint256 naturalScience
    );

    function createReport(
        uint256 _id,
        string memory _name,
        uint256 _social,
        uint256 _math,
        uint256 _naturalScience
    ) public {
        require(
            _social <= 100 && _math <= 100 && _naturalScience <= 100,
            "Nilai harus dalam rentang 0-100"
        );
        require(reports[_id].id == 0, "ID sudah digunakan");

        reports[_id] = Report(
            _id,
            _name,
            _social,
            _math,
            _naturalScience
        );

        emit ReportCreated(
            _id,
            _name,
            _social,
            _math,
            _naturalScience
        );
    }

    function getReport(uint256 _id)
        public
        view
        returns (
            uint256,
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        Report storage report = reports[_id];
        require(report.id != 0, "Laporan tidak ditemukan");

        return (
            report.id,
            report.name,
            report.social,
            report.math,
            report.naturalScience
        );
    }
}
