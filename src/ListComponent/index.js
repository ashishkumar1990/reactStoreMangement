import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProductDataTable from "../ProductDataTable";

class ProductList extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign:'center'}}>Product List</h1>
                        <ProductDataTable  history={this.props.history}  />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productData: state
    }
};
export default connect(mapStateToProps)(ProductList);