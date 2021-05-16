import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import AutoCompleteAddress from './AutoCompleteAddress';

class Search extends Component {
    state = {
        post_office_en: '',
        post_office_bn: '',
        post_code : '',
        district: '',

    }
    _selectAddress = (e, value) => {
        this.setState({
            post_office_en: value && value.postoffice_en ? value.postoffice_en : '',
            post_office_bn: value && value.postoffice_bn ? value.postoffice_bn : '',
            post_code: value && value.postcode_en ? value.postcode_en : '',
            district: value && value.district ? value.district : ''
        })
    }

    render() { 
        const { district } = this.state
        return ( 
            <Box>
                <div className="mt-2">
                    <span className="bari">Bari</span><span className="koi">koi</span>
                </div>
                <h2 className="text-center">Post Office Search</h2>
                <AutoCompleteAddress selectAddress={this._selectAddress} />
                {
                    district && 
                    <div style={{marginLeft:'70px'}}>
                        <p>Post Office: {this.state.post_office_en}</p>
                        <p>Post Office(Bangla): {this.state.post_office_bn}</p>
                        <p>Post Code: {this.state.post_code}</p>
                        <p>District: {this.state.district}</p>
                    </div>
                }
            </Box>
         );
    }
}
 
export default Search;