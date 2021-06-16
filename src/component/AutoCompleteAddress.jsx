import React from 'react'

import axios from 'axios'
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

class AutoCompleteAddress extends React.PureComponent {
    state = {
        results: [],        
    }

    _getSearchResult = e => {
        
      if(e.target.value) {
        this.isBangla(e.target.value)       
        }
        else {
            this.setState({
                results: []
            })
        }
      }

    isBangla = (str) => {
        var emailCheck = /^[a-zA-Z]*$/;
        if(emailCheck.test(str)){
          console.log("**Its eng");
        }
        else{
            axios.get(`${BASE_URL}?`, {
                params: {
                    q: str
                }
            })
                .then(res => {
                    const response = res.data.places
                    // console.log(response);
                    const {isEn} = this.state
                    const results = response.map(res => {
                        return {
                            PostInfo: res.post_code_full_bn,
                            district: res.post_zilla_bn ? res.post_zilla_bn : '',
                            postcode_en: res.post_code_bn ? res.post_code_bn : '',
                            postoffice_bn: res.post_office_bn ? res.post_office_bn : '',
                            sub_district_bn: res.post_upzilla_bn ? res.post_upzilla_bn : ''
                        }
                    })
                    this.setState({ results })
                    // console.log(results);
                })
                .catch(err => console.error(err))
        //   console.log("Input is bangla or number detected");
        }
      }

    render() {
        const { results } = this.state
        const { selectAddress } = this.props
        // console.log(results);
        return (
            <Box margin='4rem'>
             
                <Autocomplete
                    id='test'
                    size = 'small'
                    onChange={(e, value) => selectAddress(e, value)}
                    options={results && results.length > 0 ? results : []}
                    getOptionLabel={option => option.PostInfo}
                    filterOptions={(options, state) => options}
                    ListboxProps={
                        {
                          style:{
                              maxHeight: '400px',
                          }
                        }
                      }
                    renderInput={params =>
                        <TextField
                            placeholder="Search Post Office"
                            {...params}
                            fullWidth
                            variant='outlined'
                            margin='dense'
                            size='small'
                            onChange={this._getSearchResult}
                            multiline
                            rowsMax={5}
                        />
                    }
                />
                
            </Box>
        )
    }
}

const filterOptions = createFilterOptions({
    stringify: option => option.PostInfo + option.postcode_en + option.postoffice_bn,
})

const BASE_URL = 'http://elastic.barikoi.com/ps/search/postcode'

export default AutoCompleteAddress