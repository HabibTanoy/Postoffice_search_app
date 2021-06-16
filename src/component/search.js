import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import AutoCompleteAddress from './AutoCompleteAddress';

class Search extends Component {
    state = {
        // post_office_en: '',
        post_office_bn: '',
        post_code : '',
        district: '',
        sub_district: '',

    }
    _selectAddress = (e, value) => {
        console.log("sss");
        this.setState({
            // post_office_en: value && value.postoffice_en ? value.postoffice_en : '',
            post_office_bn: value && value.postoffice_bn ? value.postoffice_bn : '',
            post_code: value && value.postcode_en ? value.postcode_en : '',
            district: value && value.district ? value.district : '',
            sub_district: value && value.sub_district_bn ? value.sub_district_bn : ''

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
                        {/* <p>Post Office: {this.state.post_office_en}</p> */}
                        <p>Post Office: {this.state.post_office_bn}</p>
                        <p>Post Code: {this.state.post_code}</p>
                        <p>Sub District: {this.state.sub_district}</p>
                        <p>District: {this.state.district}</p>
                    </div>
                }
            </Box>
         );
    }
}
 
export default Search;