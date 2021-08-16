import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import axios from 'axios'
import { BASE_URL } from "../../constants/api"

export default function Table(props) {
    const { SearchBar } = Search;
    let totalPage = 0
    let sizePerPage = 0
    const [cities, setCities] = useState([])
    const [paginationOption, setPaginationOption] = useState({})
    const [searchText, setSearchText] = useState('')
    const fetchCities = async (paramsOptions) => {
        let defaultParams = { skip: 0, limit: 30, sortField: "city", sortValue: 'asc', searchText: '' }
        let params = Object.assign(defaultParams, paramsOptions)
        try {
            let res = await axios.get(BASE_URL + '/cities', { params })

            setCities(res.data.cities.docs)
            const { limit, offset, page, pages, total } = res.data.cities
            totalPage = total
            sizePerPage = limit
            // setPaginationOption({ limit, offset, page, pages, total })
            console.log("<<<<<<<<<<<paginationOption", totalPage)
        } catch (error) {
            console.log("error", error)
        }

    }

    const columns = [{
        dataField: '_id',
        text: 'City ID',
        sort: true,
        onSort: (field, order) => {
            fetchCities({ sortField: field, sortValue: order })
        }

    }, {
        dataField: 'city',
        text: 'City Name',
        sort: true,
        onSort: (field, order) => {
            fetchCities({ sortField: field, sortValue: order })
        }


    }, {
        dataField: 'pop',
        text: 'Population',
        sort: true,
        onSort: (field, order) => {
            fetchCities({ sortField: field, sortValue: order })
        }

    },
    {
        dataField: 'state',
        text: 'State',
        sort: true,
        onSort: (field, order) => {
            fetchCities({ sortField: field, sortValue: order })
        }

    },
    {
        dataField: 'loc',
        text: 'Location'
    }
    ]

    useEffect(async () => {
        await fetchCities()
    }, [])

    const options = {
        pageStartIndex: 1,
        sizePerPage: paginationOption.limit,
        // paginationSize: 4,
        // alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        totalSize: totalPage,
        // paginationTotalRenderer: paginationOption.total,
        disablePageTitle: true,
        // sizePerPageList: [{
        //   text: '5', value: 5
        // }, {
        //   text: '10', value: 10
        // }, {
        //   text: 'All', value: products.length
        // }] ,
        onSizePerPageChange: (sizePerPage, page) => {
            console.log('Size per page change!!!');
            console.log('Newest size per page:' + sizePerPage);
            console.log('Newest page:' + page);
        },
        onPageChange: (page, sizePerPage) => {
            console.log('Page change!!!');
            console.log('Newest size per page:' + sizePerPage);
            console.log('Newest page:' + page);
            console.log("paginationOption", paginationOption)
            let skip = sizePerPage * (page - 1)
            let limit = 2 * sizePerPage
            fetchCities({ skip, limit })
            // setPaginationOption({ ...paginationOption, skip, limit })
        }

    };
    console.log("NNNNNN", options)


    const onChangeText = (e) => {
        console.log(e.target.value);
        setSearchText(e.target.value)
        // fetchCities({ searchText: e.target.value })
        // e.preventDefault()
    };

    const MySearch = (props) => {
        let input;
        const handleClick = () => {
            fetchCities({ searchText: searchText })
        };
        return (
            <div>
                <input
                    className="form-control"
                    style={{ backgroundColor: 'white', width: '100%' }}
                    // ref={n => input = n}
                    type="text"
                    value={searchText}
                    onChange={onChangeText}
                    placeholder="Search by City or State Name. This is case sensitive search"
                />
                <button className="btn btn-warning" onClick={handleClick}>Click to Search!!</button>
            </div>
        );
    };

    return (
        <div>
            <h1>Table </h1>
            {/* <BootstrapTable
                keyField='id'
                data={cities}
                columns={columns}
                loading={true}
                bootstrap4={true}
                striped={true}
                noDataIndication="Table is Empty"
                pagination={paginationFactory(options)}
            /> */}

            <MySearch {...props.searchProps} />
            <br />

            <ToolkitProvider
                keyField="id"
                data={cities}
                columns={columns}
            // search={{ customMatchFunc }}
            >
                {
                    props => (
                        <div>
                            {/* <h3>Enter City or State Name</h3>
                            <SearchBar {...props.searchProps} /> */}
                            <hr />
                            {/* <BootstrapTable
          { ...props.baseProps }
        /> */}
                            <BootstrapTable
                                keyField='id'
                                data={cities}
                                columns={columns}
                                loading={true}
                                bootstrap4={true}
                                striped={true}
                                noDataIndication="Table is Empty"
                                pagination={paginationFactory(options)}
                                {...props.baseProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}
