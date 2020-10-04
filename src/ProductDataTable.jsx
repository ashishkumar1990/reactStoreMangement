import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Label, Table} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {productStore} from './index';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
class ProductDataTable extends Component {
    constructor(props) {
        debugger;
        super(props);
        //,
        this.state =  {currentPage: 1,
            pageLimit: 5,tableData:productStore ? productStore.getState() : [],filterData:''
        };

    }

    handleClick(value) {
        this.setState({
            currentPage: value
        });
    }
// function to show the confirm box dialog and delete the data
    deleteData = (id) => {
        const result = window.confirm("Are you want to delete ?");
        if (result) {
            this.props.dispatch({type: 'DELETE', id:id})
        }
        let tableData=productStore ? productStore.getState() : [];
        this.setState({tableData});

    };

    sortTable = (sortedField) => {
        let sortedProducts = [...this.state.tableData];
        if (sortedField !== null) {
            sortedProducts.sort((a, b) => {
                if (a.productFormData[sortedField] < b.productFormData[sortedField]) {
                    return -1;
                }
                if (a.productFormData[sortedField] > b.productFormData[sortedField]) {
                    return 1;
                }
                return 0;
            });
        }
        this.setState({tableData:sortedProducts});
    };

    search = (e) => {
        let val = e.target.value;
        let products = [...this.state.tableData];
        let afterSearchProducts=products.filter((product)=>{
            let name=product.productFormData.name;
            let price=product.productFormData.price;
            let category=product.productFormData.category;
            let des=product.productFormData.description;
            if (name.indexOf(val) > -1 || price.indexOf(val) > -1 || category.indexOf(val) > -1 || des.indexOf(val) > -1) {
                return product
            }
        });

        this.setState({filterData:afterSearchProducts});
    };
    exportToCSV = () => {
        const fileName = 'ProductData';
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet([{name:"s",price:'2'}]);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    render() {
        const { tableData, currentPage, pageLimit,filterData } = this.state;
        // Logic for displaying tableData
        let data=filterData ?filterData:tableData;
        const indexOfLastTodo = currentPage * pageLimit;
        const indexOfFirstTodo = indexOfLastTodo - pageLimit;
        const currentTableData = data.slice(indexOfFirstTodo, indexOfLastTodo);


        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / pageLimit); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li style={{background: '#00b5ad', padding: 10,borderRadius: '25%',color: 'white',marginRight: 5,cursor: 'pointer'}}
                    key={number}
                    id={number}
                    onClick={(e)=>this.handleClick(e.target.id)}
                >
                    {number}
                </li>
            );
        });

        return (
            <div style={{padding:20}}>
                <div style={{float: 'right', marginRight:20}}>

                    <button style={{marginLeft:5 ,background:"#2185d0",
                        border: "none",
                        padding: 10,
                        borderRadius: '10%'
                    }} type="button" onClick={() => this.exportToCSV()}>
                        <span style={{color:"white"}}>Export</span>
                    </button>
                </div>
                <div style={{float: 'right', marginRight:20}}>

                    <input style={{border: '2px solid green', marginBottom: 10}}
                        type="text"
                        name="search"
                        onChange={this.search}
                        placeholder="Search query"
                    />
                </div>
                { this.state.tableData.length>0? <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name <button style={{marginLeft:5}} type="button" onClick={() => this.sortTable('name')}>
                                <span style={{color:"green"}}>Sort By Name</span>
                            </button></Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Price<button  style={{marginLeft:5}}  type="button" onClick={() => this.sortTable('price')}>
                                <span style={{color:"green"}}>Sort By Price</span>
                            </button></Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { currentTableData.map((t) => {
                            return (<React.Fragment>
                                <Table.Row>
                                    <Table.Cell>
                                        <Label>{t.productFormData.name}</Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Label>{t.productFormData.category}</Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Label>{t.productFormData.description}</Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Label>{t.productFormData.price}</Label>
                                    </Table.Cell>
                                    <Table.Cell>

                                        <button onClick={()=>this.deleteData(t.id)} style={{marginRight:10}}>
                                            Delete
                                        </button>
                                        <button  ><Link to="/"> Add new Product</Link></button>
                                    </Table.Cell>
                                </Table.Row>
                            </React.Fragment>);
                        })}

                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>

                        </Table.Row>
                    </Table.Footer>
                </Table>:<h3>"NO Record Found"</h3>}

                <div style={{float: 'right', marginRight:20}}>
                    <ul id="page-numbers" style={{background:'white',color:"black"}}>
                        {renderPageNumbers}
                    </ul>

                </div>
            </div>
        );
    }
}
export default connect()(ProductDataTable);