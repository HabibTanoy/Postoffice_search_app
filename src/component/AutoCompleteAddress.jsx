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
        axios.get(`${BASE_URL}?`, {
            params: {
                q: e.target.value
            }
        })
            .then(res => {
                const response = res.data
                const results = response.map(res => {
                    return {
                        PostInfo: res.postoffice_en + ', ' + res.district,
                        district: res.district ? res.district : '',
                        postcode_en: res.postcode_en ? res.postcode_en : '',
                        postoffice_bn: res.postoffice_bn ? res.postoffice_bn : '',
                        postoffice_en: res.postoffice_en ? res.postoffice_en : ''
                    }
                })
                this.setState({ results })
            })
            .catch(err => console.error(err))
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
                    onChange={(e, value) => selectAddress(e, value)}
                    options={results && results.length > 0 ? results : []}
                    getOptionLabel={option => option.PostInfo}
                    filterOptions={filterOptions}
                    ListboxProps={
                        {
                          style:{
                              maxHeight: '600px',
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
    stringify: option => option.PostInfo + option.postcode_en,
})

const BASE_URL = 'https://rupantor.barikoi.com/sugg/search/postcodebn'

export default AutoCompleteAddress